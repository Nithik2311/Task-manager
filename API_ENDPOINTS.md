# API ENDPOINTS REFERENCE

## Base URL
```
http://localhost:3000
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error (400):**
```json
{
  "status": "error",
  "message": "Email already registered"
}
```

---

### Login User
**POST** `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
}
```

**Error (401):**
```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

---

## 📋 Task Endpoints

### Create Task
**POST** `/api/tasks`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation",
  "status": "pending"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "status": "error",
  "message": "Validation error",
  "details": [
    {
      "field": "title",
      "message": "Title must be at least 3 characters"
    }
  ]
}
```

---

### Get All Tasks
**GET** `/api/tasks?page=1&limit=10`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number (must be ≥ 1)
- `limit` (optional, default: 10) - Items per page (1-100)

**Response (200):**
```json
{
  "status": "success",
  "message": "Tasks retrieved successfully",
  "data": {
    "tasks": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Complete project documentation",
        "description": "Write comprehensive documentation",
        "status": "pending",
        "created_at": "2024-01-15T10:30:00.000Z",
        "updated_at": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": 2,
        "user_id": 1,
        "title": "Review pull requests",
        "description": "Check and approve pending PRs",
        "status": "in-progress",
        "created_at": "2024-01-15T11:15:00.000Z",
        "updated_at": "2024-01-15T11:15:00.000Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 2,
      "total_pages": 1
    }
  }
}
```

**Error (401):**
```json
{
  "status": "error",
  "message": "No token provided"
}
```

---

### Get Task by ID
**GET** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Task ID (required)

**Response (200):**
```json
{
  "status": "success",
  "message": "Task retrieved successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "status": "error",
  "message": "Task not found"
}
```

---

### Update Task Status
**PATCH** `/api/tasks/:id/status`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Task ID (required)

**Request:**
```json
{
  "status": "in-progress"
}
```

**Valid Status Values:**
- `pending`
- `in-progress`
- `completed`

**Response (200):**
```json
{
  "status": "success",
  "message": "Task status updated successfully",
  "data": {
    "id": 1,
    "status": "in-progress"
  }
}
```

**Error (400):**
```json
{
  "status": "error",
  "message": "Invalid status. Must be one of: pending, in-progress, completed"
}
```

---

### Update Task
**PUT** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Task ID (required)

**Request:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in-progress"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Updated task title",
    "description": "Updated description",
    "status": "in-progress"
  }
}
```

**Error (400):**
```json
{
  "status": "error",
  "message": "Validation error",
  "details": [
    {
      "field": "title",
      "message": "Title cannot exceed 200 characters"
    }
  ]
}
```

---

### Delete Task
**DELETE** `/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Task ID (required)

**Response (200):**
```json
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

**Error (404):**
```json
{
  "status": "error",
  "message": "Task not found"
}
```

---

## ℹ️ Utility Endpoints

### API Information
**GET** `/`

**Response:**
```json
{
  "status": "success",
  "message": "Task Management API is running",
  "version": "1.0.0",
  "endpoints": {
    "auth": {
      "register": "POST /api/auth/register",
      "login": "POST /api/auth/login"
    },
    "tasks": {
      "create": "POST /api/tasks",
      "getAll": "GET /api/tasks?page=1&limit=10",
      "getById": "GET /api/tasks/:id",
      "updateStatus": "PATCH /api/tasks/:id/status",
      "update": "PUT /api/tasks/:id",
      "delete": "DELETE /api/tasks/:id"
    }
  }
}
```

---

### Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:35:00.000Z"
}
```

---

## 📊 Input Validation Rules

### Task Fields
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| title | String | Yes | Min 3 chars, Max 200 chars |
| description | String | No | Max 1000 chars |
| status | String | Yes | One of: pending, in-progress, completed |

### User Fields
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| email | String | Yes | Valid email format |
| password | String | Yes | Min 6 characters |

### Pagination
| Parameter | Type | Default | Rules |
|-----------|------|---------|-------|
| page | Integer | 1 | Min 1 |
| limit | Integer | 10 | Min 1, Max 100 |

---

## 🔐 Authentication

All task endpoints require Bearer token authentication.

**Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Token Acquisition:**
1. Register: POST `/api/auth/register`
2. Login: POST `/api/auth/login`
3. Use returned `token` in Authorization header

**Token Expiration:**
- Default: 7 days
- Set via JWT_EXPIRE in .env

---

## 📝 Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "details": []
}
```

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Successful GET, PUT, PATCH |
| 201 | Created - Successful POST |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - Invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🚀 Complete Workflow Example

### 1. Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```
⚠️ Copy the token from response

### 3. Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"My first task",
    "description":"This is a test task",
    "status":"pending"
  }'
```

### 4. Get All Tasks
```bash
curl -X GET "http://localhost:3000/api/tasks?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Update Task Status
```bash
curl -X PATCH http://localhost:3000/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"in-progress"}'
```

### 6. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📞 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "No token provided" | Missing Authorization header | Add `Authorization: Bearer <token>` |
| "Invalid or expired token" | Token invalid/expired | Login again to get new token |
| "Task not found" | Task ID doesn't exist | Check task ID, list all tasks |
| "Email already registered" | Email in use | Use different email |
| "Validation error" | Invalid input | Check field requirements |
| "Invalid status" | Wrong status value | Use: pending, in-progress, completed |

---

## 💡 Tips

- Always register/login before accessing task endpoints
- Use Postman for interactive testing
- Pagination helps with large datasets
- Status values are case-sensitive
- Token expires after 7 days by default
- Each user can only see their own tasks
