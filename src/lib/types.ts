import { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: Category["id"];
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon;
};

export type CartItem = {
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = CartItem[];

export type Customer = {
  id: string;
  name: string;
  address: string;
};

export type Order = {
  id: string;
  customer: Customer | null;
  cart: Cart;
  createdAt: Date;
  updatedAt: Date;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type AddOrderArgs = Omit<Order, "id" | "createdAt" | "updatedAt">;
