import getProducts from "@/lib/getProducts";
import NewArrivals from "@/src/components/global/NewArrivals/newArrivals";
import Head from "@/src/components/home/header";

export default async function Home() {
  return (
    <>
      <Head />
      <NewArrivals title="New Arrivals" />
      <NewArrivals title="Top Selling" />
    </>
  );
}
