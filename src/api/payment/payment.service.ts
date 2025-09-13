// payment.service.ts

import { Consume } from "@/rabbitmq/consumer";

export default class PaymentService {
  constructor() {}
  createPayment(order: any) {
    console.log("Proccessed payment for: ", order);
    return;
  }
}
