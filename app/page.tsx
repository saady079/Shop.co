import ProductList from "@/src/components/home/product-list/productList";
import Head from "@/src/components/home/header";
import { getProducts, getProducts2 } from "@/lib/getProducts";

export default async function Home() {
  return (
    <>
      <Head />
      <ProductList title="New Arrivals" fetchApi={getProducts} />
      <ProductList title="Top Selling" fetchApi={getProducts2}/>
    </>
  );
}
