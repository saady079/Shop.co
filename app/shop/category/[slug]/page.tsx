import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/src/components/ui/container";
import CategoryFilters from "@/src/components/category/CategoryFilters";
import SortSelect from "@/src/components/category/SortSelect";
import Pagination from "@/src/components/category/Pagination";
import { getProductsByCategories } from "@/lib/getCategory";
import ProductListCard from "@/src/components/home/product-list/productListCard";
import { CATEGORY_MAP } from "@/src/components/constant/categories";
import Breadcrumb from "@/src/components/productView/Breadcrumb";

const PAGE_SIZE = 2;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    min?: string;
    max?: string;
  }>;
};

async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = "1", sort = "popular", min, max } = await searchParams;

  const category = CATEGORY_MAP[slug];
  if (!category) notFound();

  let products = await getProductsByCategories(category.categories);

  // فیلتر قیمت
  const minPrice = min ? Number(min) : 0;
  const maxPrice = max ? Number(max) : Infinity;
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // مرتب‌سازی
  products.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.rating - a.rating; // popular
  });

  // صفحه‌بندی
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = products.slice(start, start + PAGE_SIZE);

  return (
    <Container>
      <div className="px-6 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: category.title, href: "#" },
          ]}
        />

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <CategoryFilters activeSlug={slug} />

          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h1 className="text-3xl font-bold">{category.title}</h1>
              <div className="flex items-center gap-3 text-sm text-black/60">
                <span>
                  Showing {total ? start + 1 : 0}-
                  {Math.min(start + PAGE_SIZE, total)} of {total} Products
                </span>
                <SortSelect />
              </div>
            </div>

            {visible.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {visible.map((product) => (
                  <ProductListCard key={product.id} pro={product} />
                ))}
              </div>
            ) : (
              <p className="mt-10 text-black/60">No products found.</p>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CategoryPage;
