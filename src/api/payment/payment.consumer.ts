// payment.consumer.ts
import PaymentService from "./payment.service";
import { Consume } from "@/rabbitmq/consumer";

export async function startPaymentConsumer(paymentService: PaymentService) {
  Consume("order", async (order) => {
    console.log("💰 Payment consumer received:", order);
    const result = await paymentService.createPayment(order);
    
    if (result.success) {
      console.log("✅ Payment completed successfully for order:", order.id);
    } else {
      console.log("❌ Payment failed for order:", order.id, "Error:", result.error);
      // In a real application, you might want to:
      // 1. Retry the payment
      // 2. Send to a dead letter queue
      // 3. Notify administrators
      // 4. Update order status to "failed"
    }
  });
}
