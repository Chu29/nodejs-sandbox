import { Router } from "express";
import { addToWatchList } from "./watchlist.controller.js";

const router = Router();

// addToWatchList route

router.post("/", addToWatchList);

export default router;
