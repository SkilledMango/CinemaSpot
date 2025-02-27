document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navContainer = document.getElementById('header');

    // Create main navigation items
    const mainNavItems = `
        <li><a href="/Pages/store.html">Store</a></li>
        <li><a href="/Pages/about.html">About Us</a></li>
        ${!isLoggedIn ? `
            <li><a href="/Pages/login.html">Login</a></li>
            <li><a href="/Pages/register.html">Register</a></li>
        ` : `
            <li><a href="/Pages/user.html">My Account</a></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `}
    `;

    let navHTML = `
        <nav>
            <ul>
                <li><a href="/index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" style="width: 35px; height: 25px;">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </a></li>
                ${mainNavItems}
            </ul>
        </nav>
        <input type="checkbox" id="menu-toggle" class="menu-checkbox">
        <label for="menu-toggle" class="hamburger-menu">☰</label>
        <aside class="sidebar">
            <!-- Mobile Navigation -->
            <ul class="mobile-nav">
                ${mainNavItems}
            </ul>
            <h3>Recommendeds</h3>
            <ul>
                <br>
                <h4>TV Shows</h4>
                <li><a href="/Pages/AvatarTLA.html">The Last Air Bender</a></li>
                <li><a href="/Pages/the100.html">Breaking Bad</a></li>
                <li><a href="/Pages/breakingbad.html">The 100</a></li>
                <br>
                <h4>Movies</h4>
                <li><a href="/Pages/lotr.html">Lord Of The Rings</a></li>
                <br>
                <h4>Store</h4>
                <li><a href="/Pages/store.html">Merchandise</a></li>
            </ul>
        </aside>
    `;

    navContainer.innerHTML = navHTML;

    // Close sidebar when clicking a link (mobile)
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menu-toggle').checked = false;
        });
    });
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/Pages/login.html';
}