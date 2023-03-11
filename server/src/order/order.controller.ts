import { Request, Response } from "express";
import db from "src/db";
const secret = process.env.PAYSTACK_PUBLIC_KEY;

const createOrder = async (req: Request, res: Response) => {


  try {
    const cartItems = await db.cartItem.findMany({
      where: { orderId: null, creatorId: req.body.data.metadata.creatorId },
      include: { product: true },
    });
    const price = cartItems.reduce(
      (accu, curr) => accu + (curr.product?.price || 0),
      0
    );
    console.log(price);

    const transactionResult = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          price,
          cartItems: {
            connect: cartItems.map((item) => {
              return { id: item.id };
            }),
          },
          creator: {
            connect: {
              id: req.body.data.metadata.creatorId,
            },
          },
        },
      });

      await tx.cartItem.updateMany({
        where: { orderId: null },
        data: { orderId: order.id },
      });
      return order;
    });
    console.log(transactionResult);
    return res.json({ transactionResult });
  } catch (err) {
    console.log(err);

    res.status(500);
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const orders = await db.cartItem.findMany({
    where: {
      creatorId: req.user.id,
      AND: {
        NOT: {
          orderId: null,
        },
      },
    },
  });

  return res.json({ orders });
};

export { getAllOrder, createOrder };
