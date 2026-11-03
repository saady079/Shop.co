import { Review } from "../../types/product";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const fullStars = Math.round(review.rating);

  const date = new Date(review.date);
  const formattedDate = Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <article className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-black/10 p-4 sm:p-6 lg:rounded-[20px]">
      <div
        className="flex items-center gap-0.5 text-base sm:gap-1 sm:text-lg"
        aria-label={`${fullStars} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={index < fullStars ? "text-yellow-500" : "text-black/20"}
          >
            ★
          </span>
        ))}
      </div>

      <div className="mt-2 flex min-w-0 items-center gap-2 sm:mt-3">
        <h4 className="truncate text-base font-bold sm:text-lg">
          {review.reviewerName}
        </h4>
        <span className="shrink-0 text-sm text-green-500" aria-label="Verified">
          ✔
        </span>
      </div>

      <p className="mt-2 wrap-break-words text-sm leading-relaxed text-black/60 sm:text-base">
        {review.comment}
      </p>

      {formattedDate && (
        <p className="mt-3 text-xs text-black/40 sm:mt-4 sm:text-sm">
          Posted on {formattedDate}
        </p>
      )}
    </article>
  );
}
