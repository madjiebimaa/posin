import { CircleDollarSign, CreditCard, QrCode } from "lucide-react";

import PaymentMethodOption from "@/components/order/payment-method-option";

import { PaymentMethodOption as Option } from "@/lib/types";

const options: Option[] = [
  { id: "CASH", label: "Cash", icon: CircleDollarSign },
  { id: "DEBIT_CARD", label: "Debit Card", icon: CreditCard },
  { id: "E-WALLET", label: "E-Wallet", icon: QrCode },
];

export default function PaymentMethodOptionList() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-normal text-muted-foreground">Payment Method</p>
      <section className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <PaymentMethodOption key={option.id} option={option} />
        ))}
      </section>
    </div>
  );
}
