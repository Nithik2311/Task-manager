# Task Manager - Complete Setup & Start Guide

## 📋 What's Included

This is a **full-stack Task Management Application** with:
- ✅ Node.js + Express REST API
- ✅ MySQL Database with Docker
- ✅ JWT Authentication
- ✅ Modern HTML5/CSS3 Frontend
- ✅ Full CRUD Operations
- ✅ Task Filtering & Pagination
- ✅ Responsive Design (Mobile, Tablet, Desktop)

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Docker Desktop (or Docker + Docker Compose installed)
- Node.js 18+ (for development/testing only)

### Step 1: Start the Application

Open a terminal in the project directory and run:

```bash
docker-compose up --build
```

Wait for both services to be healthy:
```
task_manager_db   ✓ Running (healthy)
task_manager_api  ✓ Running (healthy)
```

### Step 2: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

### Step 3: Create an Account & Login

1. Click "Register here"
2. Enter email and password (min 6 characters)
3. Click "Register"
4. Login with your credentials
5. You're in the dashboard!

### Step 4: Create Your First Task

1. Click "+ New Task"
2. Enter task title, description (optional), and status
3. Click "Create Task"
4. Your task appears in the list!

---

## 📁 Project Structure

```
task-manager/
├── src/
│   ├── app.js                 # Express app setup
│   ├── config/
│   │   └── database.js        # MySQL connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── taskController.js  # Task logic
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── validation.js      # Input validation
│   └── routes/
│       ├── authRoutes.js      # Auth endpoints
│       └── taskRoutes.js      # Task endpoints
├── public/
│   ├── index.html             # Login/Register page
│   ├── dashboard.html         # Task management page
│   ├── style.css              # All styling
│   ├── auth.js                # Frontend auth logic
│   └── dashboard.js           # Frontend task logic
├── database/
│   └── init.sql               # Database schema
├── package.json               # Dependencies
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # API container config
└── .env.example               # Environment variables
```

---

## 🔑 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Tasks (All require JWT token)
```
GET    /api/tasks?page=1&limit=10
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
PATCH  /api/tasks/:id/status
DELETE /api/tasks/:id
```

---

## 💻 Features

### Frontend Features
- ✅ Login/Register with validation
- ✅ Task creation with title, description, status
- ✅ View all tasks with pagination
- ✅ Filter tasks by status
- ✅ Edit task details
- ✅ Quick status toggling
- ✅ Delete tasks
- ✅ Responsive design for all devices
- ✅ User-friendly error messages

### Backend Features
- ✅ User registration with password hashing
- ✅ JWT authentication
- ✅ Task CRUD operations
- ✅ Input validation with Joi
- ✅ Pagination support
- ✅ Error handling
- ✅ Database transactions
- ✅ User isolation (each user sees only their tasks)

---

## 🗄️ Database

### Tables
1. **users**
   - id (Primary Key)
   - email (Unique)
   - password (hashed)
   - created_at
   - updated_at

2. **tasks**
   - id (Primary Key)
   - user_id (Foreign Key → users)
   - title (3-200 characters)
   - description (max 1000 characters)
   - status (pending, in-progress, completed)
   - created_at
   - updated_at

### Connection
- Host: `localhost` (from Windows)
- Port: `3307` (external), `3306` (internal)
- Username: `root`
- Password: `root_password`
- Database: `task_manager_db`

---

## 🔐 Authentication Flow

1. **Register**
   ```
   User enters email + password
   → Password hashed with bcrypt
   → User saved to database
   → Ready to login
   ```

2. **Login**
   ```
   User enters email + password
   → Password verified
   → JWT token generated (7-day expiration)
   → Token stored in browser localStorage
   → Redirected to dashboard
   ```

3. **Protected Requests**
   ```
   Each API request includes JWT token
   → Server verifies token validity
   → Returns 401 if token missing/invalid
   → Returns 403 if token expired
   ```

---

## 🛠️ Development Commands

### Check Docker Status
```bash
docker-compose ps
```

### View API Logs
```bash
docker-compose logs -f task_manager_api
```

### View Database Logs
```bash
docker-compose logs -f task_manager_db
```

### Stop Services
```bash
docker-compose down
```

### Remove Everything (Clean Start)
```bash
docker-compose down -v
```

---

## 🧪 Testing

### Test Authentication
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Task Creation
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"My Task","status":"pending"}'
```

### Health Check
```bash
curl http://localhost:3000/health
```

---

## 🎨 Customization

### Change Colors
Edit `public/style.css` CSS variables:
```css
:root {
    --primary-color: #3498db;      /* Change to your color */
    --secondary-color: #2ecc71;
    --danger-color: #e74c3c;
    ...
}
```

### Change API Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Access on port 3001 instead
```

### Change Database Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "3308:3306"  # Access on port 3308 instead
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows - Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

### Docker Containers Won't Start
```bash
# Check docker status
docker ps -a

# View error logs
docker-compose logs

# Rebuild containers
docker-compose up --build --force-recreate
```

### Cannot Login
1. Check if user was registered
2. Verify email and password are correct
3. Check browser console (F12) for errors
4. Verify API is running: `curl http://localhost:3000/health`

### Tasks Not Loading
1. Ensure you're logged in (user email shows in sidebar)
2. Check browser console for errors
3. Verify JWT token is valid
4. Try logging out and logging back in

### Database Connection Error
```bash
# Check if MySQL is running
docker-compose ps

# View database logs
docker-compose logs task_manager_db

# Restart database
docker-compose restart task_manager_db
```

---

## 📊 Task Workflow

```
Pending (Default)
    ↓
In Progress (Click status button)
    ↓
Completed (Click status button again)
    ↓
Pending (Click status button again - cycles back)
```

---

## 📝 Notes

- Tasks are private: Each user only sees their own tasks
- Pagination: Default 10 tasks per page
- Token Expiration: JWT tokens expire after 7 days
- Passwords: Hashed with bcrypt for security
- Validation: Email format and password strength validated
- Database: Automatically created and initialized on first run

---

## 🎓 Learning Resources

### Frontend Files
- `public/index.html` - HTML structure
- `public/style.css` - CSS styling and responsiveness
- `public/auth.js` - Form handling and API calls
- `public/dashboard.js` - Task management and pagination

### Backend Files
- `src/app.js` - Express app configuration
- `src/controllers/` - Business logic
- `src/routes/` - API endpoint definitions
- `src/middleware/` - Authentication and validation
- `database/init.sql` - Database schema

---

## 🚀 Deployment

To deploy to production:
1. Build Docker image: `docker build -t task-manager .`
2. Push to registry (Docker Hub, Azure ACR, etc.)
3. Deploy using orchestration (Docker Compose, Kubernetes, etc.)
4. Set production environment variables
5. Enable HTTPS for security

---

## 📄 License

MIT License - Free to use and modify

---

## 💬 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the FRONTEND_README.md for UI details
3. Check API_ENDPOINTS.md for API documentation
4. Review code comments in source files

---

**Enjoy managing your tasks! 🎉**
