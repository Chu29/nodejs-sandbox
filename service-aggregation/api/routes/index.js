import { Router } from "express";
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the Service Aggregation API" });
});

export default router;
