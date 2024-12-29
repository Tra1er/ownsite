// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaustScS6rJo-x_XVGy3S0NXktJ_MoaI4",
    authDomain: "ownsite-80538.firebaseapp.com",
    projectId: "ownsite-80538",
    storageBucket: "ownsite-80538.firebasestorage.app",
    messagingSenderId: "476725097310",
    appId: "1:476725097310:web:a36c5e90a106e9b23d95cf",
    measurementId: "G-H2RHYV5T97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check for user state changes
onAuthStateChanged(auth, (user) => {
    const userName = document.getElementById("userName");
    const loginForm = document.getElementById("loginForm");
    const logoutSection = document.getElementById("logoutSection");
    const loggedInEmail = document.getElementById("loggedInEmail");
    const extraContent = document.getElementById("extraContent");
    
    if (user) {
        // User is logged in
        loggedInEmail.textContent = `Logged in as: ${user.email}`;
        loginForm.style.display = "none"; // Hide login form
        logoutSection.style.display = "block"; // Show logout section
        extraContent.style.display = "block"; // Show extra content after login
    } else {
        // User is logged out
        loginForm.style.display = "block"; // Show login form
        logoutSection.style.display = "none"; // Hide logout section
        extraContent.style.display = "none"; // Hide extra content
    }
});

// Register function
function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            showNotification("Registration Successful", "success");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showNotification(errorMessage, "error");
        });
}

// Login function
function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            showNotification("Login Successful", "success");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showNotification(errorMessage, "error");
        });
}

// Logout function
function logoutUser() {
    signOut(auth)
        .then(() => {
            showNotification("Logged out successfully", "success");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showNotification(errorMessage, "error");
        });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerText = message;

    document.body.appendChild(notification);

    // Automatically remove notification after a few seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Event listeners
document.getElementById("loginBtn").addEventListener("click", loginUser);
document.getElementById("registerBtn").addEventListener("click", registerUser);
document.getElementById("logoutBtn").addEventListener("click", logoutUser);
