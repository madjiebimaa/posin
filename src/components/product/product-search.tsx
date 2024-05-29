"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useQuery from "@/hooks/use-query";
import { cn } from "@/lib/utils";

interface ProductSearchProps
  extends React.ComponentPropsWithoutRef<typeof Input> {}

export default function ProductSearch({
  className,
  ...props
}: ProductSearchProps) {
  const [query, setQuery] = useQuery("query", "");

  return (
    <div className="relative max-w-[300px]">
      <Label htmlFor="product-search" className="absolute left-3 top-3">
        <Search className="size-4 shrink-0 text-slate-500" />
      </Label>
      <Input
        id="product-search"
        type="search"
        autoComplete="off"
        placeholder="Search"
        className={cn("rounded-xl border-none bg-slate-100 pl-10", className)}
        defaultValue={query}
        onChange={(event) => setQuery(event.target.value)}
        {...props}
      />
    </div>
  );
}
