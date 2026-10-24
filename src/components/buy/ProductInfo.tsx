import { Product } from "../types/product";


function ProductInfo({ pro }: { pro: Product}) {
  const hasDiscount = pro.discountPercentage > 0;
  const oldPrice = hasDiscount
    ? pro.price / (1 - pro.discountPercentage / 100)
    : null;

  return (
    <div>
      <h1 className="text-3xl font-integ font-extrabold uppercase">{pro.title}</h1>

      <div className="flex items-center gap-1 mt-2">
        <span className="text-yellow-500">★★★★★</span>
        <span className="text-sm text-black/60">{pro.rating}/5</span>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-3xl font-extrabold">${pro.price}</span>
        {hasDiscount && (
          <>
            <span className="opacity-50 text-xl line-through">
              ${oldPrice?.toFixed()}
            </span>
            <span className="text-rose-950 text-sm bg-rose-200 rounded-xl py-1 px-2.5">
              {pro.discountPercentage.toFixed()}%
            </span>
          </>
        )}
      </div>

      <p className="text-black/60 mt-4 border-b border-black/10 pb-6">
        {pro.description}
      </p>
    </div>
  );
}

export default ProductInfo;
