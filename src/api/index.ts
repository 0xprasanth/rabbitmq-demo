import { Express } from "express";
import orderRoutes from "@/api/orders";

const PREFIX = "/api";
export default function InitializeRoutes(app: Express) {
  app.use(`${PREFIX}/orders`, orderRoutes);
}
