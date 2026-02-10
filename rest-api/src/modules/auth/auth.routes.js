import { Router } from "express";
import { login, logout, register } from "./auth.controller.js";
const router = Router();

// create a new user
router.post("/register", register);

// user login
router.post("/login", login);

// user logout
router.post("/logout", logout);

export default router;
