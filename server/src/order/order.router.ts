import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import isAuth from "../utils/isAuth";
import { createOrder, getAllOrder } from "./order.controller";
import { createOrderSchema } from "./order.schema";

const orderRouter = Router();

orderRouter.post(
  "/createOrder",
  createOrder
);

orderRouter.get("/", isAuth, getAllOrder);

export default orderRouter;
