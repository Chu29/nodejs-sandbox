import { Router } from "express";
import validateContentType from "../../middleware/validateContentType.mjs";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../services/brand.service.js";

const router = Router();

router.use(validateContentType);
router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
export default router;
