# JSON-TO-WEB Dashboard

## Overview

The JSON-TO-WEB Dashboard is the main entry point for the application, providing a centralized interface to build and preview generated web applications.

## Access

**URL**: http://localhost:3000/

## Features

### 🚀 Build Application
- Generates web application from JSON configuration
- Processes frontend, backend, database, and model configurations
- Creates HTML, CSS, and JavaScript files
- Sets up API endpoints and database connections

### 👁️ Preview Application
- Opens the generated application in a new tab
- Runs on http://localhost:8080 (via Nginx)
- Shows the actual user-facing application
- Interactive login and user management features

### 📊 Application Status
- Real-time status indicators for all services:
  - Backend Server (Port 3000)
  - Frontend Server (Port 8080)
  - MongoDB Database

## Dashboard Components

### Header
- **Logo**: JSON-TO-WEB branded logo (J2W)
- **Title**: JSON-TO-WEB
- **Subtitle**: Transform JSON configurations into dynamic web applications

### Action Buttons
1. **Build Application** 🚀
   - Simulates build process
   - Shows loading state
   - Displays completion confirmation
   - Gradient purple background

2. **Preview Application** 👁️
   - Opens generated application
   - Links to http://localhost:8080
   - Opens in new tab
   - Gradient pink/red background

### Information Sections

#### Application Status
Displays real-time status of all services:
- Backend Server status
- Frontend Server status
- Database connection status

#### Quick Actions
Lists available actions:
- Build: Generate web application
- Preview: View generated application
- Configure: Edit JSON files
- Deploy: Use Docker containers

#### Configuration Files
Documents the configuration structure:
- `config/front-end.json` - Frontend structure
- `config/back-end.json` - API configuration
- `config/database.json` - Database settings
- `config/models.json` - Data models
- `config/pages/` - Page configurations

## Technical Details

### Server Setup

The dashboard is served by Express.js:

```javascript
app.get('/', (req, res) => {
  const dashboardPath = path.resolve(__dirname, 'dashboard.html');
  res.sendFile(dashboardPath);
});
```

### Styling
- Modern gradient backgrounds
- Responsive design for mobile/tablet/desktop
- Smooth hover animations
- Status indicators with color coding
- Professional card-based layout

### JavaScript Functionality
- `buildApplication()`: Simulates build process with visual feedback
- `checkBackendStatus()`: Verifies backend connectivity
- Smooth state transitions
- Error handling

## Running the Dashboard

### Standalone Mode (Testing)
```bash
cd output-web
node dashboard-server.js
```

### Full Stack Mode
```bash
cd output-web/docker
docker-compose up -d
```

Then access at:
- Dashboard: http://localhost:3000
- Application: http://localhost:8080

## Customization

### Adding New Actions
Edit `dashboard.html` and add buttons in the `.dashboard-buttons` div:

```html
<button class="dashboard-btn" onclick="yourFunction()">
    🎯 Your Action
</button>
```

### Styling
Modify the `<style>` section in `dashboard.html` to customize:
- Colors (gradients)
- Button sizes
- Layout spacing
- Responsive breakpoints

## Next Steps

1. ✅ Dashboard created
2. ✅ Build and Preview buttons functional
3. ✅ Status indicators implemented
4. ✅ Information sections added
5. 🔄 Integrate actual build process
6. 🔄 Add configuration editor
7. 🔄 Real-time status polling

