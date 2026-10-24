"use client";

import { useState } from "react";
import { Review } from "../types/product";
import ReviewCard from "./ReviewCard";

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">
          All Reviews <span className="text-black/40">({reviews.length})</span>
        </h3>

        <div className="flex items-center gap-3">
          <button className="border border-black/10 rounded-full px-4 py-2 text-sm">
            ⇅
          </button>
          <button className="border border-black/10 rounded-full px-4 py-2 text-sm">
            Latest ▾
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {visibleReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="border border-black/10 rounded-full px-8 py-3 text-sm"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewsList;
