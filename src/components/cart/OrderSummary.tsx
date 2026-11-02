"use client";

import { useState } from "react";
import { CartItem } from "@/src/context/CartContext";

const DELIVERY_FEE = 15;
const PROMO_CODES: Record<string, number> = {
  SAVE10: 10, // درصد تخفیف اضافه
};

function OrderSummary({ items }: { items: CartItem[] }) {
  const [code, setCode] = useState("");
  const [promoPercent, setPromoPercent] = useState(0);
  const [message, setMessage] = useState("");

  const originalTotal = items.reduce(
    (s, i) => s + i.originalPrice * i.quantity,
    0
  );
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const productDiscount = originalTotal - subtotal;
  const promoDiscount = (subtotal * promoPercent) / 100;
  const total = subtotal - promoDiscount + DELIVERY_FEE;

  const discountPercent = originalTotal
    ? Math.round(((productDiscount + promoDiscount) / originalTotal) * 100)
    : 0;

  const applyPromo = () => {
    const percent = PROMO_CODES[code.trim().toUpperCase()];
    if (percent) {
      setPromoPercent(percent);
      setMessage("Promo code applied!");
    } else {
      setPromoPercent(0);
      setMessage("Invalid promo code");
    }
  };

  const fmt = (n: number) => `$${Math.round(n)}`;

  return (
    <aside className="w-full min-w-0 rounded-2xl border border-black/10 p-4 sm:p-6 lg:rounded-[20px]">
      <h2 className="text-lg font-bold sm:text-xl">Order Summary</h2>

      <div className="mt-4 flex flex-col gap-3 text-sm sm:mt-5 sm:gap-4 sm:text-base">
        <div className="flex items-center justify-between gap-3">
          <span className="text-black/60">Subtotal</span>
          <span className="font-bold">{fmt(originalTotal)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-black/60">Discount (-{discountPercent}%)</span>
          <span className="font-bold text-red-500">
            -{fmt(productDiscount + promoDiscount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-black/60">Delivery Fee</span>
          <span className="font-bold">{fmt(DELIVERY_FEE)}</span>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-3 text-base sm:pt-4 sm:text-lg">
          <span>Total</span>
          <span className="text-lg font-bold sm:text-xl">{fmt(total)}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2 sm:mt-5 sm:gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Add promo code"
          className="min-w-0 flex-1 rounded-full bg-[#F0F0F0] px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={applyPromo}
          className="shrink-0 rounded-full bg-black px-5 text-sm text-white sm:px-8"
        >
          Apply
        </button>
      </div>
      {message && <p className="mt-2 text-xs text-black/60">{message}</p>}

      <button className="mt-4 w-full rounded-full bg-black py-3.5 text-sm text-white sm:mt-5 sm:py-4">
        Go to Checkout →
      </button>
    </aside>
  );
}

export default OrderSummary;