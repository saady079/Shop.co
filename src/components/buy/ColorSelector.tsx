"use client";
import { useState } from "react";

const colors = [
  { name: "gray", value: "#6B7280" },
  { name: "teal", value: "#2C4A52" },
  { name: "blue", value: "#2B4C8C" },
];

export default function ColorSelector() {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  return (
    <div>
      <p className="text-black/60 mb-3">Select Colors</p>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color.value }}
          >
            {selectedColor === color.name && (
              <span className="text-white text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}