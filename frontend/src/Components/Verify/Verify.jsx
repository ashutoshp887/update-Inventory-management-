import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const activtoken = localStorage.getItem("activtoken");
  console.log("Token from localStorage:", activtoken);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!activtoken) {
      alert("Token missing! Please register first.");
      navigate("/register");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/verify",
        { activtoken, otp },
        { withCredentials: true }
      );

      alert(res.data.message);
      localStorage.removeItem("activtoken");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "OTP verification failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Verify Your OTP
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          <span
            className="text-pink-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register Again
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
