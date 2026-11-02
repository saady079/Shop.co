"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../../types/product";
import { useCart } from "@/src/context/CartContext";

const SIZES = ["Small", "Medium", "Large", "X-Large"];
const COLORS = [
  { name: "Green", hex: "#4F4631" },
  { name: "Blue", hex: "#314F4A" },
  { name: "Navy", hex: "#31344F" },
];

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  const [size, setSize] = useState("Large");
  const [color, setColor] = useState(COLORS[0].name);
  const [quantity, setQuantity] = useState(1);

  const finalPrice = Number(
    (product.price * (1 - product.discountPercentage / 100)).toFixed(2),
  );

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: finalPrice,
      originalPrice: product.price,
      size,
      color,
      quantity,
    });
    router.push("/cart");
  };

  return (
    <div className="w-full min-w-0">
      {/* رنگ‌ها */}
      <div className="mt-5 sm:mt-6">
        <p className="mb-3 text-sm text-black/60 sm:text-base">Select Colors</p>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              aria-pressed={color === c.name}
              style={{ backgroundColor: c.hex }}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm text-white sm:h-9 sm:w-9 ${
                color === c.name ? "ring-2 ring-black ring-offset-2" : ""
              }`}
            >
              {color === c.name ? "✓" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* سایزها: موبایل گرید ۲ ستونه | sm به بالا ردیف‌های wrap */}
      <div className="mt-5 border-b border-black/10 pb-5 sm:mt-6 sm:pb-6">
        <p className="mb-3 text-sm text-black/60 sm:text-base">Choose Size</p>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`rounded-full px-4 py-2.5 text-sm sm:px-5 sm:py-2 ${
                size === s
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* تعداد + افزودن به سبد */}
      <div className="mt-5 flex items-stretch gap-3 sm:mt-6 sm:gap-4">
        <div className="flex shrink-0 items-center gap-4 rounded-full bg-[#F0F0F0] px-4 py-3 sm:gap-5 sm:px-5">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-lg leading-none"
          >
            −
          </button>
          <span className="w-4 text-center text-sm">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => q + 1)}
            className="text-lg leading-none"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="min-w-0 flex-1 rounded-full bg-black py-3 text-sm text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
