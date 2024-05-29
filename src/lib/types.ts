import { LucideIcon } from "lucide-react";

export type CategoryName =
  | "Flooring Materials"
  | "Fasteners and Hardware"
  | "Electrical Supplies"
  | "Concrete and Masonry"
  | "Painting Supplies"
  | "Plumbing Materials";

export type Category = {
  id: string;
  name: CategoryName;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: Category["id"];
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
};

export type PaymentMethod = "CASH" | "DEBIT_CARD" | "E-WALLET";
export type PaymentMethodOption = {
  id: PaymentMethod;
  label: string;
  icon: LucideIcon;
};

export type ShippingTransportation =
  | "MOTOR_CYCLE"
  | "SMALL_TRUCK"
  | "MEDIUM_TRUCK"
  | "LARGE_TRUCK";
export type Shipping = {
  address: string | null;
  transportation: ShippingTransportation;
};

export type TransportationOption = {
  id: ShippingTransportation;
  label: string;
  icon: LucideIcon;
};

export type Order = {
  id: string;
  customer: Customer | null;
  cart: Cart;
  paymentMethod: PaymentMethod;
  shipping: Shipping | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type TailwindColor = {
  text: string;
  background: string;
  border: string;
};

export type AddOrderArgs = Omit<
  Order,
  "id" | "shipping" | "paymentMethod" | "createdAt" | "updatedAt"
>;
