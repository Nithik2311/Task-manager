# Frontend & Backend Integration Test Guide

## 🧪 Complete Testing Workflow

This guide provides step-by-step instructions to verify that the entire Task Manager application works end-to-end.

---

## ✅ Pre-Test Checklist

Before starting tests, ensure:
- [ ] Docker is installed and running
- [ ] Docker Compose is available
- [ ] Port 3000 (API) is not in use
- [ ] Port 3307 (MySQL) is not in use
- [ ] Terminal/Command Prompt is open
- [ ] You're in the `task-manager` directory

---

## 🚀 Step 1: Start the Application

### Command
```bash
docker-compose up --build
```

### Expected Output
```
Creating network "task-manager_default" with the default driver
Creating task_manager_db ... done
Creating task_manager_api ... done
task_manager_api    | Server listening on port 3000
task_manager_db    | ready for connections
```

### Verification
```bash
docker-compose ps
```

Should show:
```
NAME              STATUS
task_manager_db   Up (healthy)
task_manager_api  Up (healthy)
```

---

## 🌐 Step 2: Test Frontend Loading

### Action
Open browser and navigate to:
```
http://localhost:3000
```

### Expected Result
- [ ] Login page loads with "TaskFlow" title
- [ ] "Manage your tasks with ease" subtitle appears
- [ ] Login form is visible with email and password fields
- [ ] "Register here" link is visible
- [ ] CSS styles are applied (not plain HTML)
- [ ] No JavaScript errors in console (F12 → Console tab)

### Screenshot Checklist
- [ ] Modern gradient background (purple/blue)
- [ ] White auth box with shadow
- [ ] Login form with proper styling
- [ ] All buttons have proper styling

---

## 👤 Step 3: Test User Registration

### Action 1: Click "Register here"
- [ ] Register form appears
- [ ] Login form hides
- [ ] "Already have an account?" link appears

### Action 2: Fill Registration Form
```
Email: testuser@example.com
Password: password123
Confirm: password123
```

### Action 3: Submit Form
- [ ] Success message appears: "Registration successful!"
- [ ] No errors in console
- [ ] Form clears after 1.5 seconds
- [ ] Auto-switches back to login form

### Expected API Call
```
POST /api/auth/register
Status: 201 Created
Response: {"status":"success","data":{"id":1,"email":"testuser@example.com"}}
```

---

## 🔑 Step 4: Test User Login

### Action 1: Verify Login Form
- [ ] Login form is active
- [ ] Email field is empty
- [ ] Password field is empty
- [ ] "Register here" link is visible

### Action 2: Fill Login Form
```
Email: testuser@example.com
Password: password123
```

### Action 3: Submit Form
- [ ] Success message: "Login successful! Redirecting..."
- [ ] Page redirects to dashboard after 1.5 seconds
- [ ] No errors in console

### Expected API Call
```
POST /api/auth/login
Status: 200 OK
Response: {"status":"success","data":{"token":"eyJ...","user":{"id":1,"email":"testuser@example.com"}}}
```

---

## 📋 Step 5: Test Dashboard Layout

### Sidebar
- [ ] Shows user email: "testuser@example.com"
- [ ] "Logout" button is red/danger styled
- [ ] Sidebar is on the left (desktop view)

### Header
- [ ] Shows "My Tasks" heading
- [ ] Shows "+ New Task" button in blue

### Task List
- [ ] "Loading tasks..." message appears briefly
- [ ] Tasks container is empty (first task creation)
- [ ] "No tasks found" message appears
- [ ] "Create Task" button appears in empty state

### Filters
- [ ] "All Tasks" button is highlighted/active
- [ ] "Pending", "In Progress", "Completed" buttons are available
- [ ] All buttons have proper styling

### Pagination
- [ ] "Previous" button is disabled (grayed out)
- [ ] "Next" button is disabled (grayed out)
- [ ] "Page 1 of 1" indicator shows

---

## ➕ Step 6: Test Create Task

### Action 1: Click "+ New Task"
- [ ] Modal appears with overlay
- [ ] "Create New Task" header shows
- [ ] Close button (×) is visible
- [ ] Three form fields: Title, Description, Status
- [ ] Two buttons: Cancel, Create Task

### Action 2: Fill Form
```
Title: My First Task
Description: This is a test task for the application
Status: pending
```

### Action 3: Submit
- [ ] Modal closes
- [ ] Success message: "Task created successfully!"
- [ ] Task appears in the list

### Expected API Call
```
POST /api/tasks
Authorization: Bearer eyJ...
Status: 201 Created
Response: {"status":"success","data":{"id":1,"title":"My First Task",...}}
```

### Verify Task Card
- [ ] Title displays: "My First Task"
- [ ] Status badge shows: "pending" (yellow background)
- [ ] Description shows below title
- [ ] Date shows in format: "MM/DD/YYYY"
- [ ] Three action buttons: Edit, ▶️ In Progress, Delete

---

## ✏️ Step 7: Test Edit Task

### Action 1: Click "Edit"
- [ ] Edit modal appears
- [ ] Title field shows: "My First Task"
- [ ] Description shows: "This is a test task..."
- [ ] Status shows: "pending"

### Action 2: Modify Task
```
Title: My First Task (Updated)
Description: Updated description
Status: in-progress
```

### Action 3: Submit
- [ ] Modal closes
- [ ] Success message: "Task updated successfully!"
- [ ] Task card updates with new information
- [ ] Status badge changes to "in-progress" (blue)

### Expected API Call
```
PUT /api/tasks/1
Authorization: Bearer eyJ...
Status: 200 OK
```

---

## 🔄 Step 8: Test Status Cycling

### Current Status: "in-progress"

### Action 1: Click "✅ Complete"
- [ ] Task updates immediately
- [ ] Status changes to "completed" (green)
- [ ] Button text changes to "⏸️ Reopen"
- [ ] No modal appears (quick status change)

### Action 2: Click "⏸️ Reopen"
- [ ] Status changes back to "pending" (yellow)
- [ ] Button text changes to "▶️ In Progress"

### Expected API Calls
```
PATCH /api/tasks/1/status
Body: {"status":"completed"}
Status: 200 OK

PATCH /api/tasks/1/status
Body: {"status":"pending"}
Status: 200 OK
```

---

## 🔍 Step 9: Test Task Filtering

### Create Multiple Tasks
1. Create task with title: "Work Task" - Status: in-progress
2. Create task with title: "Home Task" - Status: pending
3. Create task with title: "Done Task" - Status: completed

### Test Filter: "Pending"
- [ ] Click "Pending" button
- [ ] Only "Home Task" displays
- [ ] "Pending" button is highlighted

### Test Filter: "In Progress"
- [ ] Click "In Progress" button
- [ ] Only "Work Task" displays
- [ ] "In Progress" button is highlighted

### Test Filter: "Completed"
- [ ] Click "Completed" button
- [ ] Only "Done Task" displays
- [ ] "Completed" button is highlighted

### Test Filter: "All Tasks"
- [ ] Click "All Tasks" button
- [ ] All 3 tasks display
- [ ] "All Tasks" button is highlighted

---

## 📄 Step 10: Test Pagination

### Setup: Create Many Tasks
Create 15+ tasks to enable pagination (default 10 per page)

### Page 1
- [ ] First 10 tasks display
- [ ] "Previous" button is disabled
- [ ] "Next" button is enabled
- [ ] Page indicator shows: "Page 1 of 2"

### Click "Next"
- [ ] Page 2 displays
- [ ] Remaining 5+ tasks show
- [ ] "Previous" button is enabled
- [ ] "Next" button is disabled (if last page)
- [ ] Page indicator shows: "Page 2 of 2"

### Click "Previous"
- [ ] Back to page 1
- [ ] First 10 tasks display again

---

## 🗑️ Step 11: Test Delete Task

### Action 1: Click "Delete" on a Task
- [ ] Browser confirmation dialog appears
- [ ] Message: "Are you sure you want to delete this task?"

### Action 2a: Click "OK"
- [ ] Task is removed from list
- [ ] Success message: "Task deleted successfully!"
- [ ] Pagination updates if needed

### Action 2b: Click "Cancel"
- [ ] Dialog closes
- [ ] Task remains in list
- [ ] No API call is made

### Expected API Call (if confirmed)
```
DELETE /api/tasks/1
Authorization: Bearer eyJ...
Status: 200 OK
```

---

## 👋 Step 12: Test Logout

### Action 1: Click "Logout" Button
- [ ] Redirects to login page
- [ ] Login form appears
- [ ] Register form is hidden

### Action 2: Verify Session Cleared
- [ ] localStorage is cleared (check DevTools)
- [ ] JWT token is gone
- [ ] User data is removed

---

## 📱 Step 13: Test Responsive Design

### Mobile View (320px width)
1. Open DevTools (F12)
2. Click device toggle (toggle device toolbar)
3. Set width to 320px (mobile)

### Verify Mobile Layout
- [ ] Sidebar moves to top (not left)
- [ ] Layout stacks vertically
- [ ] Buttons are full width
- [ ] Text is readable
- [ ] Modals adjust to screen size
- [ ] Forms are usable on small screen

### Tablet View (768px width)
- [ ] Layout adjusts appropriately
- [ ] All elements visible without horizontal scrolling
- [ ] Touch-friendly button sizes

### Desktop View (1200px+ width)
- [ ] Original layout with sidebar on left
- [ ] Proper spacing and alignment
- [ ] All features visible

---

## 🔒 Step 14: Test Security

### Test Session Persistence
```
1. Login to application
2. Open DevTools → Application → Local Storage
3. Verify "token" and "user" are stored
4. Refresh page
5. You should still be logged in
```

### Test Token Expiration Handling
```
1. Login successfully
2. Wait 7 days (or manually expire token in localStorage)
3. Try to access dashboard
4. Should redirect to login page
```

### Test Password Validation
- [ ] Password < 6 characters shows error
- [ ] Passwords don't match shows error on register
- [ ] Invalid email format shows error

---

## 🛡️ Step 15: Test Error Handling

### Test Network Error
1. Disconnect internet while creating a task
   - [ ] Error message appears: "Connection error: ..."
   - [ ] Form is not submitted
   - [ ] Modal stays open

2. Reconnect internet
   - [ ] Try again
   - [ ] Should work normally

### Test API Error
1. Try login with non-existent email
   - [ ] Error message appears
   - [ ] No redirect occurs

2. Try create task without title
   - [ ] Client-side validation prevents submission
   - [ ] Error message: "Title is required"

---

## 🧪 API Integration Tests (cURL)

### Test Health Check
```bash
curl http://localhost:3000/health
```

Expected:
```json
{"status":"healthy","timestamp":"2024-01-01T12:00:00.000Z"}
```

### Test Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"api@test.com","password":"password123"}'
```

### Test Create Task
```bash
# Replace TOKEN with actual JWT token from login
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"API Test","description":"Test task","status":"pending"}'
```

### Test Get Tasks
```bash
curl http://localhost:3000/api/tasks?page=1&limit=5 \
  -H "Authorization: Bearer TOKEN"
```

---

## ✅ Final Verification Checklist

- [ ] Frontend loads without errors
- [ ] User can register
- [ ] User can login
- [ ] Dashboard displays correctly
- [ ] Can create tasks
- [ ] Can view tasks in list
- [ ] Can edit tasks
- [ ] Can change task status
- [ ] Can delete tasks
- [ ] Can filter tasks by status
- [ ] Can navigate pages
- [ ] Can logout
- [ ] Responsive design works
- [ ] Error handling works
- [ ] API endpoints working
- [ ] Database is persisting data
- [ ] JWT authentication working
- [ ] CORS is enabled

---

## 🎉 Test Results

If all tests pass:
- ✅ Frontend is working perfectly
- ✅ Backend is working perfectly
- ✅ Database is working perfectly
- ✅ Docker containers are healthy
- ✅ Integration is complete

**Your Task Manager application is production-ready!**

---

## 🐛 Troubleshooting

If any test fails, check:
1. Console for JavaScript errors (F12)
2. Network tab for API failures (F12)
3. Docker logs: `docker-compose logs`
4. Port availability: Are ports 3000 and 3307 free?

---

## 📊 Performance Testing (Optional)

### Create Large Dataset
Create 100+ tasks to test:
- [ ] Pagination works smoothly
- [ ] Filtering performs well
- [ ] UI remains responsive
- [ ] Database handles load

### Monitor Performance
1. Open DevTools → Performance tab
2. Record while:
   - Creating a task
   - Filtering tasks
   - Navigating pages
3. Check metrics are good

---

**Happy Testing! 🚀**
