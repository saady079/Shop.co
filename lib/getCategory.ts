import { Product, ProductApi } from "@/src/components/types/product";
import {BASE_URL, REVALIDATE_SECONDS} from './variables'

const emptyProducts = (limit = 0, skip = 0): ProductApi => ({
  products: [],
  total: 0,
  skip,
  limit,
});

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getProductsByCategory(
  category: string,
  limit: number = 5
): Promise<ProductApi> {
  const data = await fetchJson<ProductApi>(
    `${BASE_URL}/products/category/${category}?limit=${limit}`
  );
  if (!data || !Array.isArray(data.products)) return emptyProducts(limit);
  return data;
}

export async function getProductsByCategories(
  categories: string[]
): Promise<Product[]> {
  const results = await Promise.all(
    categories.map((c) =>
      fetchJson<ProductApi>(`${BASE_URL}/products/category/${c}?limit=0`)
    )
  );
  return results.flatMap((r) => r?.products ?? []);
}