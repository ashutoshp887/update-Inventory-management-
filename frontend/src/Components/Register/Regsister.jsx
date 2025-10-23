// Register.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Autogmail from "../Gmail/Autogmail.jsx"; // Import Autogmail component

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [Name, setUsername] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");

  // 🔹 Regular email/password register
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await axios.post("http://localhost:8000/api/register", {
        Name,
        Email,
        Password,
      });

      if (response1.status === 200 || response1.status === 201) {
        alert("OTP has been sent to your email. Please verify.");
        setUsername("");
        setEmail("");
        setPassword("");
        localStorage.setItem("activtoken", response1.data.activtoken);
        navigate("/verify");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating user!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {/* Email/password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={ Name}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* 🔹 Google login button from Autogmail */}
        <Autogmail setIsLoggedIn={setIsLoggedIn} />

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
