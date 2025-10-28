# Start Server Instructions

## 🚀 How to Make the "Create User" Button Work

The "Create User" button requires the backend server to be running.

### Step 1: Navigate to output-web folder
```bash
cd output-web
```

### Step 2: Create .env file
Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Or create it manually with:
```
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/json-to-web

# Server Port
PORT=3000

# Environment
NODE_ENV=development
```

### Step 3: Install dependencies (if not done)
```bash
npm install
```

### Step 4: Start the backend server
```bash
npm start
```

You should see:
```
MongoDB Connected: 127.0.0.1
Server running on port 3000
```

### Step 5: Open the frontend
Open `index.html` or `login.html` in your browser.

### Step 6: Test
1. Fill in username, email, password
2. Click "Create User"
3. You should see "User created successfully!" message

---

## 🔍 Troubleshooting

### "Cannot connect to server" Error
- Make sure the backend server is running
- Check if MongoDB is running
- Verify server is running on port 3000

### "MongoDB connection error"
- Make sure MongoDB is installed and running
- Check the MONGODB_URI in .env file

### Functions Not Working
- Check browser console (F12) for errors
- Verify `js/api-integration.js` is loaded
- Make sure backend is running

---

## ✅ What's Fixed

- Added proper validation before sending request
- Added better error messages
- Added console logging for debugging
- Improved error handling for connection failures

