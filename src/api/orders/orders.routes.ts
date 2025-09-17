import { Router } from "express";
import { OrderService } from "./orders.service";
import { OrderController } from "./orders.controller";

const router = Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.get("/health", (req, res) => {
  res.send("ORDER ROUTES WORKING");
});
router.get("/", orderController.getOrders);

// /api/orders
router.post("/", orderController.createOrder);
// PATCH /api/orders
router.patch("/:id", orderController.updateOrder);

export default router;
