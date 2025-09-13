import express, { Request, Response } from "express";
import InitializeRoutes from "@/api";
import PaymentService from "@/api/payment/payment.service";
import { startPaymentConsumer } from "@/api/payment/payment.consumer";

const app = express();
app.use(express.json()); // <-- this enables req.body for JSON

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

app.post("/post", (req: Request, res: Response) => {
  res.send(req.body);
});

InitializeRoutes(app);
const paymentService = new PaymentService();
startPaymentConsumer(paymentService);
export default app;
