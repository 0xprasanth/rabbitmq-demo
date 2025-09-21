import express, { Request, Response } from "express";
import InitializeRoutes from "@/api";
import PaymentService from "@/api/payment/payment.service";
import { startPaymentConsumer } from "@/api/payment/payment.consumer";
import { OrderService } from "@/api/orders/orders.service";

const app = express();
app.use(express.json()); // <-- this enables req.body for JSON

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

app.post("/post", (req: Request, res: Response) => {
  res.send(req.body);
});

// Create shared service instances
const orderService = new OrderService();
const paymentService = new PaymentService(orderService);

// Initialize routes with shared services
InitializeRoutes(app, { orderService, paymentService });

// Start payment consumer
startPaymentConsumer(paymentService);
export default app;
