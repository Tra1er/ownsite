// Simulating a mock database using localStorage
const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];

document.getElementById('registerForm')?.addEventListener('submit', registerUser);
document.getElementById('loginForm')?.addEventListener('submit', loginUser);

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

function goBack() {
    showPage('dashboard');
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
        alert('Login successful!');
        showPage('dashboard');
    } else {
        alert('Invalid credentials');
    }
}

function changeTheme() {
    const themes = ['cosy-theme', 'cyberpunk-theme', 'modern-theme', 'classic-theme'];
    const currentTheme = document.getElementById('theme-style').getAttribute('href');
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    document.body.className = nextTheme;
}
