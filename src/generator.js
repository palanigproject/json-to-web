const fs = require('fs');
const path = require('path');

// Helper function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

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
  
  // Add error/success message containers for login page
  if (page.name === 'login') {
    html += `      <div id="login-error-message" class="error-message" style="display: none;"></div>\n`;
    html += `      <div id="login-success-message" class="success-message" style="display: none;"></div>\n`;
  }
  
  // Add error/success message containers for landing/user management page
  if (page.name === 'landing') {
    html += `      <div id="create-error-message" class="error-message" style="display: none;"></div>\n`;
    html += `      <div id="create-success-message" class="success-message" style="display: none;"></div>\n`;
  }
  
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
      
      // performLogin() is defined in api-integration.js and calls backend MongoDB API
      // DO NOT define a dummy performLogin here - it will override the real one!
      
      // Make functions global
      window.goToLoginPage = goToLoginPage;
      window.goToLandingPage = goToLandingPage;
      // performLogin is imported from api-integration.js
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
  
  // Always use relative path '/api' - Nginx proxies to backend container (port 3001 internally)
  // DO NOT use http://localhost:3001 directly - port 3001 is NOT exposed to browser
  // This ensures it works through the nginx reverse proxy
  js += `// Use relative path '/api' - Nginx proxies to backend container (port 3001 internally)\n`;
  js += `// DO NOT use http://localhost:3001 directly - port 3001 is NOT exposed to browser\n`;
  js += `const API_BASE_URL = '/api';\n\n`;
  
  // Generate API functions for each model
  if (data.database && data.database.enabled && data.database.models) {
    js += generateAPIFunctions(data.database.models);
  }
  
  // Add helper functions for inline error/success messages
  js += generateMessageHelpers();
  
  // Add performLogin function if login page exists
  const hasLoginPage = data.pages && data.pages.some(p => p.name === 'login');
  if (hasLoginPage) {
    js += generatePerformLogin();
  }
  
  // Add function exports
  if (data.database && data.database.enabled && data.database.models) {
    js += addFunctionExports('', data.database.models);
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
        js += `  // Hide previous messages\n`;
        js += `  hideError('create-error-message');\n`;
        js += `  hideSuccess('create-success-message');\n`;
        js += `  \n`;
        js += `  try {\n`;
        js += `    const formData = getFormData();\n`;
        js += `    \n`;
        js += `    // Basic validation\n`;
        js += `    if (!formData.username || !formData.email || !formData.password) {\n`;
        js += `      showError('create-error-message', 'Please fill in all required fields');\n`;
        js += `      return;\n`;
        js += `    }\n`;
        js += `    \n`;
        js += `    const response = await fetch(\`\${API_BASE_URL}/${modelNamePlural}\`, {\n`;
        js += `      method: 'POST',\n`;
        js += `      headers: { 'Content-Type': 'application/json' },\n`;
        js += `      body: JSON.stringify(formData)\n`;
        js += `    });\n`;
        js += `    const data = await response.json();\n`;
        js += `    \n`;
        js += `    if (response.ok) {\n`;
        js += `      console.log('Created:', data);\n`;
        js += `      showSuccess('create-success-message', '${modelName} created successfully!');\n`;
        js += `      clearForm();\n`;
        js += `    } else {\n`;
        js += `      showError('create-error-message', data.error || 'Error creating ${modelNameLower}');\n`;
        js += `    }\n`;
        js += `  } catch (error) {\n`;
        js += `    console.error('Error creating ${modelNameLower}:', error);\n`;
        js += `    showError('create-error-message', 'Error creating ${modelNameLower}. Please try again.');\n`;
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
  js += `  const usernameEl = document.getElementById('username');\n`;
  js += `  if (usernameEl) usernameEl.value = '';\n`;
  js += `  const emailEl = document.getElementById('email');\n`;
  js += `  if (emailEl) emailEl.value = '';\n`;
  js += `  const passwordEl = document.getElementById('password');\n`;
  js += `  if (passwordEl) passwordEl.value = '';\n`;
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
  
  return js;
}

// Generate helper functions for inline error/success messages
function generateMessageHelpers() {
  let js = '';
  js += `// Helper function to show inline error message\n`;
  js += `function showError(elementId, message) {\n`;
  js += `  const errorEl = document.getElementById(elementId);\n`;
  js += `  if (errorEl) {\n`;
  js += `    errorEl.textContent = message;\n`;
  js += `    errorEl.style.display = 'block';\n`;
  js += `    errorEl.className = 'error-message';\n`;
  js += `  }\n`;
  js += `}\n\n`;
  js += `// Helper function to hide error message\n`;
  js += `function hideError(elementId) {\n`;
  js += `  const errorEl = document.getElementById(elementId);\n`;
  js += `  if (errorEl) {\n`;
  js += `    errorEl.style.display = 'none';\n`;
  js += `    errorEl.textContent = '';\n`;
  js += `  }\n`;
  js += `}\n\n`;
  js += `// Helper function to show inline success message\n`;
  js += `function showSuccess(elementId, message) {\n`;
  js += `  const successEl = document.getElementById(elementId);\n`;
  js += `  if (successEl) {\n`;
  js += `    successEl.textContent = message;\n`;
  js += `    successEl.style.display = 'block';\n`;
  js += `    successEl.className = 'success-message';\n`;
  js += `  }\n`;
  js += `}\n\n`;
  js += `// Helper function to hide success message\n`;
  js += `function hideSuccess(elementId) {\n`;
  js += `  const successEl = document.getElementById(elementId);\n`;
  js += `  if (successEl) {\n`;
  js += `    successEl.style.display = 'none';\n`;
  js += `    successEl.textContent = '';\n`;
  js += `  }\n`;
  js += `}\n\n`;
  return js;
}

// Generate performLogin function for MongoDB authentication
function generatePerformLogin() {
  let js = '';
  js += `// Login function - authenticates with backend MongoDB\n`;
  js += `async function performLogin() {\n`;
  js += `  // Hide previous errors\n`;
  js += `  hideError('login-error-message');\n`;
  js += `  hideSuccess('login-success-message');\n`;
  js += `  \n`;
  js += `  const usernameEl = document.getElementById('loginUsername');\n`;
  js += `  const passwordEl = document.getElementById('loginPassword');\n`;
  js += `  \n`;
  js += `  const username = usernameEl ? usernameEl.value.trim() : '';\n`;
  js += `  const password = passwordEl ? passwordEl.value : '';\n`;
  js += `  \n`;
  js += `  if (!username || !password) {\n`;
  js += `    showError('login-error-message', 'Please enter username and password');\n`;
  js += `    return;\n`;
  js += `  }\n`;
  js += `  \n`;
  js += `  try {\n`;
  js += `    const response = await fetch(\`\${API_BASE_URL}/users/login\`, {\n`;
  js += `      method: 'POST',\n`;
  js += `      headers: { 'Content-Type': 'application/json' },\n`;
  js += `      body: JSON.stringify({ username, password })\n`;
  js += `    });\n`;
  js += `    \n`;
  js += `    const data = await response.json();\n`;
  js += `    \n`;
  js += `    if (response.ok && data.message === 'Login successful') {\n`;
  js += `      showSuccess('login-success-message', 'Login successful! Redirecting to dashboard...');\n`;
  js += `      // Store user info in sessionStorage if needed\n`;
  js += `      if (data.user) {\n`;
  js += `        sessionStorage.setItem('loggedInUser', JSON.stringify(data.user));\n`;
  js += `      }\n`;
  js += `      setTimeout(() => {\n`;
  js += `        window.location.href = 'index.html';\n`;
  js += `      }, 1000);\n`;
  js += `    } else {\n`;
  js += `      showError('login-error-message', data.error || 'Invalid username or password');\n`;
  js += `    }\n`;
  js += `  } catch (error) {\n`;
  js += `    console.error('Login error:', error);\n`;
  js += `    showError('login-error-message', 'Error connecting to server. Please check if backend is running.');\n`;
  js += `  }\n`;
  js += `}\n\n`;
  return js;
}

// Add function exports at end of generateAPIFunctions
function addFunctionExports(js, models) {
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
  js += `  window.showError = showError;\n`;
  js += `  window.hideError = hideError;\n`;
  js += `  window.showSuccess = showSuccess;\n`;
  js += `  window.hideSuccess = hideSuccess;\n`;
  js += `  window.performLogin = performLogin;\n`;
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
  
  // Generate .env file (actual file with default values)
  try {
    const envPath = path.join(outputDir, '.env');
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log(`Created .env file at: ${envPath}`);
  } catch (error) {
    console.error(`Error creating .env file: ${error.message}`);
    // Continue anyway - .env.example is still useful
  }
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

// Generate logo.svg
function generateLogo(outputDir) {
  const logoSvg = `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="80" height="80" rx="15" fill="url(#grad1)"/>
  <text x="40" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">CADP</text>
</svg>`;
  
  fs.writeFileSync(path.join(outputDir, 'logo.svg'), logoSvg, 'utf8');
  console.log('Generated logo.svg');
}

// Generate Docker files
function generateDockerFiles(outputDir, data) {
  const dockerDir = path.join(outputDir, 'docker');
  if (!fs.existsSync(dockerDir)) {
    fs.mkdirSync(dockerDir, { recursive: true });
  }
  
  // Generate Dockerfile
  const dockerfile = `# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev --production

# Copy application files
COPY server/ ./server/
COPY css/ ./css/
COPY js/ ./js/
COPY *.html ./

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server/server.js"]`;
  
  fs.writeFileSync(path.join(dockerDir, 'Dockerfile'), dockerfile, 'utf8');
  
  // Generate Dockerfile.dev
  const dockerfileDev = `# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy application files
COPY server/ ./server/
COPY css/ ./css/
COPY js/ ./js/
COPY *.html ./

# Expose port
EXPOSE 3001

# Start with nodemon for development
CMD ["npx", "nodemon", "server/server.js"]`;
  
  fs.writeFileSync(path.join(dockerDir, 'Dockerfile.dev'), dockerfileDev, 'utf8');
  
  // Generate docker-compose.yml
  const dockerCompose = `services:
  # MongoDB Database
  mongodb:
    image: mongo:7
    container_name: cadp-mongodb
    restart: on-failure
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: json-to-web
    volumes:
      - mongodb_data:/data/db
    networks:
      - cadp-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/json-to-web --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  # Node.js Backend Application
  app:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    container_name: cadp-app
    restart: on-failure
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:password123@mongodb:27017/json-to-web?authSource=admin
      - PORT=3001
    depends_on:
      mongodb:
        condition: service_healthy
    networks:
      - cadp-network
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 3s
      retries: 3

  # Nginx Frontend
  nginx:
    build:
      context: ..
      dockerfile: docker/Dockerfile.nginx
    container_name: cadp-nginx
    restart: on-failure
    ports:
      - "8080:80"
    depends_on:
      app:
        condition: service_healthy
    networks:
      - cadp-network

volumes:
  mongodb_data:
    driver: local

networks:
  cadp-network:
    name: cadp-network
    driver: bridge`;
  
  fs.writeFileSync(path.join(dockerDir, 'docker-compose.yml'), dockerCompose, 'utf8');
  
  // Generate Dockerfile.nginx
  const dockerfileNginx = `FROM nginx:alpine

# Copy static files to nginx html directory
COPY *.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY logo.svg /usr/share/nginx/html/

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]`;
  
  fs.writeFileSync(path.join(dockerDir, 'Dockerfile.nginx'), dockerfileNginx, 'utf8');
  
  // Generate nginx.conf
  const nginxConf = `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index login.html;

    # Serve static files (HTML, CSS, JS, images)
    location / {
        try_files $uri $uri/ /login.html;
    }

    # Proxy API requests to Node.js backend
    location /api {
        proxy_pass http://cadp-app:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy health check
    location /health {
        proxy_pass http://cadp-app:3001/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Gzip compression for better performance
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \\\\.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`;
  
  fs.writeFileSync(path.join(dockerDir, 'nginx.conf'), nginxConf, 'utf8');
  
  // Generate .dockerignore
  const dockerignore = `node_modules
npm-debug.log
.git
.gitignore
*.md
README.md
.DS_Store
*.log
.env
.env.local
.env.*.local

# Exclude docker folder from builds
docker/`;
  
  fs.writeFileSync(path.join(dockerDir, '.dockerignore'), dockerignore, 'utf8');
  
  console.log('Generated Docker files in docker/ folder');
}

// Generate .env.example
function generateEnvExample() {
  return `# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/json-to-web

# Server Port (Preview server uses port 3001 to avoid conflict with dashboard on 3000)
PORT=3001

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
  
  // Generate logo.svg
  generateLogo(outputDir);
  
  // Generate backend files
  generateServerFiles(outputDir, data);
  
  // Generate Docker files
  generateDockerFiles(outputDir, data);
  
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
    console.log('    - .env');
    console.log('    - logo.svg');
    console.log('    - docker/');
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
  
  // Use custom collection name for User model
  const collectionName = (modelName.toLowerCase() === 'user') ? 'sanchu-users' : null;
  const modelExport = collectionName 
    ? `module.exports = mongoose.model('${modelName}', ${modelNameLower}Schema, '${collectionName}');`
    : `module.exports = mongoose.model('${modelName}', ${modelNameLower}Schema);`;
  
  return `const mongoose = require('mongoose');

const ${modelNameLower}Schema = new mongoose.Schema({${schemaFields}});
${preSaveHook}

${modelExport}
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

