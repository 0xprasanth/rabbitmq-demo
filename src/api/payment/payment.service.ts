// payment.service.ts

import { ICreateOrder } from "@/types";
import { OrderService } from "@/api/orders/orders.service";

export default class PaymentService {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }
  async createPayment(order: ICreateOrder) {
     console.log("Processing payment for order:", order);
    
    try {
      // Simulate payment processing
      const paymentSuccessful = await this.simulatePayment(order);
      
      if (paymentSuccessful) {
        // Update order status to success
        const updatedOrder = this.orderService.updateOrder(order.id, {
          status: "paid",
        });
        
        if (updatedOrder) {
          console.log("✅ Payment processed successfully, order updated:", updatedOrder);
          return { success: true, order: updatedOrder };
        } else {
          console.log("❌ Failed to update order status");
          return { success: false, error: "Failed to update order status" };
        }
      } else {
        console.log("❌ Payment failed for order:", order.id);
        return { success: false, error: "Payment processing failed" };
      }
    } catch (error) {
      console.error("❌ Error processing payment:", error);
      return { success: false, error: "Payment processing error" };
    }
  }

  // Simulate payment processing logic with a delay
  private simulatePayment(order: ICreateOrder): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(`💳 Processing payment of ${order.price} for ${order.name}`);
      setTimeout(() => {
        console.log('✅ Payment successful!');
        resolve(true);
      }, 2000);
    });
  }
}
