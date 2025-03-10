import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind sınıflarını birleştirmek için yardımcı fonksiyon
 * clsx ve tailwind-merge kullanarak sınıfları birleştirir
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 