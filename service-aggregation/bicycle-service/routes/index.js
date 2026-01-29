import { Router } from "express";
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the Bicycle Service API" });
});

export default router;
