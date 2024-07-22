import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPayload = (payload: Uint8Array): string => {
  return Array.from(payload)
    .map((byte) => `\\x${byte.toString(16).padStart(2, "0")}`)
    .join(" ");
};
