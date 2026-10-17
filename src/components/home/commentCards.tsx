import { userComment } from "../types/comment";

export default function CommentCards({
  userComment,
}: {
  userComment: userComment;
}) {
  return (
    <div>
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">★★★★★</span>
        </div>

        <div className="mb-3 flex items-center gap-2">
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
      </div>
    </div>
  );
}
