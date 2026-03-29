# Task Management REST API

A comprehensive Task Management REST API built with Node.js, Express, and MySQL. This API provides full CRUD operations for task management with authentication, pagination, input validation, and Docker support.

## Features

✅ **Core Features:**
- Create, Read, Update, Delete tasks
- User authentication with JWT
- Task status management (pending, in-progress, completed)
- Task metadata (id, title, description, status, created_at)

✅ **Bonus Features:**
- JWT-based authentication
- Pagination with configurable page size
- Input validation using Joi
- Docker & Docker Compose support
- Comprehensive error handling
- CORS support
- Health check endpoint

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** Joi
- **Container:** Docker & Docker Compose

## Project Structure

```
task-manager/
├── src/
│   ├── app.js                 # Main Express application
│   ├── config/
│   │   └── database.js        # Database connection pool
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   └── validation.js      # Input validation middleware
│   └── routes/
│       ├── authRoutes.js      # Authentication endpoints
│       └── taskRoutes.js      # Task endpoints
├── database/
│   └── init.sql               # Database schema
├── package.json               # Dependencies
├── Dockerfile                 # Docker image configuration
├── docker-compose.yml         # Docker Compose setup
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher) OR Docker & Docker Compose
- npm or yarn package manager

## Installation

### Option 1: Local Setup with MySQL

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=task_manager
   DB_PORT=3306
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```

4. **Create database and tables**
   ```bash
   mysql -u root -p < database/init.sql
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

### Option 2: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will:
   - Build the Node.js application image
   - Start MySQL database container
   - Start the API server
   - Create database and tables automatically

3. **Verify the containers are running**
   ```bash
   docker-compose ps
   ```

4. **Stop the containers**
   ```bash
   docker-compose down
   ```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check
```
GET /health
```
Returns server health status.

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

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

#### Login User
```
POST /api/auth/login
Content-Type: application/json

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

### Task Endpoints

**All task endpoints require authentication. Include the token in the `Authorization` header:**
```
Authorization: Bearer <token>
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the API",
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
    "description": "Write comprehensive documentation for the API",
    "status": "pending",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Tasks (with Pagination)
```
GET /api/tasks?page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10, max: 100) - Items per page

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
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 1,
      "total_pages": 1
    }
  }
}
```

#### Get Task by ID
```
GET /api/tasks/1
Authorization: Bearer <token>
```

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

#### Update Task Status
```
PATCH /api/tasks/1/status
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "in-progress"
}
```

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

#### Update Task
```
PUT /api/tasks/1
Content-Type: application/json
Authorization: Bearer <token>

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

#### Delete Task
```
DELETE /api/tasks/1
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

## Error Handling

All error responses follow this format:

```json
{
  "status": "error",
  "message": "Error description",
  "details": [] // Optional, for validation errors
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Input Validation

### Task Fields
- **title** (required)
  - Minimum length: 3 characters
  - Maximum length: 200 characters
- **description** (optional)
  - Maximum length: 1000 characters
- **status** (required)
  - Valid values: `pending`, `in-progress`, `completed`

### Pagination
- **page** (optional, default: 1)
  - Minimum: 1
- **limit** (optional, default: 10)
  - Minimum: 1
  - Maximum: 100

## Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Tasks Table
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

## Using Postman

1. **Import the Collection**
   - Open Postman
   - Click "Import" and select `Task_Management_API.postman_collection.json`

2. **Set Environment Variables**
   - Create a new environment or use the default
   - Set `base_url` to `http://localhost:3000`
   - The `token` will be automatically populated after login

3. **Test the Endpoints**
   - Register a new user
   - Login to get a token
   - Use the token to test task endpoints

## Using cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"Complete project",
    "description":"Finish the project",
    "status":"pending"
  }'
```

### Get All Tasks
```bash
curl -X GET "http://localhost:3000/api/tasks?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Task by ID
```bash
curl -X GET http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Task Status
```bash
curl -X PATCH http://localhost:3000/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"in-progress"}'
```

### Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"Updated title",
    "description":"Updated description",
    "status":"in-progress"
  }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_manager
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

## Docker Commands

### Build Image
```bash
docker build -t task-manager-api .
```

### Run Container
```bash
docker run -p 3000:3000 \
  -e DB_HOST=mysql \
  -e DB_USER=taskuser \
  -e DB_PASSWORD=taskpassword \
  -e DB_NAME=task_manager \
  -e JWT_SECRET=your_secret \
  task-manager-api
```

### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v
```

## Development

### Install Development Dependencies
```bash
npm install
```

### Run in Development Mode
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

## Git Usage

Initialize and push to GitHub:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Task Management REST API"

# Add remote repository
git remote add origin <your-repo-url>

# Push to main branch
git push -u origin main
```

## Performance Considerations

1. **Database Indexes:** Optimized indexes on `user_id`, `status`, and `created_at`
2. **Connection Pooling:** MySQL connection pool for efficient resource usage
3. **Pagination:** Prevents large dataset transfers
4. **JWT Tokens:** Stateless authentication for scalability
5. **Error Handling:** Graceful error handling prevents server crashes

## Security Considerations

1. **Password Hashing:** bcryptjs for secure password storage
2. **JWT Authentication:** Token-based authentication
3. **Input Validation:** Joi for comprehensive input validation
4. **SQL Injection Prevention:** Prepared statements via mysql2
5. **CORS:** Configurable CORS for API security
6. **Environment Variables:** Sensitive data stored in .env

## Testing Recommendations

1. Test all CRUD operations
2. Verify pagination works correctly
3. Test authentication and authorization
4. Validate input validation messages
5. Test error responses
6. Load test with multiple users

## Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists: `CREATE DATABASE task_manager;`

### Port Already in Use
```bash
# Change PORT in .env or kill the process
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### JWT Token Errors
- Ensure token is included in Authorization header
- Verify JWT_SECRET in `.env` matches
- Check token expiration

### Docker Issues
```bash
# Rebuild containers
docker-compose down
docker-compose up -d --build

# Check container logs
docker-compose logs -f app
docker-compose logs -f mysql
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
