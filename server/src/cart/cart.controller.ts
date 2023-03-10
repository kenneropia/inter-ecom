import { Request, Response } from "express";
import db from "src/db";

const getAllCartItems = async (req: Request, res: Response) => {
  const cart = await db.cartItem.findMany({
    where: { creatorId: req.user?.id },
    include: { product: true },
  });
  return res.json({ cart });
};

const addItemToCart = async (req: Request, res: Response) => {
  const cartItem = await db.cartItem.create({
    data: {
      creatorId: req.user.id,
      productId: req.params.productId,
    },
  });

  return res.json({ cartItem });
};

const removeItemFromCart = async (req: Request, res: Response) => {
  {
    const cartItem = await db.cartItem.findFirst({
      where: {
        creatorId: req.user.id,
        id: req.params.cartItemId,
        orderId: null,
      },
    });
    if (!cartItem) {
      return res.status(404).json({
        code: "BAD_REQUEST",
        message: "unsuccessful cart remove",
      });
    }
    res.json({
      cartItem: await db.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      }),
    });
  }
};
export { addItemToCart, removeItemFromCart, getAllCartItems };
