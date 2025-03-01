function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    
    if (!isLoggedIn) {
        if (currentPath.includes('/store.html') || currentPath.includes('/about.html')) {
            // Redirect to homepage if trying to access protected pages
            window.location.href = '/index.html';
        } else if (currentPath === '/' || currentPath.includes('/index.html')) {
            // Show auth overlay on homepage for restricted content
            showAuthOverlay();
        }
    }
}

function showAuthOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';
    overlay.innerHTML = `
        <div class="auth-card">
            <img src="/Assets/Images/buttons/LogoRender.png" alt="CinemaSpot Logo" class="auth-logo">
            <h2 class="auth-title">Welcome to CinemaSpot</h2>
            <p class="auth-message">Sign in or create an account to access our full collection of movies and shows.</p>
            <div class="auth-buttons">
                <button class="auth-button login" onclick="window.location.href='/Pages/login.html'">Login</button>
                <button class="auth-button register" onclick="window.location.href='/Pages/register.html'">Register</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function createAccount(username, email, password) {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.some(user => user.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Add new user
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Automatically log in after registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        return { success: true };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: 'Registration failed. Please try again.' };
    }
}

function login(username, password) {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            return { success: true};
        }
        return { success: false, message: 'Invalid username or password' };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Login failed. Please try again.' };
    }
}

function validatePassword(password) {
    const requirements = {
        length: password.length >= 6,
        capital: /[A-Z]/.test(password),
        english: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)
    };
    return Object.values(requirements).every(req => req);
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');  // Changed from 'username' to 'currentUser'
    window.location.href = '../index.html';  // Changed to relative path
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);
