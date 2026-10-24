"use client";

import React, { useState } from "react";
import Button from "../constant/button";

function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center gap-4 mt-6">
      <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-3">
        <button onClick={decrease} className="text-lg font-bold">
          −
        </button>
        <span className="w-4 text-center">{quantity}</span>
        <button onClick={increase} className="text-lg font-bold">
          +
        </button>
      </div>

      <Button variant="dark" className="flex-1">
        Add to Cart
      </Button>
    </div>
  );
}

export default AddToCart;
