"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import OrderSummary from "./OrderSummary";

function CartContent() {
  const { items, loaded, removeItem, changeQuantity } = useCart();

  if (!loaded) {
    return <div className="mt-6 h-40 animate-pulse rounded-2xl bg-black/5" />;
  }

  if (!items.length) {
    return (
      <div className="mt-10 text-black/60">
        Your cart is empty.{" "}
        <Link href="/shop/category/all" className="text-black underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 grid w-full grid-cols-1 items-start gap-4 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_505px]">
      {/* لیست محصولات */}
      <div className="min-w-0 rounded-2xl border border-black/10 px-3 sm:px-5 lg:rounded-[20px]">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className={`flex gap-3 py-4 sm:gap-4 sm:py-5 ${
              index !== items.length - 1 ? "border-b border-black/10" : ""
            }`}
          >
            {/* عکس */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F0EEED] sm:h-28 sm:w-28">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                unoptimized
                className="object-contain"
              />
            </div>

            {/* اطلاعات */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs text-black/60 sm:text-sm">
                    Size: <span className="text-black/50">{item.size}</span>
                  </p>
                  <p className="text-xs text-black/60 sm:text-sm">
                    Color: <span className="text-black/50">{item.color}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size, item.color)}
                  aria-label="Remove item"
                  className="shrink-0 text-red-500"
                >
                  🗑
                </button>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold sm:text-2xl">
                  ${item.price}
                </span>

                <div className="flex items-center gap-3 rounded-full bg-[#F0F0F0] px-3 py-1.5 sm:gap-4 sm:px-4 sm:py-2">
                  <button
                    type="button"
                    onClick={() =>
                      changeQuantity(item.id, item.size, item.color, -1)
                    }
                    aria-label="Decrease"
                    className="text-lg leading-none sm:text-xl"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      changeQuantity(item.id, item.size, item.color, 1)
                    }
                    aria-label="Increase"
                    className="text-lg leading-none sm:text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* خلاصه‌ی سفارش */}
      <div className="min-w-0">
        <OrderSummary items={items} />
      </div>
    </div>
  );
}

export default CartContent;