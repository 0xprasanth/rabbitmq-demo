// payment.consumer.ts
import PaymentService from "./payment.service";
import { Consume } from "@/rabbitmq/consumer";

export async function startPaymentConsumer(paymentService: PaymentService) {
  //   const channel = await getChannel();
  //   const queue = "order";

  //   await channel.assertQueue(queue);

  //   channel.consume(queue, (msg) => {
  //     if (msg) {
  //       const order = JSON.parse(msg.content.toString());
  //       console.log("💰 Payment consumer received:", order);
  //       paymentService.createPayment(order); // simulate payment logic
  //       channel.ack(msg);
  //     }
  //   });
  Consume("order", (order) => {
    console.log("Proccess payment for: ", order);
    console.log("💰 Payment consumer received:", order);
    paymentService.createPayment(order); // simulate payment logic
  });
}
