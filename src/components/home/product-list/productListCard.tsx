import Image from "next/image";
import { Product } from "../../types/product";
import Link from "next/link";

export default function ProductListCard({ pro }: { pro: Product }) {
  return (
    <div
      key={pro.id}
      className="relative shadow-xl max-w-xl bg-neutral-primary-soft pb-6 border border-default rounded-xl cursor-pointer"
    >
      <div className="rounded-xl aspect-square overflow-hidden">
        <Link href={"/"}>
          <Image
            src={pro.thumbnail}
            alt={pro.title}
            fill
            className="object-contain"
          />
        </Link>
      </div>
      <div className="card w-full px-3 bg-fuchsia-950/30">
        <h2 className='font-semibold text-sm tracking-tight'>{pro.title}</h2>
        <p className='font-bold text-xs'>${pro.price}</p>
      </div>
    </div>
  );
}
