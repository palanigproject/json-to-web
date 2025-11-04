# How to Access the Frontend

## 🌐 Important: Frontend Files are NOT Served by Docker

The Docker container runs **only the backend API server** at `http://localhost:3000`.

The **frontend HTML files** (login.html, index.html) are meant to be opened **directly in your browser** from your file system.

---

## ✅ Correct Way to Access the Application

### Option 1: Open HTML Files Directly (Recommended)

1. **Navigate to** `D:\CavinsInfoTech\Projects\Workspace\cadp\poc\json-to-web\output-web\`

2. **Double-click** one of these files:
   - `login.html` - For login page
   - `index.html` - For main application (requires login first)

3. **Browser will open** the file with `file:///` protocol

4. **The frontend will connect** to the backend API at `http://localhost:3000`

### Option 2: Serve via HTTP (Alternative)

If you want to access via `http://localhost:3000`, you need to update the server to serve the static files.

**Updated server.js** already includes static file serving, so you can access at:
- http://localhost:3000/ - Shows login page
- http://localhost:3000/index.html - Main application
- http://localhost:3000/api/* - API endpoints

---

## 🔧 Current Setup

### Backend (Docker)
- **URL**: http://localhost:3000
- **API Endpoints**: http://localhost:3000/api/*
- **Health Check**: http://localhost:3000/health

### Frontend (File System)
- **Login Page**: `file:///D:/.../output-web/login.html`
- **Landing Page**: `file:///D:/.../output-web/index.html`
- **Connects to**: http://localhost:3000/api

---

## ⚠️ Why "Cannot GET /" Error?

You got "Cannot GET /" because:

1. **The server was not serving static files** (now fixed)
2. The root path `/` was not defined` (now shows login page)

### After Server Update

The updated `server/server.js` now:
- ✅ Serves static files (HTML, CSS, JS)
- ✅ Shows login.html at root `/`
- ✅ API endpoints at `/api/*`

---

## 🧪 Test Now

1. **Open**: http://localhost:3000
2. **Should See**: Login page with CADP logo
3. **API Check**: http://localhost:3000/health - Should return JSON

---

## 📱 Alternative: Frontend in Docker (Future)

To serve everything from Docker:

1. Add static file serving (already done)
2. Update Dockerfile to copy all files properly
3. Rebuild container

The current setup is more flexible for development.

---

## ✅ Summary

- **Backend**: Running in Docker at http://localhost:3000 ✅
- **Frontend**: Open HTML files directly from file system ✅
- **Communication**: Frontend connects to Docker backend ✅

**Try opening http://localhost:3000 now - it should work!**

