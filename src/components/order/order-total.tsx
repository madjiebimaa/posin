import { Separator } from "@/components/ui/separator";

import { Cart } from "@/lib/types";
import { rupiah } from "@/lib/utils";

interface OrderTotalProps {
  cart: Cart;
}

export default function OrderTotal({ cart }: OrderTotalProps) {
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
          <p className="font-normal text-muted-foreground">Subtotal</p>
          <p className="font-bold">{rupiah(subtotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-normal text-muted-foreground">Tax 10%</p>
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
