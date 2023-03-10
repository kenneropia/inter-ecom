import express, { NextFunction, Request, Response } from "express";
import db from "src/db";
import userRouter from "./user/user.router";
import productRouter from "./product/product.router";
import cartRouter from "src/cart/cart.router";
import orderRouter from "src/order/order.router";
import cors from "cors";
const app = express();

app.use(express.static('build/client'))

app.use(cors());

app.use(express.json());

import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../swagger.json";
import path from "path";

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/client')});
});

app.all("*", (req, res) => {
  return res.status(404).json({ message: "route not found" });
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).json({ message: "internal server error" });
});
const PORT = (process.env.PORT as unknown as number) || 3000;
const main = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server ready at: http://localhost:${PORT}`);
      console.log(`docs ready at: http://localhost:${PORT}/docs`);
    });
  } catch (e: any) {
    console.error(e.message);
    await db.$disconnect();
    process.exit(1);
  }
};
main();

process.on("unhandledRejection", (reason: Error | any) => {
  console.log(`unhandledRejection: ${reason.message || reason}`);
});

process.on("uncaughtException", (err: Error) => {
  console.log(`uncaughtException: ${err.message}`);
});
