// notification.routes.ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("NOTIFICATION ROUTES WORKING");
});

export default router;
