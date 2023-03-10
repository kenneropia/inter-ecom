import { z } from "zod";

const createCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().default(1),
});

export { createCartSchema };
