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

// Helper function to get application name from config
function getApplicationName() {
  try {
    const configPath = path.join(__dirname, '..', 'config', 'front-end.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.applicationName || 'default-app';
    }
  } catch (error) {
    console.error('Error reading application name from config:', error);
  }
  return 'default-app';
}

// Helper function to get application output path
function getApplicationOutputPath() {
  const applicationName = getApplicationName();
  return path.join(__dirname, '..', 'output-web', applicationName);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from application-specific folder
// Note: This is for backward compatibility, but the main app now uses application-specific folders
const appOutputPath = getApplicationOutputPath();
if (fs.existsSync(path.join(appOutputPath, 'css'))) {
  app.use('/css', express.static(path.join(appOutputPath, 'css')));
}
if (fs.existsSync(path.join(appOutputPath, 'js'))) {
  app.use('/js', express.static(path.join(appOutputPath, 'js')));
}

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

// Get MongoDB URI configuration
app.get('/api/config/mongodb', (req, res) => {
  try {
    const configPath = path.join(__dirname, '..', 'config', 'database.json');
    if (!fs.existsSync(configPath)) {
      return res.status(404).json({
        success: false,
        message: 'Database config file not found'
      });
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    // Return standalone URI if available, otherwise return the main URI
    const mongodbUri = config.connection?.standaloneUri || config.connection?.uri || 'mongodb://localhost:27017/json-to-web';
    res.json({
      success: true,
      mongodbUri: mongodbUri,
      dockerUri: config.connection?.uri || 'mongodb://admin:password123@mongodb:27017/json-to-web?authSource=admin',
      standaloneUri: config.connection?.standaloneUri || mongodbUri,
      enabled: config.enabled || false
    });
  } catch (error) {
    console.error('Error reading MongoDB config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read MongoDB configuration',
      error: error.message
    });
  }
});

// Update MongoDB URI configuration
app.post('/api/config/mongodb', (req, res) => {
  try {
    const { mongodbUri, uriType } = req.body;
    
    if (!mongodbUri || typeof mongodbUri !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'MongoDB URI is required'
      });
    }
    
    const configPath = path.join(__dirname, '..', 'config', 'database.json');
    
    // Read existing config
    let config = {};
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } else {
      // Create default config structure
      config = {
        enabled: true,
        connection: {
          uri: '',
          standaloneUri: '',
          options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        }
      };
    }
    
    // Update MongoDB URI based on type
    if (!config.connection) {
      config.connection = {
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      };
    }
    
    // uriType can be 'docker' or 'standalone' (defaults to standalone)
    if (uriType === 'docker') {
      config.connection.uri = mongodbUri;
    } else {
      // Default to standalone URI
      config.connection.standaloneUri = mongodbUri;
    }
    
    // Write back to file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    
    res.json({
      success: true,
      message: `MongoDB ${uriType || 'standalone'} URI updated successfully`,
      mongodbUri: mongodbUri
    });
  } catch (error) {
    console.error('Error updating MongoDB config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update MongoDB configuration',
      error: error.message
    });
  }
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
    const outputWebPath = getApplicationOutputPath();
    const outputWebBasePath = path.join(__dirname, '..', 'output-web');
    
    // Check if output-web base directory exists
    if (!fs.existsSync(outputWebBasePath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Please build the application first!' 
      });
    }
    
    // Check if application folder exists
    if (!fs.existsSync(outputWebPath)) {
      return res.status(404).json({ 
        success: false, 
        message: `Application folder not found. Please build the application first! Expected: ${path.basename(outputWebPath)}` 
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
    
    // Change to application directory and start server
    const serverPath = path.join(outputWebPath, 'server', 'server.js');
    
    if (!fs.existsSync(serverPath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Server file not found. Please rebuild the application.' 
      });
    }
    
    console.log('Starting preview server...');
    
    // Check if docker-compose.yml exists in application folder
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
    
    // Start Docker Compose from application directory (parent of docker folder)
    previewServerProcess = spawn(dockerComposeCmd, dockerComposeArgs, {
      cwd: outputWebPath, // Run from application directory
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
          cwd: outputWebPath, // Run from application directory
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

// Start Standalone Node.js Server endpoint
app.post('/api/preview/start-standalone', async (req, res) => {
  try {
    const outputWebPath = getApplicationOutputPath();
    
    // Check if application folder exists
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
    
    // Check if server.js exists
    const serverPath = path.join(outputWebPath, 'server', 'server.js');
    if (!fs.existsSync(serverPath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Server file not found. Please rebuild the application.' 
      });
    }
    
    // Check if package.json exists
    const packageJsonPath = path.join(outputWebPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return res.status(404).json({ 
        success: false, 
        message: 'package.json not found. Please rebuild the application.' 
      });
    }
    
    console.log('Starting standalone Node.js server...');
    
    // Check if node_modules exists, if not, install dependencies
    const nodeModulesPath = path.join(outputWebPath, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('Installing dependencies...');
      return new Promise((resolve, reject) => {
        const installProcess = spawn('npm', ['install'], {
          cwd: outputWebPath,
          stdio: 'pipe',
          shell: true
        });
        
        let installOutput = '';
        installProcess.stdout.on('data', (data) => {
          installOutput += data.toString();
          console.log(`npm install: ${data.toString()}`);
        });
        
        installProcess.stderr.on('data', (data) => {
          console.error(`npm install error: ${data.toString()}`);
        });
        
        installProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error('Failed to install dependencies'));
          } else {
            // After installation, start the server
            startStandaloneServer(outputWebPath, res);
          }
        });
        
        installProcess.on('error', (err) => {
          reject(err);
        });
      }).catch(error => {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to install dependencies',
          error: error.message 
        });
      });
    } else {
      // Dependencies already installed, start server directly
      startStandaloneServer(outputWebPath, res);
    }
    
  } catch (error) {
    console.error('Standalone start error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to start standalone server',
      error: error.message 
    });
  }
});

// Helper function to start standalone server
function startStandaloneServer(outputWebPath, res) {
  // Load environment variables from .env file if it exists
  const envPath = path.join(outputWebPath, '.env');
  const env = { ...process.env };
  
  if (fs.existsSync(envPath)) {
    // Read .env file and parse it
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
  
  // Ensure PORT is set
  env.PORT = previewServerPort;
  env.NODE_ENV = env.NODE_ENV || 'development';
  
  // Start the Node.js server
  previewServerProcess = spawn('node', ['server/server.js'], {
    cwd: outputWebPath,
    stdio: 'pipe',
    shell: true,
    env: env
  });
  
  let responseSent = false;
  
  previewServerProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`Standalone Server: ${output}`);
    
    // Check if server started successfully
    if ((output.includes('Server is running') || output.includes('listening')) && !responseSent) {
      responseSent = true;
      res.json({
        success: true,
        message: 'Standalone server started successfully',
        url: `http://localhost:${previewServerPort}`,
        port: previewServerPort
      });
    }
  });
  
  previewServerProcess.stderr.on('data', (data) => {
    const error = data.toString();
    console.error(`Standalone Server Error: ${error}`);
    
    // Check for MongoDB connection errors (these are expected if MongoDB isn't running)
    if (error.includes('MongoServerError') || error.includes('ECONNREFUSED')) {
      // Don't fail the request, just log it - server might still start
      console.log('MongoDB connection issue (server may still work):', error);
    }
  });
  
  previewServerProcess.on('error', (err) => {
    console.error('Failed to start standalone server:', err);
    if (!responseSent) {
      responseSent = true;
      res.status(500).json({ 
        success: false, 
        message: 'Failed to start standalone server',
        error: err.message 
      });
    }
  });
  
  previewServerProcess.on('close', (code) => {
    console.log(`Standalone server exited with code ${code}`);
    previewServerProcess = null;
    if (!responseSent && code !== 0) {
      responseSent = true;
      res.status(500).json({ 
        success: false, 
        message: 'Server exited unexpectedly',
        error: `Process exited with code ${code}`
      });
    }
  });
  
  // Timeout fallback - if server doesn't send startup message in 5 seconds, assume it started
  setTimeout(() => {
    if (!responseSent) {
      responseSent = true;
      res.json({
        success: true,
        message: 'Standalone server starting...',
        url: `http://localhost:${previewServerPort}`,
        port: previewServerPort
      });
    }
  }, 5000);
}

// Stop Preview Server endpoint (handles both Docker and standalone)
app.post('/api/preview/stop', (req, res) => {
  // First, try to stop the standalone Node.js server if it's running
  if (previewServerProcess && !previewServerProcess.killed) {
    console.log('Stopping standalone Node.js server...');
    previewServerProcess.kill();
    previewServerProcess = null;
    return res.json({ success: true, message: 'Standalone server stopped successfully' });
  }
  
  // If no standalone server, try to stop Docker Compose
  const outputWebPath = getApplicationOutputPath();
  const dockerComposePath = path.join(outputWebPath, 'docker', 'docker-compose.yml');
  
  if (!fs.existsSync(dockerComposePath)) {
    return res.json({
      success: true,
      message: 'No server running to stop'
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
  
  // Stop Docker Compose from application directory
  const stopProcess = spawn(dockerComposeCmd, dockerComposeArgs, {
    cwd: outputWebPath, // Run from application directory
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
  const outputWebPath = getApplicationOutputPath();
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
  
  // Check if Docker containers are running from application directory
  const checkProcess = spawn(dockerComposeCmd, dockerComposeArgs, {
    cwd: outputWebPath, // Run from application directory
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
