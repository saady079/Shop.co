"use client";

import { useState } from "react";
import Button from "../constant/button";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center gap-3 py-5 lg:gap-5 lg:py-6">
      <div className="flex shrink-0 items-center justify-between gap-3 rounded-full bg-[#F0F0F0] px-4 py-3 sm:gap-5 sm:px-5">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={decrease}
          className="text-xl font-bold leading-none"
        >
          −
        </button>
        <span className="min-w-5 text-center text-sm sm:text-base">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={increase}
          className="text-xl font-bold leading-none"
        >
          +
        </button>
      </div>

      <Button
        variant="dark"
        className="min-w-0 flex-1 px-4! whitespace-nowrap sm:w-auto! sm:px-8!"
      >
        Add to Cart
      </Button>
    </div>
  );
}