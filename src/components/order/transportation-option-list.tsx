import { Bike, Bus, Car, Truck } from "lucide-react";

import TransportationOption from "@/components/order/transportation-option";

import { TransportationOption as Option } from "@/lib/types";

const options: Option[] = [
  { id: "SMALL_TRUCK", label: "S Truck", icon: Car },
  { id: "MEDIUM_TRUCK", label: "M Truck", icon: Bus },
  { id: "LARGE_TRUCK", label: "L Truck", icon: Truck },
  { id: "MOTOR_CYCLE", label: "M Cycle", icon: Bike },
];

export default function TransportationOptionList() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-normal text-slate-500">Transportation</p>
      <section className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <TransportationOption key={option.id} option={option} />
        ))}
      </section>
    </div>
  );
}
