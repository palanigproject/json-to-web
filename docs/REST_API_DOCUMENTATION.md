# REST API Documentation

This document describes all available REST endpoints generated from the input JSON configuration.

## Base URL
```
http://localhost:3000
```

## Endpoints Overview

### Health Check
- `GET /health` - Check if server is running

---

## User Endpoints

### 1. List All Users
**GET** `/api/users`

**Description:** Retrieve all users from the database

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "password": "hashed_password",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Example Request:**
```bash
curl http://localhost:3000/api/users
```

---

### 2. Create User
**POST** `/api/users`

**Description:** Create a new user

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "user"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Example Request:**
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

**Validation:**
- `username`: Required, must be unique
- `email`: Required, must be unique
- `password`: Required
- `role`: Optional, enum ["user", "admin"], default: "user"

---

### 3. Get User by ID
**GET** `/api/users/:id`

**Description:** Retrieve a specific user by ID

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

---

### 4. Update User
**PUT** `/api/users/:id`

**Description:** Update an existing user

**Request Body:**
```json
{
  "username": "john_smith",
  "email": "johnsmith@example.com",
  "role": "admin"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_smith",
  "email": "johnsmith@example.com",
  "role": "admin",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_smith",
    "role": "admin"
  }'
```

---

### 5. Delete User
**DELETE** `/api/users/:id`

**Description:** Delete a user by ID

**Response:**
```json
{
  "message": "User deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

---

## Post Endpoints

### 1. List All Posts
**GET** `/api/posts`

**Description:** Retrieve all posts from the database

**Response:**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "title": "My First Post",
    "content": "This is the content",
    "author": "507f1f77bcf86cd799439011",
    "published": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Example Request:**
```bash
curl http://localhost:3000/api/posts
```

---

### 2. Create Post
**POST** `/api/posts`

**Description:** Create a new post

**Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is the content",
  "author": "507f1f77bcf86cd799439011",
  "published": false
}
```

**Response:**
```json
{
  "_id": "507f191e810c19729de860ea",
  "title": "My First Post",
  "content": "This is the content",
  "author": "507f1f77bcf86cd799439011",
  "published": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content",
    "published": false
  }'
```

**Validation:**
- `title`: Required
- `content`: Required
- `author`: Optional, ObjectId reference to User
- `published`: Optional, boolean, default: false

---

### 3. Get Post by ID
**GET** `/api/posts/:id`

**Example Request:**
```bash
curl http://localhost:3000/api/posts/507f191e810c19729de860ea
```

---

### 4. Update Post
**PUT** `/api/posts/:id`

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/posts/507f191e810c19729de860ea \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "published": true
  }'
```

---

### 5. Delete Post
**DELETE** `/api/posts/:id`

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/posts/507f191e810c19729de860ea
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message"
}
```

---

## Testing with cURL

### Test the Health Endpoint
```bash
curl http://localhost:3000/health
```

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/{user_id}
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/{user_id} \
  -H "Content-Type: application/json" \
  -d '{"username":"updated_user"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/{user_id}
```

---

## Testing with Postman

Import the following collection endpoints in Postman:

1. **Health Check**
   - GET http://localhost:3000/health

2. **Users**
   - GET http://localhost:3000/api/users
   - POST http://localhost:3000/api/users
   - GET http://localhost:3000/api/users/:id
   - PUT http://localhost:3000/api/users/:id
   - DELETE http://localhost:3000/api/users/:id

3. **Posts**
   - GET http://localhost:3000/api/posts
   - POST http://localhost:3000/api/posts
   - GET http://localhost:3000/api/posts/:id
   - PUT http://localhost:3000/api/posts/:id
   - DELETE http://localhost:3000/api/posts/:id

---

## Database Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required),
  role: String (enum: ["user", "admin"], default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (reference to User),
  published: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Next Steps

1. Start the server: `cd output-web && npm start`
2. Test endpoints using cURL or Postman
3. Integrate frontend with these APIs
4. Add authentication/authorization as needed
5. Implement data validation
6. Add pagination for list endpoints

