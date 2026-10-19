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
      <section className={`mx-auto w-auto md:w-[90%] py-12 ${cssTail}`}>
        <h1 className="font-[950] font-integ text-3xl md:text-4xl text-center">
          {title}
        </h1>
        <div className="m-auto md:w-250 grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {data.products.map((product) => {
            return <ProductListCard key={product.id} pro={product} />;
          })}
        </div>
        <div className="flex justify-center mt-13">
          <Btn variant="light">View All</Btn>
        </div>
      </section>
    </Suspense>
  );
}
