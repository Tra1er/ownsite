// Elements
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const welcomeMessage = document.getElementById('welcome-message');
const usernameSpan = document.getElementById('username');
const logoutBtn = document.getElementById('logout-btn');
const regUsername = document.getElementById('reg-username');
const regPassword = document.getElementById('reg-password');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

// Functions
function saveUser(username, password) {
    localStorage.setItem('user', JSON.stringify({ username, password }));
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function setLoggedIn(username) {
    welcomeMessage.classList.remove('hidden');
    usernameSpan.textContent = username;
    logoutBtn.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginForm.classList.add('hidden');
}

function setLoggedOut() {
    welcomeMessage.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginForm.classList.remove('hidden');
}

// Event Listeners
document.getElementById('register-btn').addEventListener('click', () => {
    const username = regUsername.value;
    const password = regPassword.value;
    if (username && password) {
        saveUser(username, password);
        alert('Registration successful!');
    } else {
        alert('Please fill out both fields.');
    }
});

document.getElementById('login-btn').addEventListener('click', () => {
    const username = loginUsername.value;
    const password = loginPassword.value;
    const user = getUser();
    if (user && user.username === username && user.password === password) {
        setLoggedIn(username);
    } else {
        alert('Invalid credentials.');
    }
});

logoutBtn.addEventListener('click', () => {
    setLoggedOut();
});

// Theme Selector
function setTheme(theme) {
    document.body.className = theme;
}

// Initialize
if (getUser()) {
    setLoggedIn(getUser().username);
}
