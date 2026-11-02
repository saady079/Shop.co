"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="flex items-center gap-1">
      Sort by:
      <select
        value={searchParams.get("sort") ?? "popular"}
        onChange={(e) => onChange(e.target.value)}
        className="font-medium text-black bg-transparent outline-none"
      >
        <option value="popular">Most Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </label>
  );
}

export default SortSelect;