// ===== DASHBOARD.JS - TASK MANAGEMENT LOGIC =====

const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const createTaskBtn = document.getElementById('createTaskBtn');
const createModal = document.getElementById('createModal');
const editModal = document.getElementById('editModal');
const createTaskForm = document.getElementById('createTaskForm');
const editTaskForm = document.getElementById('editTaskForm');
const closeCreateBtn = document.querySelector('#createModal .modal-close');
const closeEditBtn = document.querySelector('#editModal .modal-close');
const tasksContainer = document.getElementById('tasksContainer');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicator = document.getElementById('pageIndicator');

// State
let currentPage = 1;
const tasksPerPage = 10;
let currentFilter = 'all';
let allTasks = [];
let editingTaskId = null;

// ===== AUTHENTICATION CHECK =====
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        // Redirect to login if not authenticated
        window.location.href = '/index.html';
        return;
    }

    try {
        const userData = JSON.parse(user);
        userEmail.textContent = userData.email || 'User';
    } catch (error) {
        console.error('Error parsing user data:', error);
    }

    loadTasks();
});

// ===== LOGOUT =====
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/index.html';
    });
}

// ===== FETCH TASKS =====
async function loadTasks() {
    try {
        const token = localStorage.getItem('token');
        
        tasksContainer.innerHTML = '<div class="loading">Loading tasks...</div>';

        const response = await fetch(
            `${API_BASE_URL}/tasks?page=${currentPage}&limit=${tasksPerPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {
            // Token expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/index.html';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to load tasks');
        }

        const data = await response.json();
        allTasks = data.data || [];

        updatePagination(data.pagination || {});
        displayTasks(allTasks);
    } catch (error) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <h3>Error loading tasks</h3>
                <p>${error.message}</p>
                <button class="btn btn-primary" onclick="location.reload()">Retry</button>
            </div>
        `;
        console.error('Load tasks error:', error);
    }
}

// ===== DISPLAY TASKS =====
function displayTasks(tasks) {
    // Filter tasks if needed
    let filteredTasks = tasks;
    if (currentFilter !== 'all') {
        filteredTasks = tasks.filter(task => task.status === currentFilter);
    }

    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <h3>No tasks found</h3>
                <p>Create a new task to get started</p>
                <button class="btn btn-primary" id="emptyCreateBtn">Create Task</button>
            </div>
        `;

        const emptyCreateBtn = document.getElementById('emptyCreateBtn');
        if (emptyCreateBtn) {
            emptyCreateBtn.addEventListener('click', () => openCreateModal());
        }
        return;
    }

    tasksContainer.innerHTML = filteredTasks.map(task => `
        <div class="task-card ${task.status}">
            <div class="task-header">
                <div>
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <span class="task-status ${task.status}">${task.status.replace('-', ' ')}</span>
                </div>
            </div>
            ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
            <div class="task-meta">
                <span>📅 ${new Date(task.created_at).toLocaleDateString()}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-secondary" onclick="openEditModal(${task.id})">Edit</button>
                <button class="btn btn-warning" onclick="cycleStatus(${task.id}, '${task.status}')">
                    ${getNextStatus(task.status)}
                </button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// ===== UPDATE PAGINATION =====
function updatePagination(pagination) {
    if (!pagination.totalPages) {
        prevPageBtn.style.display = 'none';
        nextPageBtn.style.display = 'none';
        pageIndicator.style.display = 'none';
        return;
    }

    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= pagination.totalPages;
    pageIndicator.textContent = `Page ${currentPage} of ${pagination.totalPages}`;
}

// ===== PAGINATION HANDLERS =====
if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadTasks();
        }
    });
}

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        loadTasks();
    });
}

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter || 'all';
        currentPage = 1;
        displayTasks(allTasks);
    });
});

// ===== CREATE TASK MODAL =====
if (createTaskBtn) {
    createTaskBtn.addEventListener('click', () => openCreateModal());
}

if (closeCreateBtn) {
    closeCreateBtn.addEventListener('click', () => closeCreateModal());
}

function openCreateModal() {
    createModal.classList.add('active');
    createTaskForm.reset();
}

function closeCreateModal() {
    createModal.classList.remove('active');
}

// ===== EDIT TASK MODAL =====
if (closeEditBtn) {
    closeEditBtn.addEventListener('click', () => closeEditModal());
}

function openEditModal(taskId) {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) {
        alert('Task not found');
        return;
    }

    editingTaskId = taskId;
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description || '';
    document.getElementById('editStatus').value = task.status;

    editModal.classList.add('active');
}

function closeEditModal() {
    editModal.classList.remove('active');
    editingTaskId = null;
}

// ===== CREATE TASK =====
if (createTaskForm) {
    createTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('createTitle').value.trim();
        const description = document.getElementById('createDescription').value.trim();
        const status = document.getElementById('createStatus').value;

        if (!title) {
            alert('Title is required');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    status
                })
            });

            if (!response.ok) {
                const data = await response.json();
                console.error('API Error:', data);
                alert(data.message || 'Failed to create task');
                return;
            }

            const createdTask = await response.json();
            console.log('Task created:', createdTask);
            
            closeCreateModal();
            currentPage = 1;
            await loadTasks();
            alert('Task created successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
            console.error('Create task error:', error);
        }
    });
}

// ===== UPDATE TASK =====
if (editTaskForm) {
    editTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!editingTaskId) {
            alert('No task selected');
            return;
        }

        const title = document.getElementById('editTitle').value.trim();
        const description = document.getElementById('editDescription').value.trim();
        const status = document.getElementById('editStatus').value;

        if (!title) {
            alert('Title is required');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/tasks/${editingTaskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    status
                })
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.message || 'Failed to update task');
                return;
            }

            closeEditModal();
            loadTasks();
            alert('Task updated successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
            console.error('Update task error:', error);
        }
    });
}

// ===== DELETE TASK =====
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message || 'Failed to delete task');
            return;
        }

        loadTasks();
        alert('Task deleted successfully!');
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Delete task error:', error);
    }
}

// ===== CYCLE STATUS =====
async function cycleStatus(taskId, currentStatus) {
    const statusCycle = {
        'pending': 'in-progress',
        'in-progress': 'completed',
        'completed': 'pending'
    };

    const newStatus = statusCycle[currentStatus] || 'pending';

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message || 'Failed to update status');
            return;
        }

        loadTasks();
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Cycle status error:', error);
    }
}

// ===== UTILITY FUNCTIONS =====
function getNextStatus(status) {
    const statusMap = {
        'pending': '▶️ In Progress',
        'in-progress': '✅ Complete',
        'completed': '⏸️ Reopen'
    };
    return statusMap[status] || 'Next';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== CLOSE MODALS ON OUTSIDE CLICK =====
window.addEventListener('click', (e) => {
    if (e.target === createModal) {
        closeCreateModal();
    }
    if (e.target === editModal) {
        closeEditModal();
    }
});
