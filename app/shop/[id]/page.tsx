import { getProductById } from "@/lib/getProductById";
import Breadcrumb from "@/src/components/buy/Breadcrumb";
import ProductGallery from "@/src/components/buy/ProductGallery";
import ProductInfo from "@/src/components/buy/ProductInfo";
import ColorSelector from "@/src/components/buy/ColorSelector";
import SizeSelector from "@/src/components/buy/SizeSelector";
import ReviewsList from "@/src/components/buy/ReviewsList";
import AddToCart from "@/src/components/buy/AddToCart";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="mt-25">
      <div className="m-auto max-w-[80%]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "Men", href: "/shop/men" },
            { label: "T-shirts" },
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10 mt-4">
          <div className="w-full md:w-1/2">
            <ProductGallery pro={product} />
          </div>

          <div className="flex-1">
            <ProductInfo pro={product} />

            <div className="mt-6">
              <ColorSelector />
            </div>
            <div className="mt-6 border-b border-black/10 pb-6">
              <SizeSelector />
            </div>

            <AddToCart />
          </div>
        </div>
        <ReviewsList reviews={product.reviews} />
      </div>
    </div>
  );
}

export default ProductPage;
