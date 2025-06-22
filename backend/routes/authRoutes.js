import express from "express";
import { register, login, logout, getUserProfile } from "../controllers/authController.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyJWT, getUserProfile);

export default router;
