import { registerUser,loginUser ,VerifyUser,forgotPassword,resetPassword,googleLoginUser} from "../Controller/UserController.js";
import express from "express";
const router= express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/verify",VerifyUser)
router.post("/forgot-password",forgotPassword)

router.post("/reset-password/:token", resetPassword);
router.post("/google-login", googleLoginUser);
export default router;