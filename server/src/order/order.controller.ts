import { Request, Response } from "express";
import db from "src/db";
const secret = process.env.PAYSTACK_PUBLIC_KEY;

const createOrder = async (req: Request, res: Response) => {
  try {
    if (req.body.event == "INVOICE.TRANSACTION_SUCCESSFUL") {
      const cartItems = await db.cartItem.findMany({
        where: { orderId: null, creatorId: req.body.data.metadata.creatorId },
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
            successful: true,
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
      return res.status(200).json({ transactionResult });
    } else if (req.body.event == "	INVOICE.TRANSACTION_FAILURE") {
      const cartItems = await db.cartItem.findMany({
        where: { orderId: null, creatorId: req.body.data.metadata.creatorId },
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
            successful: false,
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
      return res.status(200).json({ transactionResult });
    }
  } catch (err) {
    console.log(err);

    res.status(500);
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const orders = await db.order.findMany({
    where: {
      creatorId: req.user.id,
    },
    include: {
      _count: {
        select: {
          cartItems: true,
        },
      },
    },
  });
  console.log(req.user.id);
  // orders[0]._count.cartItems;
  // orders[0].creatorId;
  // orders[0].id;
  // orders[0].price;
  // orders[0].successful;

  console.log(orders);
  return res.json({ orders });
};

export { getAllOrder, createOrder };
