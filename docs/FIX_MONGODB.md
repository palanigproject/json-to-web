# Fix MongoDB Connection Error

## Problem
```
Database connection error: connect ECONNREFUSED ::1:27017
```

This happens because the connection is trying to use IPv6 (::1) instead of IPv4 (127.0.0.1).

## Solution

### Update `.env` file

Change the MongoDB connection string from:
```env
MONGODB_URI=mongodb://localhost:27017/json-to-web
```

To:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/json-to-web
```

### Steps to Fix

1. **Edit the `.env` file** in `output-web` folder:
   ```bash
   # Open .env file and update the connection string
   MONGODB_URI=mongodb://127.0.0.1:27017/json-to-web
   ```

2. **Or use PowerShell command:**
   ```powershell
   cd output-web
   (Get-Content .env) -replace 'localhost', '127.0.0.1' | Set-Content .env
   ```

3. **Restart the server:**
   ```bash
   npm start
   ```

## Alternative: Start MongoDB Service

If MongoDB is not running:

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo service mongod start
```

## Verify MongoDB is Running

```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Check if port 27017 is accessible
Test-NetConnection -ComputerName 127.0.0.1 -Port 27017
```

## Test the Connection

```bash
# Connect to MongoDB
mongosh
# or
mongo
```

## Start the Server

After fixing the `.env` file:

```bash
cd output-web
npm start
```

Expected output:
```
MongoDB Connected: 127.0.0.1
Server is running on http://localhost:3000
```

## Still Having Issues?

### Option 1: Use MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Get connection string
3. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/json-to-web
   ```

### Option 2: Download and Install MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install and start service
3. Use connection string: `mongodb://127.0.0.1:27017/json-to-web`

