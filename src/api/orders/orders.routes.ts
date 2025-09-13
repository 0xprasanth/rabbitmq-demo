import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("ORDER ROUTES WORKING");
});

export default router;
