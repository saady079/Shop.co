"use client";
import { useState } from "react";
import CommentCards from "./commentCards";
import { userComment } from "../types/comment";


export default function CommentList({ comments }: {comments:userComment[]}) {
  const [current, setCurrent] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const handleNext = () => {
    if (current === totalPages - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current === 0) {
      setCurrent(totalPages - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const visibleComments = comments.slice(
    current * itemsPerPage,
    current * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-16 m-auto w-[85%]">      
      <div className="flex items-center justify-between">
        <h1 className="font-integ text-2xl md:text-3xl font-extrabold">Our Happy Customers</h1>

        <div className="flex gap-3 text-xl">
          <button onClick={handlePrev} aria-label="previous">
            ←
          </button>
          <button onClick={handleNext} aria-label="next">
            →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {visibleComments.map((comment) => (
          <CommentCards key={comment.id} userComment={comment} />
        ))}
      </div>
    </section>
  );
}
