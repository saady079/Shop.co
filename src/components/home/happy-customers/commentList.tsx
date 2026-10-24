"use client";
import { useState } from "react";
import CommentCards from "./commentCards";
import { userComment } from "../../types/comment";

export default function CommentList({ comments }: { comments: userComment[] }) {
  const [current, setCurrent] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const motion = (direction: number) => {
    setCurrent((current) => (current + direction + totalPages) % totalPages);
  };

  const visibleComments = comments.slice(
    current * itemsPerPage,
    current * itemsPerPage + itemsPerPage,
  );

  const previous =
    comments[(current * itemsPerPage - 1 + comments.length) % comments.length];
  const next =
    comments[(current * itemsPerPage + itemsPerPage) % comments.length];

  function flashBtn() {
    return "font-semibold bg-gray-200 rounded-full size-8";
  }

  return (
    <section className="py-16 overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-integ text-2xl md:text-3xl font-extrabold">
          Our Happy Customers
        </h1>

        <div className="flex gap-3 text-xl">
          <button
            onClick={() => motion(-1)}
            aria-label="previous"
            className={flashBtn()}
          >
            ←
          </button>
          <button
            onClick={() => motion(1)}
            aria-label="next"
            className={flashBtn()}
          >
            →
          </button>
        </div>
      </div>

      <div className="flex justify-between md:h-40 gap-4">
        {/* Previous blurred comment */}
        <div className="w-[10%] shrink-0 overflow-hidden">
          <div className="h-full w-70 origin-left scale-100 blur-[3px] opacity-40">
            <CommentCards userComment={previous} />
          </div>
        </div>
        {/* Main comments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0 flex-1">
          {visibleComments.map((comment) => (
            <CommentCards key={comment.id} userComment={comment} />
          ))}
        </div>
        {/* Next blurred comment */}
        <div className="w-[10%] shrink-0 overflow-hidden">
          <div className="h-full w-70 blur-[3px] opacity-40">
            <CommentCards userComment={next} />
          </div>
        </div>
      </div>
    </section>
  );
}
