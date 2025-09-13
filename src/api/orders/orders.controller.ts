// order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "./orders.service";
import { ICreateOrder } from "@/types";
import { Publish } from "@/rabbitmq/publisher";
import PaymentService from "@/api/payment/payment.service";

export class OrderController {
  private orderService: OrderService;
  private paymentService: PaymentService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
    this.paymentService = new PaymentService();
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
    Publish("order", newOrder[newOrder.length - 1]);
    // have to call the payment service to consume it
    // this.paymentService.createPayment();
    // Respond to client
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder[newOrder.length - 1],
    });
  };
}
