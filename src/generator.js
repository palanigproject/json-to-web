const fs = require('fs');
const path = require('path');

// Read input.json
function readInputFile(inputFile) {
  const inputPath = inputFile || path.join(__dirname, '..', 'examples', 'input.json');
  
  try {
    let jsonData = fs.readFileSync(inputPath, 'utf8');
    // Remove BOM if present
    if (jsonData.charCodeAt(0) === 0xFEFF) {
      jsonData = jsonData.slice(1);
    }
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading input.json:', error.message);
    process.exit(1);
  }
}

// Generate CSS from styles object
function generateCSS(styles) {
  let css = 'body {\n';
  
  for (const [property, value] of Object.entries(styles)) {
    const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
    css += `  ${cssProperty}: ${value};\n`;
  }
  
  css += '  margin: 0;\n';
  css += '  padding: 0;\n';
  css += '}\n\n';
  css += '.container {\n';
  css += '  max-width: 800px;\n';
  css += '  margin: 0 auto;\n';
  css += '  padding: 20px;\n';
  css += '  display: flex;\n';
  css += '  flex-direction: column;\n';
  css += '}\n\n';
  css += 'h1, p, button, input, textarea {\n';
  css += '  margin: 10px 0;\n';
  css += '}\n\n';
  css += 'button {\n';
  css += '  padding: 10px 20px;\n';
  css += '  cursor: pointer;\n';
  css += '  font-size: 16px;\n';
  css += '  align-self: flex-start;\n';
  css += '}\n\n';
  css += 'input, textarea {\n';
  css += '  padding: 8px 12px;\n';
  css += '  font-size: 14px;\n';
  css += '  border: 1px solid #ccc;\n';
  css += '  border-radius: 4px;\n';
  css += '  box-sizing: border-box;\n';
  css += '}\n\n';
  css += 'img {\n';
  css += '  max-width: 100%;\n';
  css += '  height: auto;\n';
  css += '}\n\n';
  css += 'ul, ol {\n';
  css += '  margin: 10px 0;\n';
  css += '  padding-left: 20px;\n';
  css += '}\n\n';
  
  // Add login form styles
  css += '/* Login Form Styles */\n';
  css += '.login-form {\n';
  css += '  display: flex;\n';
  css += '  flex-direction: column;\n';
  css += '  gap: 15px;\n';
  css += '  margin: 20px 0;\n';
  css += '  max-width: 400px;\n';
  css += '}\n\n';
  css += '.login-form input {\n';
  css += '  width: 100%;\n';
  css += '}\n\n';
  css += '.login-form button {\n';
  css += '  align-self: flex-start;\n';
  css += '}\n\n';
  
  // Add button styles
  css += '/* Button Styles */\n';
  css += '.secondary-btn {\n';
  css += '  background-color: #6c757d;\n';
  css += '  color: white;\n';
  css += '  border: none;\n';
  css += '  padding: 10px 20px;\n';
  css += '  border-radius: 4px;\n';
  css += '  cursor: pointer;\n';
  css += '  margin-top: 10px;\n';
  css += '}\n\n';
  css += '.secondary-btn:hover {\n';
  css += '  background-color: #5a6268;\n';
  css += '}\n\n';
  
  // Add error and success message styles
  css += '/* Error and Success Messages */\n';
  css += '.error-message {\n';
  css += '  color: #c33;\n';
  css += '  background-color: #fee;\n';
  css += '  border: 1px solid #c33;\n';
  css += '  padding: 10px;\n';
  css += '  border-radius: 4px;\n';
  css += '  font-weight: bold;\n';
  css += '  margin: 10px 0;\n';
  css += '}\n\n';
  css += '.success-message {\n';
  css += '  color: #3c3;\n';
  css += '  background-color: #efe;\n';
  css += '  border: 1px solid #3c3;\n';
  css += '  padding: 10px;\n';
  css += '  border-radius: 4px;\n';
  css += '  font-weight: bold;\n';
  css += '  margin: 10px 0;\n';
  css += '}\n\n';
  
  // Add table styles
  css += '/* User List Table Styles */\n';
  css += '.users-table {\n';
  css += '  width: 100%;\n';
  css += '  border-collapse: collapse;\n';
  css += '  margin: 20px 0;\n';
  css += '  background: white;\n';
  css += '  border-radius: 8px;\n';
  css += '  overflow: hidden;\n';
  css += '  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n';
  css += '}\n\n';
  css += '.users-table thead {\n';
  css += '  background-color: #007bff;\n';
  css += '  color: white;\n';
  css += '}\n\n';
  css += '.users-table th {\n';
  css += '  padding: 12px;\n';
  css += '  text-align: left;\n';
  css += '  font-weight: bold;\n';
  css += '  border: none;\n';
  css += '}\n\n';
  css += '.users-table td {\n';
  css += '  padding: 12px;\n';
  css += '  border-bottom: 1px solid #ddd;\n';
  css += '}\n\n';
  css += '.users-table tbody tr:hover {\n';
  css += '  background-color: #f8f9fa;\n';
  css += '}\n\n';
  css += '.users-table tbody tr:last-child td {\n';
  css += '  border-bottom: none;\n';
  css += '}\n\n';
  css += '.delete-btn {\n';
  css += '  background-color: #dc3545;\n';
  css += '  color: white;\n';
  css += '  border: none;\n';
  css += '  padding: 6px 12px;\n';
  css += '  border-radius: 4px;\n';
  css += '  cursor: pointer;\n';
  css += '  font-size: 12px;\n';
  css += '  font-weight: bold;\n';
  css += '}\n\n';
  css += '.delete-btn:hover {\n';
  css += '  background-color: #c82333;\n';
  css += '}\n\n';
  css += '#create-error-message,\n';
  css += '#create-success-message {\n';
  css += '  padding: 10px;\n';
  css += '  margin: 10px 0;\n';
  css += '  border-radius: 4px;\n';
  css += '  font-weight: bold;\n';
  css += '}\n';
  
  return css;
}

// Generate HTML from body elements
function generateHTML(data) {
  const { title, styles, body, pages } = data;
  
  // Check if using pages array or body array
  const elements = pages ? (pages.find(p => p.name === 'landing')?.body || pages[0]?.body || body) : body;
  const pageTitle = pages ? (pages.find(p => p.name === 'landing')?.title || title) : title;
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
`;
  
  for (const element of elements) {
    html += generateElement(element);
  }
  
  html += `    </div>
    <script src="js/api-integration.js"></script>`;
  
  // Add navigation JavaScript if using pages
  if (pages) {
    html += generateNavigationJS(pages);
  }
  
  html += `</body>
</html>`;
  
  return html;
}

// Generate HTML for a specific page
function generateHTMLForPage(data, page) {
  const { title, styles } = data;
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title || title}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
`;
  
  for (const element of page.body) {
    html += generateElement(element);
  }
  
  html += `    </div>
    <script src="js/api-integration.js"></script>`;
  
  // Add navigation JavaScript
  html += generateNavigationJS(data.pages);
  
  html += `</body>
</html>`;
  
  return html;
}

// Generate navigation JavaScript for multi-page app
function generateNavigationJS(pages) {
  let js = `
    <script>
      // Navigation between pages
      function goToLoginPage() {
        window.location.href = 'login.html';
      }
      
      function goToLandingPage() {
        window.location.href = 'index.html';
      }
      
      function performLogin() {
        const usernameEl = document.getElementById('loginUsername');
        const passwordEl = document.getElementById('loginPassword');
        
        const username = usernameEl ? usernameEl.value : '';
        const password = passwordEl ? passwordEl.value : '';
        
        if (!username || !password) {
          alert('Please enter username and password');
          return;
        }
        
        // Simple login check - in production, verify against backend
        alert('Login successful! Redirecting to dashboard...');
        goToLandingPage();
      }
      
      // Make functions global
      window.goToLoginPage = goToLoginPage;
      window.goToLandingPage = goToLandingPage;
      window.performLogin = performLogin;
    </script>`;
  
  return js;
}

// Generate individual HTML elements
function generateElement(element) {
  const { type, value, label, onClick, ...attrs } = element;
  
  switch (type) {
    case 'header':
      return `      <h1>${escapeHtml(value)}</h1>\n`;
    
    case 'paragraph':
      return `      <p>${escapeHtml(value)}</p>\n`;
    
    case 'button':
      // Escape double quotes in JavaScript and wrap in double quotes for onclick attribute
      const escapedOnClick = onClick ? onClick.replace(/"/g, '\\"') : '';
      const onClickAttr = escapedOnClick ? ` onclick="${escapedOnClick}"` : '';
      return `      <button${onClickAttr}>${escapeHtml(label || 'Button')}</button>\n`;
    
    case 'image':
      const { src, alt } = attrs;
      return `      <img src="${escapeAttr(src)}" alt="${escapeAttr(alt || 'Image')}">\n`;
    
    case 'list':
      const { items, ordered } = attrs;
      const tag = ordered ? 'ol' : 'ul';
      let listHtml = `      <${tag}>\n`;
      for (const item of items) {
        listHtml += `        <li>${escapeHtml(item)}</li>\n`;
      }
      listHtml += `      </${tag}>\n`;
      return listHtml;
    
    case 'div':
      const { className, text, id } = attrs;
      let divHtml = `      <div`;
      if (className) divHtml += ` class="${escapeAttr(className)}"`;
      if (id) divHtml += ` id="${escapeAttr(id)}"`;
      divHtml += `>${escapeHtml(text || '')}</div>\n`;
      return divHtml;
    
    case 'textbox':
    case 'input':
    case 'password':
      const { name, placeholder, defaultValue, required } = attrs;
      const inputType = type === 'password' ? 'password' : (attrs.type || 'text');
      const inputId = attrs.id || name;
      let inputHtml = `      <input type="${escapeAttr(inputType)}"`;
      if (name) inputHtml += ` name="${escapeAttr(name)}"`;
      if (inputId) inputHtml += ` id="${escapeAttr(inputId)}"`;
      if (placeholder) inputHtml += ` placeholder="${escapeAttr(placeholder)}"`;
      if (defaultValue !== undefined) inputHtml += ` value="${escapeAttr(defaultValue)}"`;
      if (required) inputHtml += ` required`;
      inputHtml += `>\n`;
      return inputHtml;
    
    case 'textarea':
      const { name: textareaName, placeholder: textareaPlaceholder, rows, cols } = attrs;
      let textareaHtml = `      <textarea`;
      if (textareaName) textareaHtml += ` name="${escapeAttr(textareaName)}" id="${escapeAttr(textareaName)}"`;
      if (textareaPlaceholder) textareaHtml += ` placeholder="${escapeAttr(textareaPlaceholder)}"`;
      if (rows) textareaHtml += ` rows="${rows}"`;
      if (cols) textareaHtml += ` cols="${cols}"`;
      textareaHtml += `>`;
      if (attrs.value) textareaHtml += escapeHtml(attrs.value);
      textareaHtml += `</textarea>\n`;
      return textareaHtml;
    
    default:
      console.warn(`Unknown element type: ${type}`);
      return '';
  }
}

// Escape HTML entities
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Escape HTML attributes (using double quotes in attribute, so escape single quotes)
function escapeAttr(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Generate JavaScript for event handlers
function generateJS(data) {
  let js = '// Generated JavaScript with API Integration\n\n';
  
  // Add API base URL
  const apiBaseUrl = data.database && data.database.apiBaseUrl 
    ? data.database.apiBaseUrl 
    : 'http://localhost:3000/api';
  
  js += `const API_BASE_URL = '${apiBaseUrl}';\n\n`;
  
  // Generate API functions for each model
  if (data.database && data.database.enabled && data.database.models) {
    js += generateAPIFunctions(data.database.models);
  }
  
  return js;
}

// Generate API functions for models
function generateAPIFunctions(models) {
  let js = '';
  
  models.forEach(model => {
    const modelName = model.name;
    const modelNameLower = model.name.toLowerCase();
    const modelNamePlural = modelNameLower + 's';
    
    // Generate function names from endpoints
    model.endpoints.forEach(endpoint => {
      if (!endpoint.enabled || !endpoint.uiFunction) return;
      
      const funcName = endpoint.uiFunction;
      const method = endpoint.method;
      
      if (method === 'GET' && endpoint.path.includes(`/${modelNamePlural}`) && !endpoint.path.includes(':id')) {
        // List all
        js += `// List all ${modelNamePlural}\n`;
        js += `async function ${funcName}() {\n`;
        js += `  try {\n`;
        js += `    const response = await fetch(\`\${API_BASE_URL}/${modelNamePlural}\`);\n`;
        js += `    const data = await response.json();\n`;
        js += `    console.log('${modelNamePlural}:', data);\n`;
        js += `    display${modelName}List(data);\n`;
        js += `  } catch (error) {\n`;
        js += `    console.error('Error fetching ${modelNamePlural}:', error);\n`;
        js += `    alert('Error loading ${modelNamePlural}');\n`;
        js += `  }\n`;
        js += `}\n\n`;
      } else if (method === 'POST') {
        // Create
        js += `// Create ${modelNameLower}\n`;
        js += `async function ${funcName}() {\n`;
        js += `  try {\n`;
        js += `    const formData = getFormData();\n`;
        js += `    const response = await fetch(\`\${API_BASE_URL}/${modelNamePlural}\`, {\n`;
        js += `      method: 'POST',\n`;
        js += `      headers: { 'Content-Type': 'application/json' },\n`;
        js += `      body: JSON.stringify(formData)\n`;
        js += `    });\n`;
        js += `    const data = await response.json();\n`;
        js += `    console.log('Created:', data);\n`;
        js += `    alert('${modelName} created successfully!');\n`;
        js += `    clearForm();\n`;
        js += `  } catch (error) {\n`;
        js += `    console.error('Error creating ${modelNameLower}:', error);\n`;
        js += `    alert('Error creating ${modelNameLower}');\n`;
        js += `  }\n`;
        js += `}\n\n`;
      }
    });
  });
  
  // Helper functions
  js += `// Helper function to get form data\n`;
  js += `function getFormData() {\n`;
  js += `  return {\n`;
  js += `    username: document.getElementById('username')?.value || '',\n`;
  js += `    email: document.getElementById('email')?.value || '',\n`;
  js += `    password: document.getElementById('password')?.value || '',\n`;
  js += `    role: 'user'\n`;
  js += `  };\n`;
  js += `}\n\n`;
  
  js += `// Helper function to clear form\n`;
  js += `function clearForm() {\n`;
  js += `  document.getElementById('username')?.value = '';\n`;
  js += `  document.getElementById('email')?.value = '';\n`;
  js += `  document.getElementById('password')?.value = '';\n`;
  js += `}\n\n`;
  
  js += `// Display users list in tabular format\n`;
  js += `function displayUserList(users) {\n`;
  js += `  // Try to find by ID first, then by class\n`;
  js += `  let container = document.getElementById('users-list');\n`;
  js += `  if (!container) {\n`;
  js += `    container = document.querySelector('.users-list');\n`;
  js += `  }\n`;
  js += `  \n`;
  js += `  if (!container) {\n`;
  js += `    // Create container if it doesn't exist\n`;
  js += `    container = document.createElement('div');\n`;
  js += `    container.className = 'users-list';\n`;
  js += `    container.id = 'users-list';\n`;
  js += `    \n`;
  js += `    // Find the container div or body and append\n`;
  js += `    const mainContainer = document.querySelector('.container');\n`;
  js += `    if (mainContainer) {\n`;
  js += `      mainContainer.appendChild(container);\n`;
  js += `    } else {\n`;
  js += `      document.body.appendChild(container);\n`;
  js += `    }\n`;
  js += `  }\n`;
  js += `  \n`;
  js += `  if (users.length === 0) {\n`;
  js += `    container.innerHTML = '<p>No users found</p>';\n`;
  js += `    return;\n`;
  js += `  }\n`;
  js += `  \n`;
  js += `  // Create table HTML\n`;
  js += `  let tableHTML = '<h3>Registered Users</h3>';\n`;
  js += `  tableHTML += '<table class="users-table">';\n`;
  js += `  tableHTML += '<thead>';\n`;
  js += `  tableHTML += '<tr>';\n`;
  js += `  tableHTML += '<th>Username</th>';\n`;
  js += `  tableHTML += '<th>Email</th>';\n`;
  js += `  tableHTML += '<th>Role</th>';\n`;
  js += `  tableHTML += '<th>Created</th>';\n`;
  js += `  tableHTML += '<th>Actions</th>';\n`;
  js += `  tableHTML += '</tr>';\n`;
  js += `  tableHTML += '</thead>';\n`;
  js += `  tableHTML += '<tbody>';\n`;
  js += `  \n`;
  js += `  // Add user rows\n`;
  js += `  users.forEach(user => {\n`;
  js += `    const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';\n`;
  js += `    tableHTML += '<tr>';\n`;
  js += `    tableHTML += \`<td>\${escapeHtml(user.username || 'N/A')}</td>\`;\n`;
  js += `    tableHTML += \`<td>\${escapeHtml(user.email || 'N/A')}</td>\`;\n`;
  js += `    tableHTML += \`<td>\${escapeHtml(user.role || 'user')}</td>\`;\n`;
  js += `    tableHTML += \`<td>\${escapeHtml(createdDate)}</td>\`;\n`;
  js += `    tableHTML += \`<td><button onclick="deleteUser('\${user._id}')" class="delete-btn">Delete</button></td>\`;\n`;
  js += `    tableHTML += '</tr>';\n`;
  js += `  });\n`;
  js += `  \n`;
  js += `  tableHTML += '</tbody>';\n`;
  js += `  tableHTML += '</table>';\n`;
  js += `  \n`;
  js += `  container.innerHTML = tableHTML;\n`;
  js += `}\n\n`;
  
  js += `// Helper to escape HTML\n`;
  js += `function escapeHtml(text) {\n`;
  js += `  if (!text) return '';\n`;
  js += `  const div = document.createElement('div');\n`;
  js += `  div.textContent = text;\n`;
  js += `  return div.innerHTML;\n`;
  js += `}\n\n`;
  
  js += `// Delete user function\n`;
  js += `async function deleteUser(userId) {\n`;
  js += `  if (!confirm('Are you sure you want to delete this user?')) {\n`;
  js += `    return;\n`;
  js += `  }\n`;
  js += `  \n`;
  js += `  try {\n`;
  js += `    const response = await fetch(\`\${API_BASE_URL}/users/\${userId}\`, {\n`;
  js += `      method: 'DELETE'\n`;
  js += `    });\n`;
  js += `    \n`;
  js += `    if (response.ok) {\n`;
  js += `      alert('User deleted successfully');\n`;
  js += `      await listAllUsers();\n`;
  js += `    } else {\n`;
  js += `      alert('Error deleting user');\n`;
  js += `    }\n`;
  js += `  } catch (error) {\n`;
  js += `    console.error('Error deleting user:', error);\n`;
  js += `    alert('Error deleting user');\n`;
  js += `  }\n`;
  js += `}\n\n`;
  
  js += `// Make functions global\n`;
  js += `if (typeof window !== 'undefined') {\n`;
  models.forEach(model => {
    model.endpoints.forEach(endpoint => {
      if (endpoint.uiFunction) {
        js += `  window.${endpoint.uiFunction} = ${endpoint.uiFunction};\n`;
      }
    });
  });
  js += `  window.deleteUser = deleteUser;\n`;
  js += `}\n`;
  
  return js;
}

// Generate server application files
function generateServerFiles(outputDir, data) {
  const serverDir = path.join(outputDir, 'server');
  const modelsDir = path.join(serverDir, 'models');
  const routesDir = path.join(serverDir, 'routes');
  const configDir = path.join(serverDir, 'config');
  
  // Create server directories
  [serverDir, modelsDir, routesDir, configDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Generate server.js
  const serverContent = generateServerJS(data);
  fs.writeFileSync(path.join(serverDir, 'server.js'), serverContent, 'utf8');
  
  // Generate database connection
  const dbContent = generateDatabaseConfig();
  fs.writeFileSync(path.join(configDir, 'database.js'), dbContent, 'utf8');
  
  // Generate models from input JSON if available
  if (data.database && data.database.enabled && data.database.models) {
    // Generate each model
    data.database.models.forEach(model => {
      const modelContent = generateDynamicModel(model);
      const filename = model.name.toLowerCase() + 'Model.js';
      fs.writeFileSync(path.join(modelsDir, filename), modelContent, 'utf8');
    });
    
    // Generate combined API routes for all models
    const apiContent = generateDynamicAPIRoutes(data.database.models);
    fs.writeFileSync(path.join(routesDir, 'api.js'), apiContent, 'utf8');
  } else {
    // Fallback to generic model
    const modelContent = generateModel();
    fs.writeFileSync(path.join(modelsDir, 'dataModel.js'), modelContent, 'utf8');
    
    const apiContent = generateAPIRoutes(data);
    fs.writeFileSync(path.join(routesDir, 'api.js'), apiContent, 'utf8');
  }
  
  // Generate package.json for server
  const packageContent = generatePackageJSON();
  fs.writeFileSync(path.join(outputDir, 'package.json'), packageContent, 'utf8');
  
  // Generate .env.example
  const envContent = generateEnvExample();
  fs.writeFileSync(path.join(outputDir, '.env.example'), envContent, 'utf8');
}

// Generate server.js content
function generateServerJS(data) {
  return `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to database and start server
db().then(() => {
  app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});

module.exports = app;
`;
}

// Generate database configuration
function generateDatabaseConfig() {
  return `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/json-to-web', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
`;
}

// Generate API routes
function generateAPIRoutes(data) {
  return `const express = require('express');
const router = express.Router();
const DataModel = require('../models/dataModel');

// GET all data
router.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single data by ID
router.get('/data/:id', async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new data
router.post('/data', async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update data
router.put('/data/:id', async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE data
router.delete('/data/:id', async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Data deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
`;
}

// Generate MongoDB model
function generateModel() {
  return `const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before saving
dataSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Data', dataSchema);
`;
}

// Generate package.json for output
function generatePackageJSON() {
  return `{
  "name": "json-to-web-app",
  "version": "1.0.0",
  "description": "Full-stack web application with MongoDB",
  "main": "server/server.js",
  "scripts": {
    "start": "node server/server.js",
    "dev": "nodemon server/server.js",
    "test": "echo \\"No tests specified\\""
  },
  "keywords": [
    "json",
    "web",
    "mongodb",
    "express"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcrypt": "^5.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
`;
}

// Generate .env.example
function generateEnvExample() {
  return `# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/json-to-web

# Server Port
PORT=3000

# Environment
NODE_ENV=development
`;
}

// Generate all files
function generateFiles(inputFile, configData) {
  const data = configData || readInputFile(inputFile);
  
  // Create output directory structure (relative to project root)
  const outputDir = path.join(__dirname, '..', 'output-web');
  const cssDir = path.join(outputDir, 'css');
  const jsDir = path.join(outputDir, 'js');
  
  // Create directories if they don't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  
  // Generate frontend files
  let html;
  
  // Check if using pages or single page
  if (data.pages && Array.isArray(data.pages)) {
    // Generate multiple pages
    for (const page of data.pages) {
      html = generateHTMLForPage(data, page);
      const filename = page.name === 'login' ? 'login.html' : 'index.html';
      fs.writeFileSync(path.join(outputDir, filename), html, 'utf8');
    }
  } else {
    // Generate single page
    html = generateHTML(data);
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');
  }
  
  const css = data.styles ? generateCSS(data.styles) : '';
  fs.writeFileSync(path.join(cssDir, 'style.css'), css, 'utf8');
  
  const js = generateJS(data);
  fs.writeFileSync(path.join(jsDir, 'api-integration.js'), js, 'utf8');
  
  // Generate backend files
  generateServerFiles(outputDir, data);
  
  console.log('Full-stack web application generated successfully!');
  console.log('Folder structure:');
  console.log('  output-web/');
  console.log('    - index.html');
  console.log('    - css/style.css');
  console.log('    - js/script.js');
  console.log('    - server/');
  console.log('      - server.js');
  console.log('      - models/dataModel.js');
  console.log('      - routes/api.js');
  console.log('      - config/database.js');
  console.log('    - package.json');
  console.log('    - .env.example');
}

// Generate dynamic model from JSON definition
function generateDynamicModel(modelDef) {
  const modelName = modelDef.name;
  const modelNameLower = modelName.toLowerCase();
  
  let schemaFields = '\n';
  
  modelDef.fields.forEach(field => {
    const fieldType = getMongooseType(field.type);
    let fieldDef = `  ${field.name}: {\n`;
    fieldDef += `    type: ${fieldType}`;
    
    if (field.required) {
      fieldDef += ',\n    required: true';
    }
    if (field.unique) {
      fieldDef += ',\n    unique: true';
    }
    if (field.default !== undefined) {
      fieldDef += `,\n    default: ${JSON.stringify(field.default)}`;
    }
    if (field.enum) {
      fieldDef += `,\n    enum: [${field.enum.map(e => `"${e}"`).join(', ')}]`;
    }
    if (field.ref) {
      fieldDef += `,\n    ref: '${field.ref}'`;
    }
    
    fieldDef += '\n  }';
    schemaFields += fieldDef + ',\n';
  });
  
  // Add timestamps
  schemaFields += '  createdAt: {\n';
  schemaFields += '    type: Date,\n';
  schemaFields += '    default: Date.now\n';
  schemaFields += '  },\n';
  schemaFields += '  updatedAt: {\n';
  schemaFields += '    type: Date,\n';
  schemaFields += '    default: Date.now\n';
  schemaFields += '  }\n';
  
  let preSaveHook = '';
  
  // Add password hashing for User models
  if (modelName.toLowerCase() === 'user') {
    preSaveHook = `
const bcrypt = require('bcrypt');

// Hash password before saving
${modelNameLower}Schema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    this.updatedAt = Date.now();
    return next();
  }
  
  try {
    // Hash password with a salt round of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
${modelNameLower}Schema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
`;
  } else {
    preSaveHook = `
// Update timestamp before saving
${modelNameLower}Schema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
`;
  }
  
  return `const mongoose = require('mongoose');

const ${modelNameLower}Schema = new mongoose.Schema({${schemaFields}});
${preSaveHook}

module.exports = mongoose.model('${modelName}', ${modelNameLower}Schema);
`;
}

// Generate dynamic API routes for multiple models
function generateDynamicAPIRoutes(models) {
  let imports = '';
  let routes = '';
  
  models.forEach(model => {
    const modelName = model.name;
    const modelNameLower = modelName.toLowerCase();
    const modelVar = modelName.charAt(0).toLowerCase() + modelName.slice(1);
    
    imports += `const ${modelName}Model = require('../models/${modelNameLower}Model');\n`;
    
    // Add login route for User model
    if (modelName.toLowerCase() === 'user') {
      routes += `
// ==================== ${modelName} Routes ====================
// Login endpoint
router.post('/${modelNameLower}s/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Find user by username
    const user = await ${modelName}Model.findOne({ username: username });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Return user data (excluding password)
    const userData = user.toObject();
    delete userData.password;
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all ${modelName}
router.get('/${modelNameLower}s', async (req, res) => {
  try {
    const data = await ${modelName}Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single ${modelName} by ID
router.get('/${modelNameLower}s/:id', async (req, res) => {
  try {
    const data = await ${modelName}Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: '${modelName} not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new ${modelName}
router.post('/${modelNameLower}s', async (req, res) => {
  try {
    const newData = new ${modelName}Model(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update ${modelName}
router.put('/${modelNameLower}s/:id', async (req, res) => {
  try {
    const updatedData = await ${modelName}Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: '${modelName} not found' });
    }
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE ${modelName}
router.delete('/${modelNameLower}s/:id', async (req, res) => {
  try {
    const deletedData = await ${modelName}Model.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: '${modelName} not found' });
    }
    res.json({ message: '${modelName} deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

`;
    } else {
      // For non-User models, just generate standard routes
      routes += `
// ==================== ${modelName} Routes ====================
// GET all ${modelName}
router.get('/${modelNameLower}s', async (req, res) => {
  try {
    const data = await ${modelName}Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single ${modelName} by ID
router.get('/${modelNameLower}s/:id', async (req, res) => {
  try {
    const data = await ${modelName}Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: '${modelName} not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new ${modelName}
router.post('/${modelNameLower}s', async (req, res) => {
  try {
    const newData = new ${modelName}Model(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update ${modelName}
router.put('/${modelNameLower}s/:id', async (req, res) => {
  try {
    const updatedData = await ${modelName}Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: '${modelName} not found' });
    }
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE ${modelName}
router.delete('/${modelNameLower}s/:id', async (req, res) => {
  try {
    const deletedData = await ${modelName}Model.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: '${modelName} not found' });
    }
    res.json({ message: '${modelName} deleted successfully', data: deletedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

`;
    }
  });
  
  return `const express = require('express');
const router = express.Router();
${imports}
${routes}
module.exports = router;
`;
}

// Helper function to convert JSON type to Mongoose type
function getMongooseType(type) {
  const typeMap = {
    'String': 'String',
    'Number': 'Number',
    'Boolean': 'Boolean',
    'Date': 'Date',
    'ObjectId': 'mongoose.Schema.Types.ObjectId',
    'Mixed': 'mongoose.Schema.Types.Mixed',
    'Array': 'Array'
  };
  
  return typeMap[type] || 'String';
}

// Generate from modular config files
function generateFromConfig() {
  const configDir = path.join(__dirname, '..', 'config');
  
  try {
    // Read all config files
    const frontend = JSON.parse(fs.readFileSync(path.join(configDir, 'front-end.json'), 'utf8'));
    const backend = JSON.parse(fs.readFileSync(path.join(configDir, 'back-end.json'), 'utf8'));
    const database = JSON.parse(fs.readFileSync(path.join(configDir, 'database.json'), 'utf8'));
    const models = JSON.parse(fs.readFileSync(path.join(configDir, 'models.json'), 'utf8'));
    
    // Read page files
    const pagesDir = path.join(configDir, 'pages');
    const pageFiles = fs.readdirSync(pagesDir);
    const pages = pageFiles.map(file => {
      if (file.endsWith('.json')) {
        return JSON.parse(fs.readFileSync(path.join(pagesDir, file), 'utf8'));
      }
      return null;
    }).filter(Boolean);
    
    // Combine into single config object
    const combinedConfig = {
      title: frontend.title,
      styles: frontend.styles,
      pages: pages,
      database: {
        enabled: backend.enabled && database.enabled,
        apiBaseUrl: frontend.apiBaseUrl,
        models: models.models,
        ...database
      }
    };
    
    // Generate files from combined config
    generateFiles(null, combinedConfig);
    
  } catch (error) {
    console.error('Error reading config files:', error.message);
    console.error('Make sure all config files exist in the config/ folder');
    process.exit(1);
  }
}

// Export for use as module
module.exports = { generateFiles, readInputFile, generateHTML, generateCSS, generateJS, generateFromConfig };

// Run if called directly
if (require.main === module) {
generateFiles();
}

