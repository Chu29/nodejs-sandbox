import { Router } from "express";
import validateContentType from "../../middleware/validateContentType.mjs";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
} from "../services/brand.service.js";

const router = Router();

router.use(validateContentType);
router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/", createBrand);
router.delete("/:id", deleteBrand);
export default router;
