import { Router } from "express";
import validateContentType from "../middleware/validateContentType.js";
import {
  createColor,
  getColorById,
  getColors,
  updateColor,
} from "../services/color.service.js";
const router = Router();

/* validateContentType middleware */
router.use(validateContentType);

router.get("/", getColors);
router.get("/:id", getColorById);
router.post("/", createColor);
router.put("/:id", updateColor);

export default router;
