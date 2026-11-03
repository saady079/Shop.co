import { Product } from "../../types/product";

type ProductInfoProps = {
  product: Product;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        // درصد پر بودن هر ستاره (۰ تا ۱۰۰)
        const fill = Math.max(0, Math.min(1, rating - (n - 1))) * 100;
        return (
          <span key={n} className="relative inline-block text-xl lg:text-2xl">
            <span className="text-black/15">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-yellow-400"
              style={{ width: `${fill}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.discountPercentage > 0;
  const oldPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <div className="min-w-0">
      <h1 className="wrap-break-word text-2xl font-extrabold uppercase leading-tight md:text-3xl lg:text-4xl">
        {product.title}
      </h1>

      <div className="mt-3 flex items-center gap-3 lg:mt-4">
        <Stars rating={product.rating} />
        <span className="text-sm lg:text-base">
          {product.rating.toFixed(1)}
          <span className="text-black/60">/5</span>
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 lg:mt-4">
        <span className="text-2xl font-extrabold lg:text-3xl">
          ${product.price}
        </span>
        {hasDiscount && (
          <>
            <span className="text-2xl font-extrabold text-black/40 line-through lg:text-3xl">
              ${oldPrice?.toFixed(0)}
            </span>
            <span className="rounded-full bg-[#FF33331A] px-3 py-1 text-xs font-medium text-red-500 lg:text-sm">
              -{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </div>

      <p className="mt-4 border-b border-black/10 pb-5 text-sm leading-relaxed text-black/60 lg:mt-5 lg:pb-6 lg:text-base">
        {product.description}
      </p>
    </div>
  );
}
