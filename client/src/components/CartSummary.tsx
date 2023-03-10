import { CartList } from "../utils/types";
import AcceptPayment from "./AcceptPayment";

function CartSummary(props: { cartItems: CartList }) {
  const { cartItems } = props;

  const totalItems = cartItems.reduce((acc, item) => acc + 1, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price,
    0
  );

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <span className=" text-md">Cart Summary</span>
      <div className="flex flex-col justify-between mb-2">
        <span className="text-md">{totalItems} item(s)</span>
        <span className="text-gray-500 text-md">
          Total Price: ${totalPrice}
        </span>
      </div>
      <AcceptPayment amount={totalPrice} />
    </div>
  );
}

export default CartSummary;
