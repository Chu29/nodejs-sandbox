import express from "express";

import { validateContentType } from "../middleware/validateContentType.js";
import {
  createNewBicycle,
  getBicycleByID,
  getBicycles,
} from "../services/api.service.js";

const router = express.Router();

// register the validation middleware to validate Content-Type
router.use(validateContentType);

/* GET all bicycles */
router.get("/", getBicycles);

// Get bicycle by id
router.get("/:id", getBicycleByID);

// Create a new bicycle
router.post("/", createNewBicycle);

export default router;
