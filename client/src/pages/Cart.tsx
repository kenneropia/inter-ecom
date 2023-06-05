import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { CartList } from "../utils/types";
import toast from "react-hot-toast";
import CartSummary from "../components/CartSummary";

const Cart: React.FunctionComponent = (props) => {
  const [cart, setCart] = useState<CartList>([]);
  const fetchCart = async () => {
    const { data }: AxiosResponse<{ cart: CartList }> = await API.get("/cart");
    setCart(data.cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItemFromCart = async (id: string) => {
    console.log(cart.filter((item) => item.id !== id));
    try {
      await API.delete(`/cart/deleteCartItem/${id}`);
      toast.success("product has been removed from cart");
      setCart(cart.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
      toast.error("error, please try again");
    }
  };

  if (!cart.length) {
    return (
      <div>
        Empty, <Link to={"/"}>Go shop</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-x-2 ">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse divide-y divide-gray-200 table-auto ">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Price
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map(({ product, id }) => (
              <tr key={id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={product.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₦{product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={async () => await removeItemFromCart(id)}
                    className="px-2 py-1 text-sm text-white bg-blue-700 rounded-md"
                  >
                    delete item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full sm:w-4/12 ">
        <CartSummary cartItems={cart} />
      </div>
    </div>
  );
};

export default Cart;
