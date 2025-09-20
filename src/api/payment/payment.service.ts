// payment.service.ts

import { ICreateOrder } from "@/types";
import { OrderService } from "@/api/orders/orders.service";

export default class PaymentService {
  private orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }
  createPayment(order: ICreateOrder) {
    console.log(order);
    const updatedOrder = this.orderService.updateOrder(order.id, {
      status: "paid",
    });
    console.log("Proccessed payment for: ", updatedOrder);
    return;
  }
}
