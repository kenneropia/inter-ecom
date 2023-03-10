import { z } from "zod";

export const createOrderSchema = z.object({
  cartId: z.string().uuid(),
  quantity: z.number(),
});

export const orderStatusSchema = z.enum([
  "pending",
  "paid",
  "verified",
  "delivered",
]);
