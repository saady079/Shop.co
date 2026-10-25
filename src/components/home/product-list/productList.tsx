import "./productList.css";
import ProductListSkeleton from "./productListSkeleton";
import { Suspense } from "react";
import Btn from "../../constant/button";
import { ProductApi } from "../../types/product";
import ProductListCard from "./productListCard";

type propsOFproducts = {
  title: string;
  cssTail?: string;
  fetchApi: () => Promise<ProductApi>;
};

export default async function ProductList({
  title,
  fetchApi,
  cssTail,
}: propsOFproducts) {
  const data = await fetchApi();

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <section className={`mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 ${cssTail}`}>
        <h1 className="text-balance text-center mb-8 font-integ text-2xl font-[950] sm:text-3xl md:text-4xl">{title}</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4  lg:gap-6">
          {data.products.map((product) => (
            <ProductListCard key={product.id} pro={product} />
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:mt-10 lg:mt-12">
          <Btn variant="light">View All</Btn>
        </div>
      </section>
    </Suspense>
  );
}