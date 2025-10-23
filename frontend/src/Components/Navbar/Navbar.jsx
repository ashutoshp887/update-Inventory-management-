import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300"
        >
          Home
        </Link>

        {isLoggedIn && (
          <>
            <Link
              to="/update"
              className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300"
            >
              Update Quantity
            </Link>
            <Link
              to="/about"
              className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300"
            >
              Create Item
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/register"
              className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
