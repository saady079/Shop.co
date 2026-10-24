"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "../types/product";


export default function ProductGallery({ pro }: {pro:Product}) {
  const [selectedImage, setSelectedImage] = useState(pro.images[0]);

  return (
    <div className="flex gap-4">
      {/* تامبنیل‌های کوچیک */}
      <div className="flex flex-col gap-3">
        {pro.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative size-17 rounded-xl overflow-hidden bg-[#F0EEED] border-2 ${
              selectedImage === img ? "border-black" : "border-transparent"
            }`}
          >
            <Image src={img} alt={`thumbnail-${index}`} className="object-cover " width={152} height={167} />
          </button>
        ))}
      </div>

      {/* عکس بزرگ */}
      <div className="relative flex-1 aspect-square bg-[#F0EEED] rounded-2xl overflow-hidden">
        <Image src={selectedImage} alt={pro.title} className="object-cover" width={444} height={530} />
      </div>
    </div>
  );
}