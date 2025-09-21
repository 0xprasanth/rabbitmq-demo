import { Router } from "express";
import { OrderService } from "./orders.service";
import { OrderController } from "./orders.controller";

export default function orderRoutes(orderService: OrderService) {
  const router = Router();
  const orderController = new OrderController(orderService);

  router.get("/health", (req, res) => {
    res.send("ORDER ROUTES WORKING");
  });
  router.get("/", orderController.getOrders);

  // /api/orders
  router.post("/", orderController.createOrder);
  // PATCH /api/orders
  router.patch("/:id", orderController.updateOrder);

  return router;
}
