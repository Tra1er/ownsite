// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Register User
function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("User registered: " + userCredential.user.email);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Login User
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("userName").textContent = user.email;
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("logoutSection").style.display = "block";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Logout User
function logoutUser() {
  signOut(auth).then(() => {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("logoutSection").style.display = "none";
  }).catch((error) => {
    alert("Error: " + error.message);
  });
}

// Monitor auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userName").textContent = user.email;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("logoutSection").style.display = "block";
  } else {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("logoutSection").style.display = "none";
  }
});
