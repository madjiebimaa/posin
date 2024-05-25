import { Separator } from "@/components/ui/separator";

import { CartItem } from "@/lib/types";
import { rupiah } from "@/lib/utils";

interface CartTotalProps {
  cart: CartItem[];
}

export default function CartTotal({ cart }: CartTotalProps) {
  const subtotal = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  const tax = (subtotal * 10) / 100;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-normal">Subtotal</p>
          <p className="font-bold">{rupiah(subtotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-normal">Tax 10%</p>
          <p className="font-bold">{rupiah(tax)}</p>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-lg font-normal">Total</p>
        <p className="text-lg font-black">{rupiah(total)}</p>
      </div>
    </div>
  );
}
