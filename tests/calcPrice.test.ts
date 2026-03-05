import { describe, expect, test } from "vitest";
import { calcPrice } from "../src/pricing/calcPrice";

describe("calcPrice (legacy)", () => {
  test("basic DE price without coupon", () => {
    const result = calcPrice({
      unitPriceCents: 1000,
      quantity: 1,
      country: "DE",
      taxIncluded: false,
      currency: "EUR"
    });

    expect(result.subtotalCents).toBe(1000);
    expect(result.totalCents).toBeGreaterThan(result.subtotalCents);
  });

  // Intentionally missing:
  // - quantity=0 should return 0 total (edge case)
  // - VIP coupon regression test
});
