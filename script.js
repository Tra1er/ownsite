// Set default theme to "cosy"
let currentTheme = localStorage.getItem('theme') || 'cosy';
applyTheme(currentTheme);

// Toggle login and register forms
function toggleLogin() {
  document.querySelector('.login-form').style.display = 'block';
  document.querySelector('.register-form').style.display = 'none';
}

function toggleRegister() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.register-form').style.display = 'block';
}

// Register a new user
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (!username || !password) {
    alert('Please fill out both fields');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful! You can now log in.');
  toggleLogin();
}

// Log in a user
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    document.getElementById('user-name').textContent = `Welcome, ${user.username}!`;
    showDashboard();
  } else {
    alert('Invalid credentials');
  }
}

// Show the dashboard
function showDashboard() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.register-form').style.display = 'none';
  document.querySelector('.dashboard').style.display = 'block';

  document.querySelector('.logout-btn').style.display = 'inline-block';
  document.querySelector('.login-btn').style.display = 'none';
  document.querySelector('.register-btn').style.display = 'none';
}

// Log out the user
function logout() {
  localStorage.removeItem('loggedInUser');
  document.querySelector('.logout-btn').style.display = 'none';
  document.querySelector('.login-btn').style.display = 'inline-block';
  document.querySelector('.register-btn').style.display = 'inline-block';
  document.querySelector('.dashboard').style.display = 'none';
  toggleLogin();
}

// Change the theme
function changeTheme(theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

// Apply the selected theme
function applyTheme(theme) {
  document.body.className = theme;
  const buttons = document.querySelectorAll('.theme-btn');
  buttons.forEach(button => button.classList.remove('cosy', 'cyberpunk', 'modern', 'classic', 'retro'));
  buttons.forEach(button => button.classList.add(theme));
}
