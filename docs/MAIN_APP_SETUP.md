# Main App Setup

## Overview

The `main-app` folder contains the JSON-TO-WEB dashboard application that runs on `http://localhost:3000/`. This is the main interface for building and managing generated web applications.

## Structure

```
main-app/
├── dashboard.html    # Main dashboard UI
├── server.js         # Express server for dashboard
└── package.json      # Node.js dependencies
```

## Features

### 🚀 Build Application
- Triggers the generator to create files from JSON configuration
- Files are generated to `output-web/` directory
- Shows real-time build status and success/error messages

### 👁️ Preview Application
- Opens the generated application at `http://localhost:8080`
- Links to the Nginx-served frontend

## Running the Dashboard

### Start the Server
```bash
cd main-app
npm install  # First time only
node server.js
```

### Access Dashboard
Open browser: http://localhost:3000

## API Endpoints

### POST /api/build
Generates web application files to `output-web/` directory.

**Request:**
```bash
POST http://localhost:3000/api/build
```

**Response:**
```json
{
  "success": true,
  "message": "Application built successfully!",
  "output": "Files generated in output-web/"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Dashboard server is running"
}
```

## How It Works

1. **User clicks "Build Application"** in dashboard
2. **Frontend calls** `POST /api/build`
3. **Server calls** `generateFromConfig()` from `src/generator.js`
4. **Generator reads** JSON config files from `config/` directory
5. **Files are generated** to `output-web/` directory
6. **Success/Error response** returned to dashboard

## Output Structure

When build is triggered, files are generated to:

```
output-web/
├── *.html           # Generated HTML pages
├── css/
│   └── style.css    # Generated CSS
├── js/
│   └── api-integration.js  # Generated JavaScript
├── server/          # Backend API server
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── config/
├── package.json     # Backend dependencies
└── ...              # Other generated files
```

## Configuration

The build process reads from:

- `config/front-end.json` - Frontend structure
- `config/back-end.json` - Backend API configuration
- `config/database.json` - Database settings
- `config/models.json` - Data models
- `config/pages/*.json` - Page configurations

## Troubleshooting

### Build Fails
- Check that all config files exist in `config/` directory
- Verify JSON syntax is correct
- Check console logs for specific errors

### Server Won't Start
- Ensure port 3000 is not in use
- Run `npm install` in `main-app/` directory
- Check Node.js version (requires Node 14+)

### Files Not Generating
- Verify `output-web/` directory exists
- Check file permissions
- Review generator logs for errors

## Next Steps

1. ✅ Dashboard created in `main-app/`
2. ✅ Build API endpoint working
3. ✅ Files generate to `output-web/`
4. 🔄 Add configuration editor
5. 🔄 Add build history/logs
6. 🔄 Add real-time build progress

