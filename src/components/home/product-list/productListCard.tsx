import Image from "next/image";
import { Product } from "../../types/product";

export default function ProductListCard({pro}:{pro:Product}) {
  return (
    <div
      key={pro.id}
      className="h-[20rem] relative cursor-pointer rounded-xl shadow-lg"
    >
      <Image
        src={pro.thumbnail}
        alt={pro.title}
        fill
        className="object-cover rounded-xl"
      />
      <div className="card w-full bottom-0 relative">
        <h2 className={`innerText`}>{pro.title}</h2>
        <p className={`innerText`}>${pro.price}</p>
      </div>
    </div>
  );
}
