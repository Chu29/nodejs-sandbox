import { Router } from "express";
import validateContentType from "../../middleware/validateContentType.mjs";

const router = Router();

router.use(validateContentType);
