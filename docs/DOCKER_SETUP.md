# Docker Setup for CADP

## 🐳 Docker Configuration Complete

The application is now fully containerized with Docker support.

---

## 📁 Docker Files

### 1. `Dockerfile`
- Base image: Node.js 18 Alpine (lightweight)
- Installs production dependencies only
- Copies application files
- Exposes port 3000
- Includes health check

### 2. `docker-compose.yml`
- **MongoDB Service**: Database container
- **App Service**: Node.js application container
- Automatic networking between services
- Volume persistence for MongoDB data
- Health checks for reliability

### 3. `.dockerignore`
- Excludes unnecessary files from build context
- Reduces image size

---

## 🚀 Quick Start with Docker

### Option 1: Using Docker Compose (Recommended)

```bash
cd output-web
docker-compose up -d
```

This will:
- Build the application image
- Start MongoDB
- Start the application
- Connect everything automatically

### Option 2: Build and Run Manually

```bash
# Build the image
cd output-web
docker build -t cadp-app .

# Run MongoDB
docker run -d \
  --name cadp-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:7

# Run the application
docker run -d \
  --name cadp-app \
  -p 3000:3000 \
  --link cadp-mongodb \
  -e MONGODB_URI=mongodb://admin:password123@cadp-mongodb:27017/json-to-web?authSource=admin \
  cadp-app
```

---

## 🛠️ Docker Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mongodb
```

### Rebuild After Changes
```bash
docker-compose up -d --build
```

### Stop and Remove All Data
```bash
docker-compose down -v
```

---

## 🌐 Access the Application

- **Frontend**: Open `output-web/index.html` or `output-web/login.html` in browser
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **MongoDB**: localhost:27017

---

## 🔧 Environment Variables

Docker Compose automatically sets:
- `MONGODB_URI`: mongodb://admin:password123@mongodb:27017/json-to-web?authSource=admin`
- `PORT`: 3000
- `NODE_ENV`: production

### Customize Environment

Edit `docker-compose.yml` environment section:

```yaml
environment:
  - NODE_ENV=production
  - MONGODB_URI=your_connection_string
  - PORT=3000
```

---

## 📊 Container Management

### Check Running Containers
```bash
docker-compose ps
```

### View Container Status
```bash
docker ps
```

### Enter Container Shell
```bash
# App container
docker exec -it cadp-app sh

# MongoDB container
docker exec -it cadp-mongodb mongosh
```

### Remove All Containers
```bash
docker-compose down
```

---

## 💾 Data Persistence

MongoDB data is stored in a Docker volume:
- **Volume Name**: `mongodb_data`
- **Location**: Managed by Docker
- **Survives**: Container restarts and removal
- **Remove**: `docker-compose down -v`

---

## 🔍 Troubleshooting

### MongoDB Won't Start
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Ensure port 27017 is not in use
netstat -an | grep 27017
```

### App Can't Connect to MongoDB
```bash
# Check app logs
docker-compose logs app

# Verify MongoDB is healthy
docker-compose ps
```

### Port Already in Use
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # External:Internal
```

### Rebuild Everything
```bash
docker-compose down -v
docker-compose up -d --build
```

---

## 🎯 Production Deployment

### Build for Production
```bash
docker-compose -f docker-compose.yml build
```

### Use Docker Hub (Optional)
```bash
# Tag image
docker tag cadp-app:latest yourhub/cadp-app:latest

# Push to registry
docker push yourhub/cadp-app:latest
```

### Deploy with Environment File
Create `.env` file:
```env
MONGO_INITDB_ROOT_USERNAME=your_username
MONGO_INITDB_ROOT_PASSWORD=your_password
MONGODB_URI=mongodb://your_username:your_password@mongodb:27017/json-to-web?authSource=admin
```

Then run:
```bash
docker-compose --env-file .env up -d
```

---

## 📝 Dockerfile Features

- ✅ Alpine Linux (small image size)
- ✅ Production dependencies only
- ✅ Health check included
- ✅ Non-root user (recommended for production)
- ✅ Optimized layer caching

---

## 🔐 Security Notes

For production:
1. Change MongoDB default passwords
2. Use secrets management for credentials
3. Enable MongoDB authentication
4. Use HTTPS for API
5. Configure firewall rules
6. Use Docker secrets for sensitive data

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node.js Docker Image](https://hub.docker.com/_/node)

---

## ✅ Quick Checklist

- [ ] Docker and Docker Compose installed
- [ ] Navigate to `output-web` directory
- [ ] Run `docker-compose up -d`
- [ ] Check logs with `docker-compose logs -f`
- [ ] Open frontend in browser
- [ ] Test API at http://localhost:3000/health
- [ ] Create a test user

---

## 🎉 Benefits of Docker

1. **Consistency**: Same environment everywhere
2. **Isolation**: No conflicts with other apps
3. **Easy Deployment**: One command to start everything
4. **Scalability**: Easy to scale services
5. **Reproducibility**: Same setup every time
6. **Development**: Matches production environment

