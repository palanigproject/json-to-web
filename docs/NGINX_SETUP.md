# Nginx + Node.js Setup

## Architecture

The application now uses a **3-container setup**:

1. **Nginx** - Serves static files (HTML, CSS, JS) and proxies API requests
2. **Node.js** - Backend API server
3. **MongoDB** - Database

## Component Details

### Nginx (Frontend)
- **Container**: `cadp-nginx`
- **Port**: `8080` (external)
- **Internal Port**: `80`
- **Role**: 
  - Serves static files (HTML, CSS, JS, images)
  - Proxies `/api` requests to Node.js backend
  - Handles health checks

### Node.js (Backend)
- **Container**: `cadp-app`
- **Internal Port**: `3000` (not exposed externally)
- **Role**: 
  - Handles API requests
  - Connects to MongoDB
  - Only accessible via Nginx proxy

### MongoDB (Database)
- **Container**: `cadp-mongodb`
- **Port**: `27017`
- **Role**: 
  - Stores application data
  - Accessible from Node.js backend

## How It Works

```
User Browser
    ↓
[Request to http://localhost:8080/]
    ↓
┌─────────────────────────────────┐
│         Nginx (Port 8080)       │
├─────────────────────────────────┤
│ • Serves static files            │
│ • If /api request:               │
│   → Proxy to cadp-app:3000      │
└─────────────────────────────────┘
    ↓ (for /api requests)
┌─────────────────────────────────┐
│   Node.js Backend (Port 3000)  │
├─────────────────────────────────┤
│ • Handles /api/* requests        │
│ • Connects to MongoDB            │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│   MongoDB (Port 27017)         │
└─────────────────────────────────┘
```

## Configuration

### Nginx Config (`nginx.conf`)

```nginx
server {
    listen 80;
    
    # Serve static files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /login.html;
    }
    
    # Proxy API to Node.js
    location /api {
        proxy_pass http://cadp-app:3000;
        proxy_set_header Host $host;
    }
}
```

### Docker Compose

- **Nginx** exposes port `8080` to host
- **Node.js** runs on internal port `3000` only
- **MongoDB** exposed on port `27017` (for connection testing)

## Running the Application

### Start All Services
```bash
cd output-web
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nginx
docker-compose logs -f app
docker-compose logs -f mongodb
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:8080 | Login page |
| Backend API | http://localhost:8080/api/* | API endpoints |
| Health Check | http://localhost:8080/health | Server status |
| MongoDB | localhost:27017 | Database |

## Request Flow Examples

### Static File Request
```
GET http://localhost:8080/login.html
  ↓ Nginx
  ↓ Serves from /usr/share/nginx/html/login.html
  ↓ Returns HTML
```

### API Request
```
GET http://localhost:8080/api/users
  ↓ Nginx sees /api prefix
  ↓ Proxy to http://cadp-app:3000/api/users
  ↓ Node.js processes request
  ↓ Queries MongoDB
  ↓ Returns JSON
  ↓ Nginx returns to client
```

### CSS/JS Request
```
GET http://localhost:8080/css/style.css
  ↓ Nginx
  ↓ Serves from /usr/share/nginx/html/css/style.css
  ↓ Returns CSS file (with gzip compression)
```

## Benefits

✅ **Separation of Concerns**
- Static files served efficiently by Nginx
- API logic in Node.js
- Database in MongoDB

✅ **Performance**
- Nginx is faster for static files
- Gzip compression enabled
- Static file caching

✅ **Security**
- Node.js not exposed externally
- Can add SSL/TLS at Nginx level
- Better access control

✅ **Scalability**
- Can scale Node.js instances
- Nginx load balances backend requests
- Static files cached by CDN

## Troubleshooting

### Nginx not serving files
```bash
# Check Nginx container
docker exec cadp-nginx ls -la /usr/share/nginx/html/

# Check Nginx config
docker exec cadp-nginx cat /etc/nginx/conf.d/default.conf

# Check Nginx logs
docker logs cadp-nginx
```

### Backend not responding
```bash
# Check if Node.js is healthy
docker exec cadp-nginx wget -qO- http://cadp-app:3000/health

# Check Node.js logs
docker logs cadp-app

# Test API directly
docker exec cadp-nginx curl http://cadp-app:3000/api/users
```

### Network Issues
```bash
# Verify network exists
docker network ls | grep cadp

# Check containers on network
docker network inspect cadp-network

# Test connectivity
docker exec cadp-nginx ping cadp-app
docker exec cadp-app ping mongodb
```

## Development

### Making Changes

1. **Static Files** (HTML, CSS, JS):
   ```bash
   # Rebuild Nginx container
   docker-compose up -d --build nginx
   ```

2. **Backend Changes**:
   ```bash
   # Rebuild Node.js container
   docker-compose up -d --build app
   ```

### Debugging

```bash
# Shell into Nginx
docker exec -it cadp-nginx sh

# Shell into Node.js
docker exec -it cadp-app sh

# Rebuild specific service
docker-compose up -d --build nginx
```

## Next Steps

1. ✅ Nginx serving static files
2. ✅ Proxy to Node.js backend
3. ✅ MongoDB integration
4. 🔄 Add SSL/TLS certificate
5. 🔄 Set up reverse proxy with domain name
6. 🔄 Add load balancing for multiple Node.js instances

