// Import necessary Firebase SDKs
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase
const auth = getAuth();

// Logout function
function logoutUser() {
    signOut(auth)
        .then(() => {
            // Redirect to login page after logout
            window.location.href = "index.html";  // Redirect to the login page
        })
        .catch((error) => {
            showNotification(error.message, "error");
        });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;

    // Append notification to body
    document.body.appendChild(notification);

    // Automatically remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Show user's email in dashboard
function displayUserInfo() {
    const user = auth.currentUser;
    if (user) {
        document.getElementById("userName").textContent = `Logged in as: ${user.email}`;  // Display user email
    }
}

// Event listener for the logout button
document.getElementById("logoutBtn").addEventListener("click", logoutUser);

// Display user info when the page is loaded
window.onload = () => {
    displayUserInfo();
};
