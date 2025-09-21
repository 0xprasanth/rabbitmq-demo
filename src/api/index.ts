import { Express } from "express";
import { OrderService } from "@/api/orders/orders.service";
import PaymentService from "@/api/payment/payment.service";
import orderRoutes from "@/api/orders";
import paymentRoutes from "@/api/payment";
import notificationRoutes from "@/api/notification";

const PREFIX = "/api";

interface Services {
  orderService: OrderService;
  paymentService: PaymentService;
}

export default function InitializeRoutes(app: Express, services: Services) {
  app.use(`${PREFIX}/orders`, orderRoutes(services.orderService));
  app.use(`${PREFIX}/payment`, paymentRoutes);
  app.use(`${PREFIX}/notification`, notificationRoutes);
}
