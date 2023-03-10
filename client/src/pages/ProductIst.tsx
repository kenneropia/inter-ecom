import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import API from "../api";
import { ProductList } from "../utils/types";

export const ProductsLst: React.FC<{}> = ({}) => {
  const [products, setProducts] = useState<ProductList>([]);
  const fetchProduct = async () => {
    const { data }: AxiosResponse<{ products: ProductList }> = await API.get(
      "/products"
    );

    setProducts(data.products);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCart = async (id: string) => {
    try {
      const { data }: AxiosResponse<{ products: ProductList }> = await API.post(
        `/cart/addCartItem/${id}`
      );

      toast.success("product has been added to cart");
    } catch (err) {
      console.error(err);

      toast.error("error, please try again");
    }
  };
  if (!products.length) {
    return <div>loading</div>;
  }

  return (
    <div className="flex m-auto  flex-wrap w-full h-full  my-4 space-y-2">
      {products.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center flex-col md:w-3/12 w-full h-full"
          >
            <div className="w-5/6 h-60 md:h-40">
              <img className="w-full h-full" src={item.imageUrl} alt="" />
            </div>
            <span>{item.name}</span>
            <span>${item.price}</span>
            <span> quantity left {item.quantityLeft}</span>
            <button
              onClick={async () => {
                await handleCart(item.id);
              }}
              className="bg-blue-700 text-white py-2 px-4 rounded-md text-md"
            >
              Add to Cart
            </button>
          </div>
        );
      })}
      <div></div>
    </div>
  );
};
