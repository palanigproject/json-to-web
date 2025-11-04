const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const { generateFromConfig } = require('../src/generator');

const app = express();
const PORT = 3000;

// Track running server process
let previewServerProcess = null;
let previewServerPort = 3001; // Different port for generated app

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from output-web/css and output-web/js
app.use('/css', express.static(path.join(__dirname, '..', 'output-web', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'output-web', 'js')));

// Serve dashboard.html for root
app.get('/', (req, res) => {
  const dashboardPath = path.join(__dirname, 'dashboard.html');
  console.log('Attempting to serve dashboard from:', dashboardPath);
  console.log('File exists:', require('fs').existsSync(dashboardPath));
  res.sendFile(dashboardPath, (err) => {
    if (err) {
      console.error('Error serving dashboard:', err.message);
      console.error('Full error:', err);
      res.status(500).send(`Error loading dashboard: ${err.message}`);
    } else {
      console.log('Dashboard served successfully');
    }
  });
});

// Build endpoint - generates files to output-web
app.post('/api/build', async (req, res) => {
  try {
    console.log('Build request received...');
    
    // Generate files using the generator
    generateFromConfig();
    
    console.log('Build completed successfully!');
    res.json({ 
      success: true, 
      message: 'Application built successfully!',
      output: 'Files generated in output-web/'
    });
  } catch (error) {
    console.error('Build error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Build failed',
      error: error.message 
    });
  }
});

// Start Preview Server endpoint
app.post('/api/preview/start', async (req, res) => {
  try {
    const outputWebPath = path.join(__dirname, '..', 'output-web');
    
    // Check if output-web exists
    if (!fs.existsSync(outputWebPath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Please build the application first!' 
      });
    }
    
    // Check if server is already running
    if (previewServerProcess && !previewServerProcess.killed) {
      return res.json({ 
        success: true, 
        message: 'Preview server is already running',
        url: `http://localhost:${previewServerPort}`
      });
    }
    
    // Change to output-web directory and start server
    const serverPath = path.join(outputWebPath, 'server', 'server.js');
    
    if (!fs.existsSync(serverPath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Server file not found. Please rebuild the application.' 
      });
    }
    
    console.log('Starting preview server...');
    
    // Check if docker-compose.yml exists
    const dockerComposePath = path.join(outputWebPath, 'docker', 'docker-compose.yml');
    if (!fs.existsSync(dockerComposePath)) {
      return res.status(400).json({
        success: false,
        message: 'Docker Compose file not found. Please rebuild the application.'
      });
    }
    
    console.log('Starting Docker Compose...');
    
    // Track if response has been sent
    let responseSent = false;
    
    // Use docker compose command (works on both old and new Docker versions)
    const dockerComposeCmd = 'docker';
    const dockerComposeArgs = ['compose', '-f', dockerComposePath, 'up', '-d', '--build'];
    
    let buildOutput = '';
    let buildErrors = '';
    
    // Start Docker Compose from output-web directory (parent of docker folder)
    previewServerProcess = spawn(dockerComposeCmd, dockerComposeArgs, {
      cwd: outputWebPath, // Run from output-web directory
      stdio: 'pipe',
      shell: true
    });
    
    previewServerProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`Preview Server: ${output}`);
      buildOutput += output;
      
      // Check for build errors in output
      if (output.includes('ERROR:') || output.includes('error code') || output.includes('exit code: 1')) {
        buildErrors += output;
      }
    });
    
    previewServerProcess.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(`Preview Server Error: ${error}`);
      buildErrors += error;
    });
    
    previewServerProcess.on('error', (err) => {
      console.error('Failed to spawn Docker process:', err);
      if (!responseSent) {
        responseSent = true;
        res.status(500).json({ 
          success: false, 
          message: 'Failed to start Docker Compose',
          error: err.message 
        });
      }
    });
    
    previewServerProcess.on('close', (code) => {
      console.log(`Docker Compose exited with code ${code}`);
      
      // Check if build failed
      if (code !== 0 || buildErrors.includes('ERROR:') || buildErrors.includes('error code') || buildOutput.includes('exit code: 1')) {
        if (!responseSent) {
          responseSent = true;
          res.status(500).json({ 
            success: false, 
            message: 'Docker Compose build failed. Check the console for details.',
            error: buildErrors || `Docker process exited with code ${code}`
          });
        }
        previewServerProcess = null;
        return;
      }
      
      // Wait a bit for containers to fully start, then verify they're running
      setTimeout(() => {
        // Check if containers are actually running
        const checkProcess = spawn('docker', ['compose', '-f', dockerComposePath, 'ps', '--format', 'json'], {
          cwd: outputWebPath,
          stdio: 'pipe',
          shell: true
        });
        
        let checkOutput = '';
        checkProcess.stdout.on('data', (data) => {
          checkOutput += data.toString();
        });
        
        checkProcess.on('close', (checkCode) => {
          try {
            const lines = checkOutput.split('\n').filter(line => line.trim());
            const containers = lines.map(line => {
              try {
                return JSON.parse(line);
              } catch (e) {
                return null;
              }
            }).filter(container => container && container.Name);
            
            const runningContainers = containers.filter(c => c.State === 'running');
            
            if (!responseSent) {
              responseSent = true;
              if (runningContainers.length > 0) {
                res.json({
                  success: true,
                  message: 'Docker Compose started successfully. Frontend available at http://localhost:8080',
                  url: 'http://localhost:8080',
                  port: 8080,
                  containers: runningContainers.map(c => c.Name)
                });
              } else {
                res.status(500).json({ 
                  success: false, 
                  message: 'Docker Compose started but no containers are running. Check Docker logs.',
                  error: 'No running containers found'
                });
              }
            }
          } catch (error) {
            console.error('Error checking container status:', error);
            if (!responseSent) {
              responseSent = true;
              res.status(500).json({ 
                success: false, 
                message: 'Failed to verify container status',
                error: error.message 
              });
            }
          }
          previewServerProcess = null;
        });
      }, 8000); // Give Docker more time to start (8 seconds)
    });
    
  } catch (error) {
    console.error('Preview start error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to start preview server',
      error: error.message 
    });
  }
});

// Stop Preview Server endpoint
app.post('/api/preview/stop', (req, res) => {
  const outputWebPath = path.join(__dirname, '..', 'output-web');
  const dockerComposePath = path.join(outputWebPath, 'docker', 'docker-compose.yml');
  
  if (!fs.existsSync(dockerComposePath)) {
    return res.status(400).json({
      success: false,
      message: 'Docker Compose file not found.'
    });
  }
  
  console.log('Stopping Docker Compose...');
  
  // Use docker compose command with force removal
  const dockerComposeCmd = 'docker';
  const dockerComposeArgs = ['compose', '-f', dockerComposePath, 'down', '--remove-orphans'];
  
  // Track if response has been sent
  let responseSent = false;
  
  // Timeout to prevent hanging requests
  const timeout = setTimeout(() => {
    if (!responseSent) {
      responseSent = true;
      console.error('Docker stop command timed out');
      res.status(500).json({ 
        success: false, 
        message: 'Docker stop command timed out. Docker containers may still be running.' 
      });
    }
  }, 30000); // 30 second timeout
  
  // Stop Docker Compose from output-web directory
  const stopProcess = spawn(dockerComposeCmd, dockerComposeArgs, {
    cwd: outputWebPath, // Run from output-web directory
    stdio: 'pipe',
    shell: true
  });
  
  let stopOutput = '';
  stopProcess.stdout.on('data', (data) => {
    stopOutput += data.toString();
    console.log(`Docker Stop: ${data.toString()}`);
  });
  
  stopProcess.stderr.on('data', (data) => {
    console.error(`Docker Stop Error: ${data.toString()}`);
  });
  
  stopProcess.on('error', (err) => {
    clearTimeout(timeout);
    if (!responseSent) {
      responseSent = true;
      console.error('Failed to spawn Docker stop process:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to execute Docker stop command',
        error: err.message 
      });
    }
  });
  
  stopProcess.on('close', (code) => {
    clearTimeout(timeout);
    
    // Clear preview server process reference
    if (previewServerProcess) {
      previewServerProcess = null;
    }
    
    if (!responseSent) {
      responseSent = true;
      if (code === 0) {
        res.json({ success: true, message: 'Docker Compose stopped successfully' });
      } else {
        res.json({ success: false, message: `Docker Compose stop exited with code ${code}` });
      }
    }
  });
});

// Check Preview Server status
app.get('/api/preview/status', (req, res) => {
  const outputWebPath = path.join(__dirname, '..', 'output-web');
  const dockerComposePath = path.join(outputWebPath, 'docker', 'docker-compose.yml');
  
  if (!fs.existsSync(dockerComposePath)) {
    return res.json({
      running: false,
      message: 'Docker Compose file not found'
    });
  }
  
  // Use docker compose command
  const dockerComposeCmd = 'docker';
  const dockerComposeArgs = ['compose', '-f', dockerComposePath, 'ps', '--format', 'json'];
  
  // Track if response has been sent
  let responseSent = false;
  
  // Timeout to prevent hanging requests
  const timeout = setTimeout(() => {
    if (!responseSent) {
      responseSent = true;
      console.error('Docker status check timed out');
      res.json({
        running: false,
        message: 'Status check timed out'
      });
    }
  }, 10000); // 10 second timeout for status check
  
  // Helper function to send response safely
  const sendResponse = (data) => {
    clearTimeout(timeout);
    if (!responseSent) {
      responseSent = true;
      res.json(data);
    }
  };
  
  // Check if Docker containers are running from output-web directory
  const checkProcess = spawn(dockerComposeCmd, dockerComposeArgs, {
    cwd: outputWebPath, // Run from output-web directory
    stdio: 'pipe',
    shell: true
  });
  
  let checkOutput = '';
  checkProcess.stdout.on('data', (data) => {
    checkOutput += data.toString();
  });
  
  checkProcess.stderr.on('data', (data) => {
    console.error(`Docker Status Check Error: ${data.toString()}`);
  });
  
  checkProcess.on('error', (err) => {
    console.error('Failed to spawn Docker status check process:', err);
    // Fallback: check if nginx container is running
    const nginxCheck = spawn('docker', ['ps', '--filter', 'name=cadp-nginx', '--format', '{{.Names}}'], {
      stdio: 'pipe',
      shell: true
    });
    
    let nginxOutput = '';
    nginxCheck.stdout.on('data', (data) => {
      nginxOutput += data.toString();
    });
    
    nginxCheck.on('error', (nginxErr) => {
      console.error('Failed to spawn nginx check process:', nginxErr);
      sendResponse({
        running: false,
        url: 'http://localhost:8080',
        port: 8080,
        message: 'Unable to check Docker status'
      });
    });
    
    nginxCheck.on('close', () => {
      const isRunning = nginxOutput.includes('cadp-nginx');
      sendResponse({
        running: isRunning,
        url: 'http://localhost:8080',
        port: 8080
      });
    });
  });
  
  checkProcess.on('close', (code) => {
    try {
      // Parse docker-compose ps output
      const lines = checkOutput.split('\n').filter(line => line.trim());
      const containers = lines.map(line => {
        try {
          return JSON.parse(line);
        } catch (e) {
          return null;
        }
      }).filter(container => container && container.Name);
      
      const runningContainers = containers.filter(c => c.State === 'running');
      const isRunning = runningContainers.length > 0;
      
      sendResponse({
        running: isRunning,
        url: 'http://localhost:8080',
        port: 8080,
        containers: runningContainers.map(c => c.Name)
      });
    } catch (error) {
      console.error('Error parsing Docker status:', error);
      // Fallback: check if nginx container is running
      const nginxCheck = spawn('docker', ['ps', '--filter', 'name=cadp-nginx', '--format', '{{.Names}}'], {
        stdio: 'pipe',
        shell: true
      });
      
      let nginxOutput = '';
      nginxCheck.stdout.on('data', (data) => {
        nginxOutput += data.toString();
      });
      
      nginxCheck.on('error', (nginxErr) => {
        console.error('Failed to spawn nginx check process:', nginxErr);
        sendResponse({
          running: false,
          url: 'http://localhost:8080',
          port: 8080,
          message: 'Unable to check Docker status'
        });
      });
      
      nginxCheck.on('close', () => {
        const isRunning = nginxOutput.includes('cadp-nginx');
        sendResponse({
          running: isRunning,
          url: 'http://localhost:8080',
          port: 8080
        });
      });
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dashboard server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`JSON-TO-WEB Dashboard running on http://localhost:${PORT}`);
  console.log(`Click "Build Application" to generate files to output-web/`);
});

module.exports = app;
