import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../api";
import { IOrderList } from "../utils/types";

export const OrderList: React.FC<{}> = ({}) => {
  const [orders, setOrders] = useState<IOrderList>([]);

  const fetchProduct = async () => {
    const { data }: AxiosResponse<{ orders: IOrderList }> = await API.get(
      "/orders"
    );

    console.log(data);
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!orders.length) {
    return <div>loading</div>;
  }

  return (
    <div className="flex flex-wrap w-full h-full m-auto my-4 space-y-2 overflow-x-auto">
      <table className="w-full space-x-2 table-auto">
        <thead>
          <tr>
            <th className="p-2 text-left">Order ID</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Cart Items Count</th>
            <th className="p-2 text-left">Successful</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2">{order.id}</td>
              <td className="p-2">₦{order.price}</td>
              <td className="p-2">{order._count.cartItems}</td>
              <td
                className={`p-2 ${
                  order.successful ? "text-black" : "text-red-500"
                } `}
              >
                {order.successful ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
