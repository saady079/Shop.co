"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = { currentPage: number; totalPages: number };

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");

  pages.push(total);
  return pages;
}

function Pagination({ currentPage, totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  

  const href = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between mt-10 pt-5 border-t border-black/10 mb-20">
      <Link
        href={href(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`flex items-center gap-2 border border-black/10 rounded-lg px-4 py-2 text-sm ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <span aria-hidden>←</span> Previous
      </Link>

      <div className="hidden sm:flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="w-10 text-center text-black/40">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={href(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm ${
                p === currentPage
                  ? "bg-black/5 font-medium text-black"
                  : "text-black/50 hover:bg-black/5"
              }`}
            >
              {p}
            </Link>
          )
        )}
      </div>

      <Link
        href={href(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`flex items-center gap-2 border border-black/10 rounded-lg px-4 py-2 text-sm ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Next <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default Pagination;