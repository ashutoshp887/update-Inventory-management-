// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            Access Denied
          </h2>
          <p className="mb-6 text-gray-700">
            You must be logged in to view this page.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
