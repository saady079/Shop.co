"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [broken, setBroken] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);

  const validImages = (images ?? []).filter((img) => !broken.includes(img));

  const markBroken = (img: string) =>
    setBroken((prev) => (prev.includes(img) ? prev : [...prev, img]));

  if (!validImages.length) return null;

  const activeIndex = Math.min(selected, validImages.length - 1);
  const current = validImages[activeIndex];
  const thumbs = validImages.slice(0, 4);

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      {/* عکس بزرگ */}
      <div className="relative aspect-square w-full min-w-0 overflow-hidden rounded-2xl bg-[#F0EEED] lg:flex-1 lg:rounded-[20px]">
        <Image
          key={current}
          src={current}
          alt="product"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized
          onError={() => markBroken(current)}
          className="object-contain"
        />
      </div>

      {/* تامبنیل‌ها: موبایل ردیفی زیر عکس | دسکتاپ ستونی سمت چپ */}
      <div className="grid grid-cols-4 gap-2 lg:flex lg:w-36 lg:shrink-0 lg:flex-col lg:gap-3.5">
        {thumbs.map((img, index) => (
          <button
            key={img}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`Show image ${index + 1}`}
            className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 bg-[#F0EEED] lg:rounded-[20px] ${
              activeIndex === index ? "border-black" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`thumbnail-${index + 1}`}
              fill
              sizes="(max-width: 1024px) 25vw, 144px"
              unoptimized
              onError={() => markBroken(img)}
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}