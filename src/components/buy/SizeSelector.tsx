"use client";
import { useState } from "react";

const sizes = ["Small", "Medium", "Large", "X-Large"];

function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState("Large");

  return (
    <div>
      <p className="text-black/60 mb-3">Choose Size</p>
      <div className="flex gap-3 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-gray-100 text-black/60"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeSelector;