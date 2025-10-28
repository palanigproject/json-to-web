# How to Run the Backend Server

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd output-web
npm install
```

### Step 2: Start MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo service mongod start
```

### Step 3: Start the Server
```bash
npm start
```

The server will run on **http://localhost:3000**

---

## Detailed Instructions

### 1. Navigate to Output Directory
```bash
cd output-web
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- cors (cross-origin support)
- dotenv (environment variables)
- nodemon (dev dependency)

### 3. Configure Environment (if needed)

The `.env` file is already created from `.env.example`:
```env
MONGODB_URI=mongodb://localhost:27017/json-to-web
PORT=3000
NODE_ENV=development
```

### 4. Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo service mongod start
```

**Or use MongoDB Atlas (cloud):**
Update the MONGODB_URI in `.env` with your Atlas connection string.

### 5. Run the Server

**Production mode:**
```bash
npm start
```

**Development mode (with auto-reload):**
```bash
npm run dev
```

---

## Verify Server is Running

### Check Health Endpoint
```bash
curl http://localhost:3000/health
```

Or open in browser: http://localhost:3000/health

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Check API Endpoints
```bash
# Get all users
curl http://localhost:3000/api/users

# Get all posts
curl http://localhost:3000/api/posts
```

---

## Available Endpoints

### Health Check
- `GET /health` - Server status

### User CRUD
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Post CRUD
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

---

## Example API Usage

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secret123",
    "role": "user"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content",
    "published": true
  }'
```

---

## Troubleshooting

### Port 3000 Already in Use
Change the port in `.env`:
```env
PORT=3001
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For local MongoDB: `mongodb://localhost:27017/json-to-web`
- For Atlas: Update with your connection string

### Module Not Found
```bash
npm install
```

### Server Won't Start
Check console for error messages and ensure MongoDB is running.

---

## Development Mode

For auto-reload during development:
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

---

## Frontend Integration

1. Start the backend server (this file)
2. Open `index.html` in your browser
3. The frontend in `js/app.js` communicates with the API

---

## Production Deployment

For production:
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server/server.js
   ```

