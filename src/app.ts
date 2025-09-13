import express, { Request, Response } from "express";
import InitializeRoutes from "@/api";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

InitializeRoutes(app);

export default app;
