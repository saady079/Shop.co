import "./productList.css";
import Image from "next/image";
import ProductListSkeleton from "./productListSkeleton";
import { Suspense } from "react";
import Btn from "../../button";
import { ProductApi } from "../../types/product";
import ProductListCard from "./productListCard";

type propsOFproducts = {
  title: string;
  fetchApi: () => Promise<ProductApi>;
};

export default async function ProductList({
  title,
  fetchApi,
}: propsOFproducts) {
  const data = await fetchApi();

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <section className="bg-[#ffffff] mx-auto w-[70%] py-16 border-b border-[#0000001A]">
        <h1 className="font-extrabold font-integ text-4xl md:text-5xl text-center">
          {title}
        </h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-10">
          {data.products.map((product) => {
            return <ProductListCard key={product.id} pro={product}/>
          })}
        </div>
        <div className="flex justify-center mt-10">
          <Btn variant="light">View All</Btn>
        </div>
      </section>
    </Suspense>
  );
}
