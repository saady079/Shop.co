"use client";

import { useState } from "react";

type Color = {
  name: string;
  value: string;
};

const colors: Color[] = [
  { name: "olive", value: "#4F4631" },
  { name: "green", value: "#314F4A" },
  { name: "navy", value: "#31344F" },
];

export default function ColorSelector() {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  return (
    <div className="border-b border-black/10 py-5 lg:py-6">
      <p className="mb-3 text-sm text-black/60 lg:mb-4 lg:text-base">
        Select Colors
      </p>
      <div className="flex flex-wrap gap-3 lg:gap-4">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            aria-label={color.name}
            aria-pressed={selectedColor === color.name}
            onClick={() => setSelectedColor(color.name)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 lg:h-10 lg:w-10"
            style={{ backgroundColor: color.value }}
          >
            {selectedColor === color.name && (
              <span className="text-sm text-white">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}