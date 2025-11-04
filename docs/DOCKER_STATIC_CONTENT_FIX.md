# Docker Static Content - Complete Fix

## Problem
The Express server in Docker couldn't serve static HTML files, showing "Cannot GET /" error.

## Root Cause
The server was running but the static file serving middleware wasn't working properly. The issue was with route ordering and static middleware configuration.

## Solution

### Option 1: Correct Static File Serving in Express (Recommended)

Update your `server.js` to properly serve static content:

```javascript
const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes FIRST
app.use('/api', apiRoutes);

// Static files - Serve from /app directory
app.use(express.static(path.join(__dirname, '..')));

// Root route - must come AFTER static middleware
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
});
```

### Option 2: Use Nginx as Reverse Proxy (Production)

For production, use Nginx to serve static files:

**Dockerfile (with Nginx)**
```dockerfile
FROM nginx:alpine

# Copy static files
COPY *.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml (Nginx + Node)**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
  
  backend:
    build: ./api
    ports:
      - "3000:3000"
  
  mongodb:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

### Option 3: Separate Frontend and Backend (Best Practice)

Build frontend as separate static site:

**Frontend Dockerfile**
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
```

**Backend Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Current Working Solution

Your current setup with updated `server.js` should work. The key points:

1. ✅ Files are copied to `/app` in container
2. ✅ Static middleware serves from parent directory
3. ✅ Root route sends login.html
4. ✅ API routes work at `/api/*`

## Testing

```bash
# Rebuild and start
docker-compose -f output-web/docker-compose.yml up -d --build

# Test endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/api/users
```

## Debug Commands

```bash
# Check if files exist in container
docker exec cadp-app ls -la /app/

# Check server.js in container
docker exec cadp-app cat /app/server/server.js

# View server logs
docker logs cadp-app

# Test from inside container
docker exec cadp-app wget -qO- http://localhost:3000/
```

## Summary

The issue is likely that the route order is wrong. Ensure:
1. API routes come BEFORE static middleware
2. Static middleware serves from correct directory
3. Root route comes AFTER static middleware
4. Files are copied correctly in Dockerfile

The updated `server.js` should fix this!

