// Initialize Supabase client - This should be the first thing in your script
const supabase = supabase.createClient(
    'https://ynglngyvvsrmxxfkenyy.supabase.co', // your Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ2xuZ3l2dnNybXh4Zmtlbnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0MTQ4ODMsImV4cCI6MjA1MDk5MDg4M30.L6xiq6z2gFhnE_mi2JoGEua5o43wosW5fEHhyndnRU4' // your Supabase key
);

// Register user
document.getElementById('registerBtn').addEventListener('click', async () => {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!email || !password) {
        alert('Please fill in both email and password to register.');
        return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert('Registration failed: ' + error.message);
    } else {
        alert('Registration successful! Please log in.');
    }
});

// Login user
document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        showUser(data.user.email);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', data.user.email);
    }
});

// Logout user
document.getElementById('logoutBtn').addEventListener('click', () => {
    supabase.auth.signOut();
    hideUser();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
});

// Show user section
function showUser(email) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('userSection').style.display = 'block';
    document.getElementById('userName').textContent = email;
}

// Hide user section
function hideUser() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('userSection').style.display = 'none';
}

// Check if logged in on load
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    if (isLoggedIn && userEmail) {
        showUser(userEmail);
    }
});
