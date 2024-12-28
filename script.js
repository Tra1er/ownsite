let users = JSON.parse(localStorage.getItem('users')) || [];

function showLoginPage() {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('register-page').style.display = 'none';
}

function showRegisterPage() {
    document.getElementById('register-page').style.display = 'block';
    document.getElementById('login-page').style.display = 'none';
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showDashboard(user.username);
    } else {
        alert('Invalid credentials');
    }
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users.some(user => user.username === username)) {
        alert('Username already taken');
    } else {
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        showLoginPage();
    }
}

function showDashboard(username) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('username-display').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'inline-block';
    document.getElementById('username-display').style.display = 'none';

    document.getElementById('dashboard-username').innerText = username;
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('username-display').style.display = 'none';
    showLoginPage();
}

function toggleThemeSelector() {
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.style.display = themeSelector.style.display === 'none' ? 'block' : 'none';
}

function setTheme(theme) {
    document.getElementById('theme-style').setAttribute('href', theme + '.css');
    localStorage.setItem('theme', theme);
}

window.onload = function () {
    const savedTheme = localStorage.getItem('theme') || 'cosy-theme';
    setTheme(savedTheme);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showDashboard(loggedInUser.username);
    } else {
        showLoginPage();
    }
};
