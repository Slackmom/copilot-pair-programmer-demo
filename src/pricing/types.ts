export type Currency = "EUR" | "USD";

export type PriceInput = {
  unitPriceCents: number;
  quantity: number;
  couponCode?: string;
  country: "DE" | "US";
  taxIncluded: boolean;
  currency: Currency;
};

export type PriceResult = {
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  appliedCoupon?: string;
};
