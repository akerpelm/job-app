import express from "express";
import rateLimite from "express-rate-limit";
import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

const apiLimit = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes"
});
router.route("/register").post(apiLimit, register);
router.route("/login").post(apiLimit, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
