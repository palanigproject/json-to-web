# JSON-TO-WEB Dashboard

This is the main dashboard application for JSON-TO-WEB. It provides a web interface to build and preview generated web applications.

## Quick Start

```bash
# Install dependencies
npm install

# Start the dashboard server
npm start

# Or using node directly
node server.js
```

Then open http://localhost:3000 in your browser.

## What It Does

1. **Build Button**: Generates web application files from JSON configuration to `output-web/` directory
2. **Preview Button**: Opens the generated application at http://localhost:8080

## Dependencies

- Express.js - Web server
- Generator module - Located in `../src/generator.js`

## Configuration

The build process reads JSON configuration files from `../config/` directory:
- `front-end.json` - Frontend structure
- `back-end.json` - Backend API configuration  
- `database.json` - Database settings
- `models.json` - Data models
- `pages/*.json` - Page configurations

## Output

When you click "Build Application", files are generated to:
- `../output-web/` - Generated HTML, CSS, JS, and backend files

## Port

Default port: **3000**

To change the port, modify the `PORT` variable in `server.js`.

