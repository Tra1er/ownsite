const supabase = supabase.createClient(
    'https://ynglngyvvsrmxxfkenyy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZ2xuZ3l2dnNybXh4Zmtlbnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0MTQ4ODMsImV4cCI6MjA1MDk5MDg4M30.L6xiq6z2gFhnE_mi2JoGEua5o43wosW5fEHhyndnRU4'
);

async function registerUser() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert('Registration failed: ' + error.message);
    } else {
        alert('Registration successful! Please log in.');
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        setLoggedIn(data.user.email);
    }
}

async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert('Logout failed: ' + error.message);
    } else {
        setLoggedOut();
    }
}

function setLoggedIn(email) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';
    document.getElementById('user-email').textContent = email;
}

function setLoggedOut() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
}

async function checkSession() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        setLoggedIn(data.session.user.email);
    } else {
        setLoggedOut();
    }
}

checkSession();
