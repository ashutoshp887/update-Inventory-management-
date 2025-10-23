import jwt from "jsonwebtoken";
import usermodel from "../Model/UserSchema.js";

export const auth = async (req, res, next) => {
  try {
    // ✅ Read token from cookie OR Authorization header
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Please login first" });
    }

    // ✅ FIX: Correct environment variable name
    const verifytoken = jwt.verify(token, process.env.ACTIVE_SCRET);

    // ✅ Make sure to store user id in token when signing
    const user = await usermodel.findById(verifytoken.id);
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token has expired" });
    }
    console.error("Auth Middleware Error:", error.message);
    res.status(401).send({ message: "Invalid or expired token" });
  }
};
