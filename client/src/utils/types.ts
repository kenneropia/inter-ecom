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
