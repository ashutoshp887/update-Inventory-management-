// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwa7aYp7EFoKfY5oI4btoX2vpINYLOPjE",
  authDomain: "inventory-managment-ec12a.firebaseapp.com",
  projectId: "inventory-managment-ec12a",
  storageBucket: "inventory-managment-ec12a.firebasestorage.app",
  messagingSenderId: "344867129825",
  appId: "1:344867129825:web:aa25f871fac7b6c8206aa0",
  measurementId: "G-GZW0L2WVMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
