# Preview Application Feature

## Overview

The Preview feature automatically starts the generated application server when you click "👁️ Preview Application" in the dashboard.

## How It Works

### 1. Build Process
- ✅ Generates `.env` file (not just `.env.example`)
- ✅ Sets `PORT=3001` (dashboard uses 3000)
- ✅ Creates all necessary files in `output-web/`

### 2. Preview Process
When you click "Preview Application":
1. Checks if preview server is already running
2. If not, starts the server automatically via `npm start`
3. Waits for server to be ready
4. Opens http://localhost:3001 in a new tab

## API Endpoints

### POST /api/preview/start
Starts the preview server in the background.

**Request:**
```bash
POST http://localhost:3000/api/preview/start
```

**Response:**
```json
{
  "success": true,
  "message": "Preview server started successfully",
  "url": "http://localhost:3001",
  "port": 3001
}
```

### POST /api/preview/stop
Stops the preview server.

**Response:**
```json
{
  "success": true,
  "message": "Preview server stopped"
}
```

### GET /api/preview/status
Checks if preview server is running.

**Response:**
```json
{
  "running": true,
  "port": 3001,
  "url": "http://localhost:3001"
}
```

## Ports

- **Dashboard**: Port 3000 (http://localhost:3000)
- **Preview Server**: Port 3001 (http://localhost:3001)
- **MongoDB**: Port 27017

## Files Generated

During build, the following files are created in `output-web/`:

- `.env` - Environment variables (PORT=3001, MONGODB_URI, etc.)
- `.env.example` - Example environment file
- `package.json` - Dependencies
- `server/server.js` - Express server
- All HTML, CSS, and JS files

## Usage

1. **Build Application**
   - Click "🚀 Build Application"
   - Wait for success message
   - `.env` file is created automatically

2. **Preview Application**
   - Click "👁️ Preview Application"
   - Server starts automatically
   - Opens in new tab at http://localhost:3001

3. **Server Management**
   - Server runs in background
   - Can restart/stop via API
   - Status checked on dashboard load

## Troubleshooting

### Server Won't Start
- Ensure MongoDB is running (port 27017)
- Check that `.env` file exists in `output-web/`
- Verify dependencies: `cd output-web && npm install`

### Port Already in Use
- Check if port 3001 is already in use
- Stop any existing servers on that port
- Or modify `.env` to use a different port

### Preview Not Opening
- Check browser popup blocker
- Verify server started successfully
- Check browser console for errors

## Automation

The preview server:
- ✅ Starts automatically when Preview is clicked
- ✅ Uses `.env` file for configuration
- ✅ Runs `node server/server.js` in background
- ✅ Logs output to dashboard console
- ✅ Can be stopped/restarted as needed

## Next Steps

- ✅ .env file generation
- ✅ Auto-start preview server
- ✅ Port conflict handling
- 🔄 Server restart functionality
- 🔄 Build logs display
- 🔄 Error handling improvements

