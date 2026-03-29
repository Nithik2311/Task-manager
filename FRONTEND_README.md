# Task Manager Frontend

## Overview
This is the frontend interface for the Task Management REST API. It provides a clean, modern UI for user authentication and task management.

## Features
- **User Authentication**: Login and registration with email validation
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (Pending, In Progress, Completed)
- **Pagination**: Navigate through tasks with pagination controls
- **Status Tracking**: Quick status cycling with visual indicators
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Project Structure
```
public/
├── index.html          # Login/Register page
├── dashboard.html      # Task management dashboard
├── style.css          # Global styles and responsive design
├── auth.js            # Authentication logic
└── dashboard.js       # Task management logic
```

## Pages

### 1. Authentication Page (index.html)
- **Login Form**: Enter email and password to access your tasks
- **Register Form**: Create a new account with email and password
- **Form Toggle**: Switch between login and register forms
- **Auto-redirect**: Logged-in users are automatically redirected to the dashboard

### 2. Dashboard Page (dashboard.html)
- **Sidebar**: User email display and logout button
- **Create Task Modal**: Add new tasks with title, description, and status
- **Edit Task Modal**: Modify existing task details
- **Task List**: View all tasks with their details and status
- **Filters**: Quick filter buttons for task status
- **Pagination**: Navigate through multiple pages of tasks
- **Task Actions**: Edit, change status, or delete individual tasks

## Styling

### Color Scheme
- **Primary**: #3498db (Blue)
- **Secondary**: #2ecc71 (Green)
- **Danger**: #e74c3c (Red)
- **Warning**: #f39c12 (Orange)
- **Dark**: #2c3e50
- **Light**: #ecf0f1

### Responsive Breakpoints
- **Desktop**: Full layout with sidebar (>768px)
- **Tablet**: Adapted layout (481px-768px)
- **Mobile**: Stacked layout (<480px)

## JavaScript Features

### Authentication (auth.js)
- **Email Validation**: Uses regex pattern for email format verification
- **Password Validation**: Minimum 6 characters required
- **Token Storage**: JWT token stored in localStorage
- **Auto-login Redirect**: Redirects authenticated users to dashboard
- **Error Handling**: User-friendly error messages

### Task Management (dashboard.js)
- **Task Loading**: Fetches tasks with pagination on page load
- **CRUD Operations**: Create, Read, Update, Delete task functionality
- **Status Cycling**: Quick toggle between task statuses (Pending → In Progress → Completed)
- **Filtering**: Filter tasks by status with dynamic display
- **Pagination**: Previous/Next navigation with page indicators
- **XSS Protection**: HTML escaping to prevent cross-site scripting

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user and receive JWT token

### Task Endpoints
- `GET /api/tasks?page=1&limit=10` - Get all tasks with pagination
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task

All task endpoints require JWT token in Authorization header.

## Local Storage

The frontend stores two items in localStorage:
- `token`: JWT authentication token (required for API access)
- `user`: User object with `id` and `email`

## Usage

1. **Navigate to Login Page**
   ```
   http://localhost:3000
   ```

2. **Register a New Account**
   - Click "Register here"
   - Enter email and password (min 6 chars)
   - Click "Register"

3. **Login**
   - Enter registered email and password
   - Click "Login"
   - You'll be redirected to the dashboard

4. **Manage Tasks**
   - Click "Create Task" to add a new task
   - Fill in title, description (optional), and status
   - Click "Create Task"

5. **Edit Tasks**
   - Click "Edit" on any task card
   - Modify the details
   - Click "Save Changes"

6. **Change Task Status**
   - Click the status button (▶️ In Progress, ✅ Complete, ⏸️ Reopen)
   - Status cycles: Pending → In Progress → Completed → Pending

7. **Delete Tasks**
   - Click "Delete" on any task card
   - Confirm deletion when prompted

8. **Filter Tasks**
   - Use filter buttons to view tasks by status
   - "All Tasks" shows all tasks
   - Other buttons filter by specific status

## Error Handling

The frontend handles various error scenarios:
- **Network errors**: Connection failures are reported to the user
- **Validation errors**: Form validation prevents invalid submissions
- **API errors**: Server error messages are displayed in toast notifications
- **Authentication errors**: Expired tokens redirect to login page
- **Empty states**: Helpful messages when no tasks are found

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations
- Lazy loading of tasks with pagination
- Debounced form submissions
- Efficient DOM updates
- CSS animations for smooth UX
- Local storage caching of user data

## Security Features
- Password validation before submission
- JWT token validation from server
- XSS protection through HTML escaping
- CORS enabled for cross-origin requests
- Secure password confirmation in registration

## Troubleshooting

### Cannot login
- Ensure you registered an account first
- Check that email and password are correct
- Verify the backend API is running on port 3000

### Tasks not loading
- Check browser console for error messages
- Verify JWT token is valid (not expired)
- Ensure backend database is accessible
- Check that you're logged in (look for user email in sidebar)

### Styling issues
- Clear browser cache (Ctrl+Shift+Del)
- Reload page (Ctrl+F5)
- Check that style.css is being loaded (Network tab in DevTools)

### Modal not closing
- Ensure JavaScript files are loaded correctly
- Check browser console for errors
- Try refreshing the page

## Development Tips

### Debugging
1. Open Developer Tools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for API calls
4. Check Application tab for localStorage contents

### Testing
- Test with different screen sizes (DevTools)
- Test with different user accounts
- Test task CRUD operations thoroughly
- Test pagination with many tasks

### Customization
- Modify colors in CSS `:root` variables
- Change API URL in JavaScript files
- Customize task fields in modals
- Adjust pagination limit in dashboard.js

## Future Enhancements
- Dark mode toggle
- Task search functionality
- Task due dates and reminders
- Task categories/tags
- User profile management
- Task attachment support
- Task assignment to other users
- Real-time task updates using WebSockets

## License
MIT License - Feel free to use and modify as needed.
