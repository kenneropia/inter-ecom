import { Request, Response } from "express";
import { z } from "zod";
import db from "src/db";
// import { createProductSchema } from "./product.schema";

const getAProduct = async (req: Request, res: Response) => {
  const product = await db.product.findFirst({
    where: {
      id: req.params.productId,
    },
  });
  return res.json({ product: { ...product } });
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await db.product.findMany({});
  return res.json({ products });
};

// const updateproduct = async (
//   req: Request<any, any, z.infer<typeof updateProductSchema>>,
//   res: Response
// ) => {
//   const product = await db.product.update({
//     where: {
//       id: req.params.productId,
//     },
//     data: { ...req.body, userId: req.user!.id },
//   });

//   return res.json({ product });
// };

// const deleteproduct = async (req: Request, res: Response) => {
//   try {
//     await db.product.findUniqueOrThrow({ where: { id: req.params.productId } });
//   } catch (err) {
//     return res.status(404).json({ message: "not found" });
//   }

//   const product = await db.product.delete({
//     where: {
//       id: req.params.productId,
//     },
//   });

//   return res.json({ product });
// };

export { getAllProducts, getAProduct };
