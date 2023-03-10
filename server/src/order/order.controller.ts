import crypto from "crypto";
import { Request, Response } from "express";
import db from "src/db";
const secret = process.env.PAYSTACK_PUBLIC_KEY;

const createOrder = async (req: Request, res: Response) => {
  console.log(req.body.data.metadata);
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  try {
    const eventBody: {
      creatorId: string;
    } = req.body.data.metadata;

    if (
      hash == req.headers["x-paystack-signature"] &&
      req.body.event == "charge.success"
    ) {
      const cartItems = await db.cartItem.findMany({
        where: { orderId: null, creatorId: req.body.creatorId },
        include: { product: true },
      });
      const price = cartItems.reduce(
        (accu, curr) => accu + (curr.product?.price || 0),
        0
      );

      const transactionResult = await db.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            price,
            cartItems: { create: { ...cartItems } },
            creatorId: eventBody.creatorId,
          },
        });

        await tx.cartItem.updateMany({
          where: { orderId: null },
          data: { orderId: order.id },
        });
        return order;
      });
      return res.json({ transactionResult });
    }
  } catch (err) {
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
