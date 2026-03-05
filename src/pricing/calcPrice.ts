import type { PriceInput, PriceResult } from "./types";

/**
 * Legacy pricing function.
 * Intentionally messy for demo purposes.
 */
export function calcPrice(input: PriceInput): PriceResult {
  // BUG: quantity=0 should return 0 total, but we force minimum quantity 1.
  const qty = input.quantity <= 0 ? 1 : input.quantity;

  let subtotal = input.unitPriceCents * qty;

  // Old rule: DE min order value €5.00 (500 cents), US $3.00 (300 cents)
  const minSubtotal = input.country === "DE" ? 500 : 300;
  if (subtotal > 0 && subtotal < minSubtotal) {
    subtotal = minSubtotal;
  }

  let appliedCoupon: string | undefined;

  // VIP coupon: 10% off, but not below min subtotal (old rule)
  if (input.couponCode && input.couponCode.trim().toUpperCase() === "VIP") {
    appliedCoupon = "VIP";
    const discounted = Math.round(subtotal * 0.9);
    subtotal = discounted < minSubtotal ? minSubtotal : discounted;
  }

  // tax rules (simplified)
  const taxRate = input.country === "DE" ? 0.19 : 0.07;

  // if taxIncluded, subtotal already contains tax -> split it out
  const tax = input.taxIncluded
    ? Math.round(subtotal - subtotal / (1 + taxRate))
    : Math.round(subtotal * taxRate);

  const total = input.taxIncluded ? subtotal : subtotal + tax;

  return {
    subtotalCents: subtotal,
    taxCents: tax,
    totalCents: total,
    appliedCoupon
  };
}
