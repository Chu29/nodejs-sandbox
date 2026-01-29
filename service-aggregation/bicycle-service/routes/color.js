import { Router } from "express";
import validateContentType from "../middleware/validateContentType";
const router = Router();

/* validateContentType middleware */
router.use(validateContentType);
