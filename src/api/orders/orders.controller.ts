// order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./orders.service";

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  getOrders = (req: Request, res: Response) => {
    const orders = this.orderService.getOrders();
    res.json(orders);
  };
}
