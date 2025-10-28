# Complete Setup Guide

## ✅ What's Been Generated

Your full-stack application with MongoDB support includes:

### Frontend
- ✅ `index.html` - Main interface
- ✅ `css/style.css` - Styling
- ✅ `js/script.js` - Frontend logic

### Backend  
- ✅ `server/server.js` - Express server
- ✅ `server/config/database.js` - MongoDB connection
- ✅ `server/models/userModel.js` - User model with CRUD
- ✅ `server/models/postModel.js` - Post model with CRUD
- ✅ `server/routes/api.js` - REST API endpoints

### Configuration
- ✅ `package.json` - Dependencies
- ✅ `.env.example` - Environment template

---

## 🚀 Quick Start

### 1. Navigate to Output
```bash
cd output-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
# Copy .env.example to .env if not exists
cp .env.example .env

# Edit .env to use 127.0.0.1 instead of localhost
# Change: MONGODB_URI=mongodb://localhost:27017/json-to-web
# To: MONGODB_URI=mongodb://127.0.0.1:27017/json-to-web
```

### 4. Start MongoDB
```bash
# Windows
net start MongoDB

# Verify MongoDB is running
Get-Service -Name MongoDB
```

### 5. Start the Server
```bash
npm start
```

You should see:
```
MongoDB Connected: 127.0.0.1
Server is running on http://localhost:3000
```

---

## 📡 Available REST Endpoints

### Health Check
- `GET /health` - Server status

### User CRUD
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Post CRUD
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

---

## 📝 Testing the API

### Test Health Check
```bash
curl http://localhost:3000/health
```

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "secret123",
    "role": "user"
  }'
```

### List All Users
```bash
curl http://localhost:3000/api/users
```

### Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is content",
    "published": true
  }'
```

### List All Posts
```bash
curl http://localhost:3000/api/posts
```

---

## 📚 Documentation Files

- **START_SERVER.md** - How to start the backend server
- **REST_API_DOCUMENTATION.md** - Complete API reference
- **FIX_MONGODB.md** - Troubleshooting MongoDB connection

---

## 🎯 Next Steps

1. **Start the server** using instructions above
2. **Test the API** using curl commands
3. **Open frontend** by opening `index.html` in browser
4. **Integrate** frontend with backend APIs
5. **Deploy** to production

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
Change PORT in `.env` file to another port (e.g., 3001)

### MongoDB Connection Error
See `FIX_MONGODB.md` for solutions

### Module Not Found
Run `npm install` again

---

## 📊 Database Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required)
- role (String, enum: user/admin, default: user)
- timestamps (createdAt, updatedAt)

### Post
- title (String, required)
- content (String, required)
- author (ObjectId, reference to User)
- published (Boolean, default: false)
- timestamps (createdAt, updatedAt)

---

## 🎉 Success!

Your full-stack application with MongoDB and CRUD operations is ready!

**Base URL:** http://localhost:3000  
**API Base:** http://localhost:3000/api  
**Health Check:** http://localhost:3000/health

