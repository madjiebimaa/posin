"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import AddCustomerButton from "@/components/order/add-customer-button";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { useCustomerActions, useCustomers } from "@/store/customer";

export default function CustomerCombobox() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const customers = useCustomers();
  const customerActions = useCustomerActions();

  const selectedCustomer = customers.find(
    (customer) => customer.name === name,
  )!;

  const handleSelect = (nextName: string) => {
    const nextCustomer = customers.find(
      (customer) => customer.name === nextName,
    )!;

    setName(nextName !== name ? nextName : "");
    customerActions.selectCustomer(nextCustomer);
    setOpen(false);
  };

  return (
    <section className="flex flex-col gap-2">
      <Label
        htmlFor="customer"
        className="text-base font-normal text-muted-foreground"
      >
        Customer
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[260px] justify-between"
          >
            {name ? selectedCustomer.name : "Select a customer..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0">
          <Command>
            <CommandInput placeholder="Search by customer name..." />
            <CommandEmpty className="p-4">
              <AddCustomerButton />
            </CommandEmpty>
            <CommandGroup>
              <CommandList className="overflow-hidden">
                <ScrollArea className="h-[220px]">
                  {customers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      value={customer.name}
                      className="cursor-pointer"
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 shrink-0 transition-opacity",
                          name === customer.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {customer.name}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </section>
  );
}
