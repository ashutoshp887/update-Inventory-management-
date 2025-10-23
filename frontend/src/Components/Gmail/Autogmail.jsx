import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { auth, provider } from "../util/Firebase.js";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Autogmail = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      // 🔹 Step 1: Google Popup Sign-In
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      // 🔹 Step 2: Prepare Data for Backend
      const userData = {
        Name: user.displayName,
        Email: user.email,
        profilePic: user.profilePic,
        googleId: user.googleId || "",
      };

      // 🔹 Step 3: Send Data to Backend
      const res = await fetch("http://localhost:8000/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      // 🔹 Step 4: Handle Backend Response
      if (res.ok) {
        localStorage.setItem("token", data.token);
        Cookies.set("token", data.token, { expires: 7 }); // optional
        setIsLoggedIn(true);
        navigate("/"); // redirect after login
      } else {
        alert(data.message || "Google login failed");
      }
    } catch (error) {
      // 🔹 Step 5: Handle Common Firebase Errors
      if (error.code === "auth/popup-closed-by-user") {
        alert("Login popup was closed before completing login. Please try again!");
      } else if (error.code === "auth/cancelled-popup-request") {
        alert("Multiple popup requests blocked. Please try again!");
      } else {
        console.error("Login Error:", error);
        alert("Google Login Failed!");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <button
        onClick={googleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          gap: "8px",
        }}
      >
        <FcGoogle size={24} />
        Sign In With Google
      </button>
    </div>
  );
};

export default Autogmail;
