import express from "express";
import rateLimite from "express-rate-limit";
import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

const apiLimit = () => {
  windowMs: 15 * 60 * 1000;
  max: 100;
  message: "Too many requests from this IP address. Please retry in 15 minutes.";
};
router.route("/register").post(apiLimit, register);
router.route("/login").post(apiLimit, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
