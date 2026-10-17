import ProductList from "@/src/components/home/product-list/productList";
import Head from "@/src/components/home/header";
import { getProducts, getProducts2 } from "@/lib/getProducts";
import DressStyle from "@/src/components/home/dress-style";
import CommentMD from "@/src/components/home/commentMD";

export default async function Home() {
  return (
    <>
      <Head />
      <ProductList
        title="New Arrivals"
        fetchApi={getProducts}
        cssTail="border-b border-[#0000001A]"
      />
      <ProductList title="Top Selling" fetchApi={getProducts2} />
      <DressStyle />
      <CommentMD />
    </>
  );
}
