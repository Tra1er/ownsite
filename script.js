// Simulating a mock database using localStorage
const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.getElementById('registerForm')?.addEventListener('submit', registerUser);
document.getElementById('loginForm')?.addEventListener('submit', loginUser);
document.getElementById('logout-btn')?.addEventListener('click', logout);

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

function goBack() {
    if (currentUser) {
        showPage('dashboard');
    } else {
        showPage('login');
    }
}

function registerUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    
    if (username && password) {
        usersDB.push({ username, password });
        localStorage.setItem('usersDB', JSON.stringify(usersDB));
        alert('Registration successful!');
        showPage('login');
    } else {
        alert('Please fill out both fields');
    }
}

function loginUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = usersDB.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        updateLoginStatus();
        showPage('dashboard');
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateLoginStatus();
    showPage('login');
}

function updateLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('register-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'inline-block';
    } else {
        document.getElementById('login-btn').style.display = 'inline-block';
        document.getElementById('register-btn').style.display = 'inline-block';
        document.getElementById('logout-btn').style.display = 'none';
    }
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
    updateLoginStatus();
};
