# Quick Start Guide

## Fastest Setup with Docker Compose

```bash
# 1. Clone repository
git clone <repository-url>
cd task-manager

# 2. Start everything with one command
docker-compose up -d

# 3. Done! API is running at http://localhost:3000
```

## Quick Test

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

Copy the token from the response and use it for task operations.

### Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My first task",
    "description": "This is a test task",
    "status": "pending"
  }'
```

### Get All Tasks
```bash
curl -X GET "http://localhost:3000/api/tasks?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Directory Structure

```
task-manager/
├── src/
│   ├── app.js                 # Main app entry
│   ├── config/database.js     # DB config
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth & validation
│   └── routes/                # API routes
├── database/init.sql          # Schema
├── docker-compose.yml         # Docker setup
├── package.json               # Dependencies
├── README.md                  # Full documentation
└── QUICKSTART.md              # This file
```

## Database Schema

- **users**: Stores user accounts
  - id, email, password, created_at

- **tasks**: Stores tasks for each user
  - id, user_id, title, description, status, created_at

## Features Included

✅ User authentication (JWT)
✅ CRUD operations for tasks
✅ Pagination support
✅ Input validation
✅ Error handling
✅ Docker support
✅ Postman collection

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login user |
| POST | /api/tasks | ✅ | Create task |
| GET | /api/tasks | ✅ | Get all tasks |
| GET | /api/tasks/:id | ✅ | Get task by ID |
| PATCH | /api/tasks/:id/status | ✅ | Update status |
| PUT | /api/tasks/:id | ✅ | Update task |
| DELETE | /api/tasks/:id | ✅ | Delete task |

## Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Setup
```bash
npm install
npm start
```

## Need Help?

- See README.md for detailed documentation
- Check the Postman collection for API examples
- Review database/init.sql for schema
