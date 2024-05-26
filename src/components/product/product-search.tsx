"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useQuery from "@/hooks/use-query";

export default function ProductSearch() {
  const [query, setQuery] = useQuery("query", "");

  return (
    <div className="relative">
      <Label htmlFor="product-search" className="absolute left-3 top-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
      </Label>
      <Input
        id="product-search"
        type="search"
        autoComplete="off"
        placeholder="Search"
        className="border-none pl-10 shadow-sm"
        defaultValue={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}
