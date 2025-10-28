# Backend Setup & Troubleshooting

## 🚨 "List All Users" Not Working?

This happens because **the backend server is not running**. Follow these steps:

---

## ✅ Quick Start

### 1. Open Terminal/PowerShell
Navigate to the `output-web` folder:
```bash
cd output-web
```

### 2. Start the Backend Server
```bash
npm start
```

You should see:
```
MongoDB Connected: 127.0.0.1
Server running on port 3000
```

### 3. Keep the Terminal Open
The server must keep running. **Don't close the terminal** where you started the server.

### 4. Open the Frontend
Open `index.html` in your browser (double-click it).

### 5. Now It Works!
- Click "List All Users" → Should show user list
- Click "Create User" → Should create a new user

---

## 🔍 How to Check if Backend is Running

### Method 1: Status Message
Look at the bottom of the page:
- ✅ "✓ Backend connected" → Server is running
- ❌ "⚠ Backend not running" → Server is NOT running

### Method 2: Browser Console
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for errors like:
   ```
   Error: fetch failed
   Cannot connect to server
   ```

### Method 3: Check Terminal
Look at the terminal where you ran `npm start`:
- If you see "Server running on port 3000" → Server is running
- If the terminal closed or shows an error → Server is NOT running

---

## 🐛 Common Issues & Solutions

### Issue 1: "MongoDB connection error"
**Solution:**
```bash
# Start MongoDB service
# Windows:
net start MongoDB

# Or check if MongoDB is running
```

### Issue 2: "Port 3000 already in use"
**Solution:**
```bash
# Find and kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 3: Missing .env file
**Solution:**
```bash
# Copy example file
copy .env.example .env

# Or create manually:
echo MONGODB_URI=mongodb://127.0.0.1:27017/json-to-web > .env
echo PORT=3000 >> .env
```

### Issue 4: Module not found
**Solution:**
```bash
# Install dependencies
npm install
```

### Issue 5: Functions not defined
**Solution:**
- Clear browser cache (Ctrl+F5)
- Check if `js/api-integration.js` file exists
- Check browser console for errors

---

## 📋 Complete Setup Checklist

- [ ] MongoDB is running
- [ ] Navigated to `output-web` folder
- [ ] Created `.env` file
- [ ] Installed dependencies: `npm install`
- [ ] Started server: `npm start`
- [ ] Server shows "Server running on port 3000"
- [ ] Opened `index.html` in browser
- [ ] Status shows "✓ Backend connected"
- [ ] Can click "List All Users" and see data

---

## 🎯 Testing

### Test 1: Backend Health Check
Open browser console and run:
```javascript
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(console.log)
```

Should return: `{ status: 'OK', message: 'Server is running' }`

### Test 2: List Users
1. Click "List All Users" button
2. Status should show "Loading users..."
3. Then show "Loaded X user(s)"
4. User table should appear

### Test 3: Create User
1. Fill in username, email, password
2. Click "Create User"
3. Should see success message
4. Click "List All Users" to see new user

---

## 📞 Still Not Working?

1. **Check browser console** (F12) for errors
2. **Check terminal** where server is running for errors
3. **Restart the server** (Ctrl+C, then `npm start`)
4. **Clear browser cache** (Ctrl+F5)
5. **Try another browser** (Chrome, Firefox, Edge)

---

## 🔗 Important Files

- `output-web/.env` - Environment variables
- `output-web/server/server.js` - Backend server
- `output-web/server/routes/api.js` - API routes
- `output-web/js/api-integration.js` - Frontend API calls

---

## 💡 Tips

- **Always keep terminal open** while testing
- **Use separate terminals** - one for server, one for other commands
- **Check the status message** at bottom of page
- **Console is your friend** - press F12 for debugging

