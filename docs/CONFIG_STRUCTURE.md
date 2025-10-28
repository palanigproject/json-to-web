# Modular Configuration Structure

## 📁 Configuration Files

Your application now uses a modular configuration structure with separate JSON files for better maintainability:

```
config/
├── front-end.json      # Frontend styling and API configuration
├── back-end.json       # Backend server settings
├── database.json       # Database connection settings
├── models.json         # Database models and API endpoints
└── pages/             # Page-specific configurations
    ├── login.json     # Login page
    └── landing.json   # User Management page
```

---

## 📄 Configuration Files Explained

### 1. front-end.json
**Purpose:** Frontend configuration
```json
{
  "title": "User Management System",
  "styles": { ... },
  "apiBaseUrl": "http://localhost:3000/api"
}
```

**Contains:**
- Page title
- Global CSS styles
- API base URL

---

### 2. back-end.json
**Purpose:** Backend server configuration
```json
{
  "enabled": true,
  "port": 3000,
  "cors": true
}
```

**Contains:**
- Backend enable flag
- Server port
- CORS settings
- Middleware configuration

---

### 3. database.json
**Purpose:** Database connection settings
```json
{
  "enabled": true,
  "connection": {
    "uri": "mongodb://127.0.0.1:27017/json-to-web",
    "options": { ... }
  }
}
```

**Contains:**
- Database enable flag
- Connection URI
- Connection options
- Database name

---

### 4. models.json
**Purpose:** Database models and API endpoints
```json
{
  "models": [
    {
      "name": "User",
      "endpoints": [ ... ],
      "fields": [ ... ]
    }
  ]
}
```

**Contains:**
- Model definitions
- API endpoints configuration
- Field schemas
- Validation rules

---

### 5. pages/login.json
**Purpose:** Login page configuration
```json
{
  "name": "login",
  "title": "Login",
  "body": [ ... ]
}
```

**Contains:**
- Page name and title
- Page elements (inputs, buttons, etc.)
- Navigation paths

---

### 6. pages/landing.json
**Purpose:** User Management page configuration
```json
{
  "name": "landing",
  "title": "User Management",
  "body": [ ... ]
}
```

**Contains:**
- Page name and title
- User management form elements
- API integration points

---

## 🚀 Usage

### Default (Modular Config)
```bash
npm start
```
Uses configuration from `config/` folder

### Legacy (Single File)
```bash
node index.js examples/input.json
```
Uses single input.json file

---

## ✅ Benefits of Modular Structure

1. **Separation of Concerns**
   - Frontend config separate from backend
   - Database settings isolated
   - Pages can be developed independently

2. **Maintainability**
   - Easier to find and update specific configurations
   - Smaller, focused files
   - Clear organization

3. **Flexibility**
   - Add new pages without editing existing files
   - Change styles without touching API config
   - Update models independently

4. **Collaboration**
   - Team members can work on different config files
   - Reduced merge conflicts
   - Clear ownership

5. **Scalability**
   - Easy to add new models
   - Simple to add new pages
   - Can reorganize without breaking existing code

---

## 📝 Adding New Pages

1. Create a new JSON file in `config/pages/`
2. Define page structure:
```json
{
  "name": "newpage",
  "title": "New Page",
  "body": [ ... ]
}
```
3. Run `npm start` to regenerate

---

## 📝 Adding New Models

1. Edit `config/models.json`
2. Add model definition:
```json
{
  "name": "Product",
  "endpoints": [ ... ],
  "fields": [ ... ]
}
```
3. Run `npm start` to regenerate

---

## 🔄 Migration from Single File

**Old way:**
- Single `examples/input.json` file
- All configuration in one place

**New way:**
- Modular `config/` folder
- Separate files for different concerns

**Both supported:**
```bash
npm start               # Uses config/ folder (new)
node index.js path.json # Uses single file (old)
```

---

## 🎯 File Naming Conventions

- `front-end.json` - Frontend configuration
- `back-end.json` - Backend configuration
- `database.json` - Database settings
- `models.json` - Data models
- `pages/*.json` - Page configurations

All files are lowercase with hyphens for separation.

