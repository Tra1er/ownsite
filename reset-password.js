import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Handle Reset Password
document.getElementById("resetBtn").addEventListener("click", () => {
    const email = document.getElementById("resetEmail").value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            showNotification("Password reset link sent to " + email, "success");
        })
        .catch((error) => {
            showNotification("Error: " + error.message, "error");
        });
});

// Show notification
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
});
