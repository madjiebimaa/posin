import { clsx, type ClassValue } from "clsx";
import {
  Bolt,
  Cuboid,
  Droplet,
  InspectionPanel,
  LucideIcon,
  PaintRoller,
  Star,
  Zap,
} from "lucide-react";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

import { RGB } from "@/lib/types";

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

export function getCategoryIcon(name: string): LucideIcon {
  switch (name) {
    case "InspectionPanel":
      return InspectionPanel;
    case "Bolt":
      return Bolt;
    case "Zap":
      return Zap;
    case "Cuboid":
      return Cuboid;
    case "PaintRoller":
      return PaintRoller;
    case "Droplet":
      return Droplet;
    default:
      return Star;
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

function formatHexValue(value: number): string {
  return value.toString(16).padStart(2, "0");
}

export function lightenColor(hex: string, percent: number): string {
  const formattedHex = hex.length === 3 ? convert3To6DigitsHex(hex) : hex;
  const { r, g, b } = extractRgbFromHex(formattedHex);

  return `#${formatHexValue(lightenHex(r, percent))}${formatHexValue(lightenHex(g, percent))}${formatHexValue(lightenHex(b, percent))}`;
}
