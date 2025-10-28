# Password Encryption

## 🔒 Security Implementation

This document describes the password encryption mechanism implemented in the application.

---

## ✅ Features

### Password Hashing
- **Library Used**: bcrypt (version 5.1.1)
- **Algorithm**: bcrypt with salt rounds of 10
- **Automatic**: Passwords are automatically hashed before saving to the database

### Login Verification
- **Secure Comparison**: Passwords are compared using bcrypt's secure comparison method
- **No Plain Text**: Passwords are never stored or transmitted in plain text

---

## 🏗️ Implementation Details

### Backend Changes

#### 1. Package Dependency
Added `bcrypt` to `package.json`:
```json
"dependencies": {
  "bcrypt": "^5.1.1"
}
```

#### 2. User Model (`output-web/server/models/userModel.js`)
Added password hashing middleware:

```javascript
const bcrypt = require('bcrypt');

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    this.updatedAt = Date.now();
    return next();
  }
  
  try {
    // Hash password with a salt round of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

**Key Points:**
- Hash only when password is modified (not on every save)
- Uses bcrypt with 10 salt rounds
- Includes `comparePassword` method for secure login

#### 3. Login API Endpoint (`output-web/server/routes/api.js`)
Added dedicated login endpoint:

```javascript
// Login endpoint
router.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Find user by username
    const user = await UserModel.findOne({ username: username });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Check password using secure comparison
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Return user data (excluding password)
    const userData = user.toObject();
    delete userData.password;
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Key Points:**
- Returns 401 for invalid credentials (no specific error message)
- Never returns password in response
- Uses secure password comparison

### Frontend Changes

#### Login Function (`output-web/login.html`)
Updated to use the new login API:

```javascript
// Verify credentials against database using login API
try {
  const response = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    // Store login status
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    
    // Redirect without alert
    goToLandingPage();
  } else {
    showErrorMessage(data.error || 'Invalid username or password. Please try again.');
    // Clear password field
    if (passwordEl) passwordEl.value = '';
  }
} catch (error) {
  console.error('Login error:', error);
  showErrorMessage('Unable to connect to server. Please check if backend is running.');
}
```

---

## 🔄 Migration Notes

### Existing Users
If you have existing users in the database with plain text passwords:

1. **Option 1**: Delete existing users and create new ones (password will be hashed automatically)
2. **Option 2**: Manually hash existing passwords using bcrypt

### Testing
1. Create a new user - password will be automatically hashed
2. Login with the user - should work normally
3. Check database - password should be a bcrypt hash (starts with `$2b$10$`)

---

## 📊 Database Storage

### Before Encryption
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### After Encryption
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "$2b$10$XKqjZz8vYWoZjN3eF8qJN.8xJ9PkZvH1mG2yL4nQ7rT5wV8xY0zA2C"
}
```

---

## 🛡️ Security Benefits

1. **No Plain Text Storage**: Passwords are never stored in readable format
2. **Salt Protection**: Each password uses a unique salt
3. **Resistant to Rainbow Tables**: bcrypt's algorithm is resistant to pre-computed hash attacks
4. **Secure Comparison**: Uses timing-safe comparison to prevent timing attacks
5. **Never Exposed**: Password is never returned in API responses

---

## 🔧 Technical Details

### Bcrypt
- **Algorithm**: Blowfish-based
- **Salt Rounds**: 10 (balanced between security and performance)
- **Cost Factor**: Increases exponentially with rounds (10 rounds = 2^10 iterations)
- **Output Format**: `$2b$10$[22 chars salt][31 chars hash]`

### Best Practices
- ✅ Use `isModified()` to prevent re-hashing on every save
- ✅ Use `comparePassword()` method for login verification
- ✅ Never log or return password in responses
- ✅ Use HTTPS in production (not implemented yet)
- ✅ Consider adding rate limiting for login attempts (future enhancement)

---

## 🚀 Future Enhancements

1. **Rate Limiting**: Add rate limiting to prevent brute force attacks
2. **Session Management**: Implement JWT tokens instead of localStorage
3. **HTTPS**: Add HTTPS support for production
4. **Password Reset**: Add password reset functionality
5. **Password Complexity**: Add password strength requirements
6. **Two-Factor Authentication**: Add 2FA support

---

## 📝 Summary

All passwords are now automatically encrypted using bcrypt before being saved to the database. The login process uses secure password comparison, and passwords are never exposed in API responses or logs.

**Key Files Modified:**
- `src/generator.js` - Added bcrypt support to generator
- `output-web/server/models/userModel.js` - Added password hashing
- `output-web/server/routes/api.js` - Added login endpoint
- `output-web/login.html` - Updated login function
- `output-web/package.json` - Added bcrypt dependency

