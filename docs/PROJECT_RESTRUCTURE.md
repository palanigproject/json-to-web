# Project Restructure - Main App Separation

## Overview

The project has been restructured to separate the dashboard (main-app) from the generated output (output-web).

## New Structure

```
json-to-web/
├── main-app/              # Dashboard application (runs on port 3000)
│   ├── dashboard.html     # Dashboard UI
│   ├── server.js          # Dashboard server
│   ├── package.json       # Dashboard dependencies
│   └── README.md          # Dashboard documentation
│
├── output-web/            # Generated application (built by dashboard)
│   ├── *.html             # Generated HTML pages
│   ├── css/               # Generated CSS
│   ├── js/                # Generated JavaScript
│   ├── server/            # Backend API server
│   └── docker/            # Docker configuration
│
├── src/                   # Generator source code
│   └── generator.js       # File generation logic
│
├── config/                # JSON configuration files
│   ├── front-end.json
│   ├── back-end.json
│   ├── database.json
│   ├── models.json
│   └── pages/
│
└── docs/                  # Documentation
```

## How It Works

### 1. Dashboard (main-app)
- **Location**: `main-app/`
- **Port**: 3000
- **URL**: http://localhost:3000
- **Purpose**: 
  - Provides web interface
  - Build button triggers generator
  - Preview button opens generated app

### 2. Build Process
```
User clicks "Build Application"
    ↓
POST /api/build endpoint called
    ↓
generateFromConfig() executed
    ↓
Reads JSON files from config/
    ↓
Generates files to output-web/
```

### 3. Generated Application (output-web)
- **Location**: `output-web/`
- **Port**: 8080 (via Nginx)
- **URL**: http://localhost:8080
- **Purpose**: 
  - The actual generated web application
  - Contains frontend (HTML/CSS/JS)
  - Contains backend (Node.js API)
  - Contains Docker configs

## Running the Application

### Start Dashboard
```bash
cd main-app
npm install
node server.js
```
Access at: http://localhost:3000

### Build Application
1. Open http://localhost:和3000
2. Click "🚀 Build Application"
3. Files generated to `output-web/`

### Preview Application
1. After building, click "👁️ Preview Application"
2. Opens http://localhost:8080 (requires Docker setup)

## Benefits

✅ **Separation of Concerns**
- Dashboard separate from generated code
- Cleaner project structure
- Easier to maintain

✅ **Clear Workflow**
- Dashboard for building
- output-web for generated code
- No mixing of concerns

✅ **Scalability**
- Easy to add more build options
- Multiple output directories possible
- Better organization

## Migration Notes

- Dashboard files moved from `output-web/` to `main-app/`
- `output-web/server.js` no longer serves dashboard
- Dashboard now has dedicated `package.json`
- Build functionality integrated into dashboard

## Next Steps

1. ✅ Main-app folder created
2. ✅ Dashboard moved to main-app
3. ✅ Build API integrated
4. ✅ Files generate to output-web
5. 🔄 Add build history/ logs
6. 🔄 Add configuration editor UI

