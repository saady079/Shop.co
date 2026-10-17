import "./productList.css";
import ProductListSkeleton from "./productListSkeleton";
import { Suspense } from "react";
import Btn from "../../button";
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
  cssTail
}: propsOFproducts) {
  const data = await fetchApi();

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <section className={`mx-auto w-[90%] py-12 ${cssTail}`}>
        <h1 className="font-[950] font-integ text-4xl md:text-5xl text-center">
          {title}
        </h1>
        <div className="m-auto w-250 grid grid-cols-2 gap-4 md:grid-cols-4 mt-14">
          {data.products.map((product) => {
            return <ProductListCard key={product.id} pro={product} />;
          })}
        </div>
        <div className="flex justify-center mt-25">
          <Btn variant="light">View All</Btn>
        </div>
      </section>
    </Suspense>
  );
}
