import { Express } from "express";
import orderRoutes from "@/api/orders";
import paymentRoutes from "@/api/payment";
import notificationRoutes from "@/api/notification";

const PREFIX = "/api";
export default function InitializeRoutes(app: Express) {
  app.use(`${PREFIX}/orders`, orderRoutes);
  app.use(`${PREFIX}/payment`, paymentRoutes);
  app.use(`${PREFIX}/notification`, notificationRoutes);
}
