import { userComment } from "../../types/comment";

export default function CommentCards({
  userComment,
}: {
  userComment: userComment;
}) {
  return (
    <article className="h-full bg-[#979696]/15 rounded-2xl p-4.5 sm:p-5.5">
      <div
        className="flex items-center gap-1 mb-2"
        aria-label="Illustrative five-star rating"
      >
        <span className="text-[#ffbf2f] text-[19px]" aria-hidden="true">
          ★★★★★
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <h4 className="font-bold">{userComment.user.fullName}</h4>
        <span
          title="Illustrative verification icon"
          className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#00b34a] text-xs font-bold text-white"
          aria-label="Illustrative verification icon"
        >
          ✓
        </span>
      </div>

      <p className="text-black/60 text-sm">{userComment.body}</p>
    </article>
  );
}
