import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import ResetPassword from "./Components/Reset-Password/Reset-Password";
import HomePage from "./Components/Home/Home";
import UpdateQuantityPage from "./Components/Update Quantity/Update";
import CreateItem from "./Components/Item Creation/ItemC";
import Register from "./Components/Register/Regsister";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Components/ProtectRoutes/ProtectRoutes";
import VerifyOtp from "./Components/Verify/Verify";
import ForgetPassword from "./Components/Forget-Password/Forget-Password";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token); // convert to boolean
  }, []);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/update"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UpdateQuantityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreateItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />} // ✅ pass setter
          />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
