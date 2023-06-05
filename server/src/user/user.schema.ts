import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),

  name: z.string(),
});

const signinSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
});

export { loginSchema, signinSchema };
