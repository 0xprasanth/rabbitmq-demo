// order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./orders.service";
import { ICreateOrder } from "@/types";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  getOrders = (req: Request, res: Response) => {
    const orders = this.orderService.getOrders();
    res.json(orders);
  };

  createOrder = (req: Request, res: Response) => {
    const body = req.body;
    const newOrder = this.orderService.createOrder({
      ...body,
      status: "pending",
    } as ICreateOrder);

    // Respond to client
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder[newOrder.length - 1],
    });
  };

  updateOrder = (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const updatedOrder = this.orderService.updateOrder(Number(id), body);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  };
}
