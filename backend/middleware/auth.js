// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user ID or role stored here
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default auth;
