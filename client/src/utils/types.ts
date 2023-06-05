export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantityLeft: number;
}

export type ProductList = Product[];

export interface CartItem {
  id: string;
  product: Product;
}

export type CartList = CartItem[];
export interface IOrder {
  id: string;
  price: number;
  quantityLeft: number;
  _count: {
    cartItems: number;
  };
  successful: boolean;
}

export type IOrderList = IOrder[];
