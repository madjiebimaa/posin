import { clsx, type ClassValue } from "clsx";
import {
  Axe,
  Blend,
  Bolt,
  Cuboid,
  Droplet,
  InspectionPanel,
  LucideIcon,
  PaintRoller,
  Zap,
} from "lucide-react";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

import { Category, Product, RGB, TailwindColor } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rupiah(value: number) {
  const formatted = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

  return formatted.replace(/,00$/, "");
}

export function nanoid(size: number = 10) {
  return customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-", size)();
}

export function getCategoryAttributes(name: Category["name"]): {
  icon: LucideIcon;
  color: TailwindColor;
} {
  switch (name) {
    case "Flooring Materials":
      return {
        icon: InspectionPanel,
        color: {
          text: "text-purple-400",
          background: "bg-purple-400",
          border: "border-purple-400",
          fill: "fill-purple-400",
        },
      };
    case "Fasteners and Hardware":
      return {
        icon: Bolt,
        color: {
          text: "text-emerald-400",
          background: "bg-emerald-400",
          border: "border-emerald-400",
          fill: "fill-emerald-400",
        },
      };
    case "Electrical Supplies":
      return {
        icon: Zap,
        color: {
          text: "text-amber-400",
          background: "bg-amber-400",
          border: "border-amber-400",
          fill: "fill-amber-400",
        },
      };
    case "Concrete and Masonry":
      return {
        icon: Cuboid,
        color: {
          text: "text-orange-400",
          background: "bg-orange-400",
          border: "border-orange-400",
          fill: "fill-orange-400",
        },
      };
    case "Painting Supplies":
      return {
        icon: PaintRoller,
        color: {
          text: "text-rose-400",
          background: "bg-rose-400",
          border: "border-rose-400",
          fill: "fill-rose-400",
        },
      };
    case "Plumbing Materials":
      return {
        icon: Droplet,
        color: {
          text: "text-sky-400",
          background: "bg-sky-400",
          border: "border-sky-400",
          fill: "fill-sky-400",
        },
      };
    case "Construction Tools":
      return {
        icon: Axe,
        color: {
          text: "text-fuchsia-400",
          background: "bg-fuchsia-400",
          border: "border-fuchsia-400",
          fill: "fill-fuchsia-400",
        },
      };
    case "Adhesives":
      return {
        icon: Blend,
        color: {
          text: "text-indigo-400",
          background: "bg-indigo-400",
          border: "border-indigo-400",
          fill: "fill-indigo-400",
        },
      };
  }
}

function convert3To6DigitsHex(hex: string): string {
  return (
    "#" +
    hex
      .slice(1)
      .split("")
      .map((value) => value + value)
      .join("")
  );
}

function extractRgbFromHex(hex: string): RGB {
  const removedHashHex = hex.slice(1);

  const r = parseInt(removedHashHex.slice(0, 2), 16);
  const g = parseInt(removedHashHex.slice(2, 4), 16);
  const b = parseInt(removedHashHex.slice(4, 6), 16);

  return { r, g, b };
}

function lightenHex(value: number, percent: number): number {
  return Math.min(255, Math.floor(value + (255 - value) * (percent / 100)));
}

function darkenHex(value: number, percent: number): number {
  return Math.max(0, Math.floor(value * (1 - percent / 100)));
}

function formatHexValue(value: number): string {
  return value.toString(16).padStart(2, "0");
}

export function lightenColor(hex: string, percent: number): string {
  const formattedHex = hex.length === 3 ? convert3To6DigitsHex(hex) : hex;
  const { r, g, b } = extractRgbFromHex(formattedHex);

  return `#${formatHexValue(lightenHex(r, percent))}${formatHexValue(lightenHex(g, percent))}${formatHexValue(lightenHex(b, percent))}`;
}

export function darkenColor(hex: string, percent: number): string {
  const formattedHex = hex.length === 3 ? convert3To6DigitsHex(hex) : hex;
  const { r, g, b } = extractRgbFromHex(formattedHex);

  return `#${formatHexValue(darkenHex(r, percent))}${formatHexValue(darkenHex(g, percent))}${formatHexValue(darkenHex(b, percent))}`;
}

export function applyProductsFilter(
  products: Product[],
  { query, categoryId }: { query: string; categoryId: Category["id"] },
): Product[] {
  let filteredProducts = [...products];

  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryId === categoryId,
    );
  }

  return filteredProducts;
}
