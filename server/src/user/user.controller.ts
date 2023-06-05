import { Request, Response } from "express";
import { z } from "zod";
import db from "src/db";
import createToken from "src/utils/createToken";
import { loginSchema, signinSchema } from "./user.schema";

// const signup = async (
//   { body }: Request<any, any, z.infer<typeof signinSchema>>,
//   res: Response
// ) => {
//   let user = await db.user.findFirst({
//     select: { email: true, name: true, id: true, password: true },
//     where: { email: body.email },
//   });
//   if (user) {
//     return res.status(409).json({
//       message: "This email is already used",
//     });
//   }
//   const { email, name, id } = await db.user.create({
//     data: {
//       name: body.name,
//       email: body.email,
//       password: body.password,
//     },
//   });

//   const token = createToken({ id, email });
//   res.json({ user: { email, name, id }, token });
// };

const login = async (
  { body }: Request<any, any, z.infer<typeof loginSchema>>,
  res: Response
) => {
  let user = await db.user.upsert({
    select: { email: true, name: true, id: true },
    where: { email: body.email },
    create: {
      ...body,
    },
    update: {
      ...body,
    },
  });
  if (!user) {
    return res.status(404).json({
      message: "wrong login details",
    });
  }

  const token = createToken({ email: user.email, id: user.id });
  res.json({ ...user, token });
};

const profile = async (req: Request, res: Response) => {
  const user = { ...req.user, password: null };
  return res.json(user);
};

export { login, profile };
