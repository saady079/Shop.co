import { getProductById } from "@/lib/getProductById";
import { getProductsByCategory } from "@/lib/getCategory";
import { getProducts } from "@/lib/getProducts";
import { notFound } from "next/navigation";
import Breadcrumb from "@/src/components/buy/Breadcrumb";
import ProductGallery from "@/src/components/buy/ProductGallery";
import ProductInfo from "@/src/components/buy/ProductInfo";
import ReviewsList from "@/src/components/buy/ReviewsList";
import ProductList from "@/src/components/home/product-list/productList";
import Container from "@/src/components/constant/container";
import ProductActions from "@/src/components/cart/ProductActions";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <>
      <Container>
        <div className="py-4 lg:py-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              {
                label: product.category.replace(/-/g, " "),
                href: `/shop/category/${product.category}`,
              },
              { label: product.title },
            ]}
          />

          <div className="mt-4 flex flex-col gap-6 lg:mt-6 lg:flex-row lg:gap-10">
            <div className="w-full min-w-0 lg:w-1/2">
              <ProductGallery images={product.images} />
            </div>

            <div className="min-w-0 flex-1">
              <ProductInfo product={product} />
              <ProductActions product={product} />
            </div>
          </div>

          <div className="mt-10 lg:mt-16">
            <ReviewsList reviews={product.reviews} />
          </div>
        </div>
      </Container>

      <ProductList
        title="YOU MIGHT ALSO LIKE"
        showViewAll={false}
        withBorder={false}
        fetchApi={async () => {
          const data = await getProductsByCategory(product.category, 5);
          const others = data.products
            .filter((p) => p.id !== product.id)
            .slice(0, 4);

          // اگر دسته کم‌محصول بود، از محصولات جدید پر کن
          return others.length >= 2
            ? { ...data, products: others }
            : getProducts();
        }}
      />
    </>
  );
}