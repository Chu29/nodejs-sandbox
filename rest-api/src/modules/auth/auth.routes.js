import { Router } from "express";
import { login, register } from "./auth.controller.js";
const router = Router();

// create a new user
router.post("/register", register);

// user login
router.post("/login", login);

export default router;
