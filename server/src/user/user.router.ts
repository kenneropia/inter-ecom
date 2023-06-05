import { Request, Response, Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import isAuth from "../utils/isAuth";
import { login, profile } from "./user.controller";
import { loginSchema, signinSchema } from "./user.schema";

const userRouter = Router();

userRouter.post("/login", validateRequestBody(loginSchema), login);
userRouter.get("/me", isAuth, profile);

export default userRouter;
