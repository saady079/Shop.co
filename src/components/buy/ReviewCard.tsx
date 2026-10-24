import { Review } from "../types/product";

type ReviewCardProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewCardProps) {
  const fullStars = Math.round(review.rating);
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border border-black/10 rounded-2xl p-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={index < fullStars ? "text-yellow-500" : "text-black/20"}
          >
            ★
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <h4 className="font-bold">{review.reviewerName}</h4>
        <span className="text-green-500 text-sm">✔</span>
      </div>

      <p className="text-black/60 mt-2">{review.comment}</p>

      <p className="text-black/40 text-sm mt-4">Posted on {formattedDate}</p>
    </div>
  );
}

export default ReviewCard;
