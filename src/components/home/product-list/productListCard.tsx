import Image from "next/image";
import { Product } from "../../types/product";
import Link from "next/link";

export default function ProductListCard({ pro }: { pro: Product }) {
  const hasDiscount = pro.discountPercentage > 0;
  const oldPrice = hasDiscount
    ? pro.price / (1 - pro.discountPercentage / 100)
    : null;
  return (
    <article
      key={pro.id}
      className="boxUI relative group flex h-full min-w-0 flex-col overflow-hidden shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="relative block w-full aspect-square overflow-hidden">
        <Link href={`/shop/${pro.id}`}>
          <Image
            src={pro.thumbnail}
            alt={pro.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain object-top hover:scale-104 transition-transform duration-200"
          />
        </Link>
      </div>
      <div className="boxUI belowCard flex flex-1 flex-col gap-1 bg-[#979696]/15 p-2 sm:p-3">
        <h3 className="font-semibold text-sm tracking-tight">{pro.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs sm:text-sm">
          <span className="text-yellow-500">★</span>
          <span className="text-black/80">{pro.rating} | 5</span>
        </div>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-base font-extrabold sm:text-lg mt-1">${pro.price}</p>
          <p className="text-sm font-extrabold line-through opacity-50 sm:text-base">
            ${oldPrice?.toFixed()}
          </p>
          <p className="bg-rose-200 text-rose-950 text-xs px-1.5 py-0.5 rounded-full">
            {pro.discountPercentage.toFixed()}%
          </p>
        </div>
      </div>
    </article>
  );
}
