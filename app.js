import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
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

// Show notification
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Login user
document.getElementById("loginBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("logoutSection").style.display = "block";
            showNotification("Login Successful", "success");
        })
        .catch((error) => {
            showNotification("Login Failed: " + error.message, "error");
        });
});

// Register user
document.getElementById("registerBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            showNotification("Registration Successful", "success");
        })
        .catch((error) => {
            showNotification("Registration Failed: " + error.message, "error");
        });
});

// Logout user
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            document.getElementById("loginForm").style.display = "block";
            document.getElementById("logoutSection").style.display = "none";
            showNotification("Logged Out", "success");
        })
        .catch((error) => {
            showNotification("Logout Failed: " + error.message, "error");
        });
});
