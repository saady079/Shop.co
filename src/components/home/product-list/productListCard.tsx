import Image from "next/image";
import { Product } from "../../types/product";
import Link from "next/link";

export default function ProductListCard({ pro }: { pro: Product }) {
  const hasDiscount = pro.discountPercentage > 0;
  const oldPrice = hasDiscount
    ? pro.price / (1 - pro.discountPercentage / 100)
    : null;
  return (
    <div
      key={pro.id}
      className="boxUI relative flex flex-col shadow-md cursor-pointer w-50 md:w-auto"
    >
      <div className="w-full h-3/4 aspect-square overflow-hidden">
        <Link href={"/"}>
          <Image
            src={pro.thumbnail}
            alt={pro.title}
            fill
            className="object-contain object-top"
          />
        </Link>
      </div>
      <div className="boxUI belowCard block w-full h-1/3 px-3 pt-2 bg-[#979696]/15 overflow-hidden">
        <h2 className="font-semibold text-sm tracking-tight">{pro.title}</h2>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm text-black/80">{pro.rating} | 5</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="font-extrabold mt-1">${pro.price}</p>
          <p className="font-extrabold opacity-50 line-through">
            ${oldPrice?.toFixed()}
          </p>
          <p className="bg-rose-200 text-rose-950 text-xs px-1.5 py-1 rounded-full">
            {pro.discountPercentage.toFixed()}%
          </p>
        </div>
      </div>
    </div>
  );
}
