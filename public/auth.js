// ===== AUTH.JS - AUTHENTICATION LOGIC =====

const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const messageBox = document.getElementById('messageBox');
const loginSection = document.querySelector('.form-section.login');
const registerSection = document.querySelector('.form-section.register');

// ===== FORM TOGGLE =====
if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.remove('active');
        registerSection.classList.add('active');
    });
}

if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.classList.remove('active');
        loginSection.classList.add('active');
    });
}

// ===== MESSAGE DISPLAY =====
function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = `message ${type} show`;

    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 5000);
}

// ===== LOGIN HANDLER =====
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Validation
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(data.message || 'Login failed', 'error');
                return;
            }

            // Store token and user info
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));

            showMessage('Login successful! Redirecting...', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        } catch (error) {
            showMessage('Connection error: ' + error.message, 'error');
            console.error('Login error:', error);
        }
    });
}

// ===== REGISTER HANDLER =====
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!email || !password || !confirmPassword) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(data.message || 'Registration failed', 'error');
                return;
            }

            showMessage('Registration successful! Please login with your new account', 'success');

            // Clear form
            registerForm.reset();

            // Switch to login
            setTimeout(() => {
                registerSection.classList.remove('active');
                loginSection.classList.add('active');
            }, 1500);
        } catch (error) {
            showMessage('Connection error: ' + error.message, 'error');
            console.error('Register error:', error);
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== CHECK IF ALREADY LOGGED IN =====
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token && window.location.pathname.includes('index.html')) {
        // Redirect to dashboard if already logged in
        window.location.href = '/dashboard.html';
    }
});

// Set login form as active by default
document.addEventListener('DOMContentLoaded', () => {
    if (loginSection) {
        loginSection.classList.add('active');
    }
});
