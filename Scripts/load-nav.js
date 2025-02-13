document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navContainer = document.getElementById('header');

    let navHTML = `
        <nav>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/Pages/store.html">Store</a></li>
                <li><a href="/Pages/about.html">About Us</a></li>
    `;

    if (!isLoggedIn) {
        navHTML += `
                <li><a href="/Pages/login.html">Login</a></li>
                <li><a href="/Pages/register.html">Register</a></li>
        `;
    } else {
        navHTML += `
                <li><a href="/Pages/user.html">My Account</a></li>
                <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    }

    navHTML += `
            </ul>
        </nav>
        <input type="checkbox" id="menu-toggle" class="menu-checkbox">
        <label for="menu-toggle" class="hamburger-menu">☰</label>
        <aside class="sidebar">
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/Pages/store.html">Store</a></li>
                <li><a href="/Pages/about.html">About Us</a></li>
    `;

    if (!isLoggedIn) {
        navHTML += `
                <li><a href="/Pages/login.html">Login</a></li>
                <li><a href="/Pages/register.html">Register</a></li>
        `;
    } else {
        navHTML += `
                <li><a href="/Pages/user.html">My Account</a></li>
                <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    }

    navHTML += `
            </ul>
        </aside>
    `;

    navContainer.innerHTML = navHTML;
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/Pages/login.html';
}