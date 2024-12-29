import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Get the authentication object
const auth = getAuth();

// Get elements
const userEmailElement = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Display the logged-in user's email
const user = auth.currentUser;
if (user) {
    userEmailElement.textContent = `Logged in as: ${user.email}`;
} else {
    window.location.href = "index.html"; // Redirect to login page if no user is logged in
}

// Logout function
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html"; // Redirect to login page after logout
    }).catch((error) => {
        console.error(error.message);
    });
});
