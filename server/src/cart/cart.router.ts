import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import isAuth from "../utils/isAuth";
import {
  addItemToCart,
  getAllCartItems,
  removeItemFromCart,
} from "./cart.controller";

const cartRouter = Router();

cartRouter.post("/addCartItem/:productId", isAuth, addItemToCart);

cartRouter.get("/", isAuth, getAllCartItems);

cartRouter.delete("/deleteCartItem/:cartItemId", isAuth, removeItemFromCart);

export default cartRouter;
