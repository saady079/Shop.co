import { Product, ProductApi } from "@/src/types/product";
import { BASE_URL } from "./variables";
import { fetchJson } from "./getCategory";

const CLOTHING_CATEGORIES = [
  "mens-shirts",
  "mens-shoes",
  "womens-dresses",
  "womens-shoes",
];

async function getClothingProducts(
  limit: number,
  skip: number = 0,
): Promise<ProductApi> {
  const results = await Promise.all(
    CLOTHING_CATEGORIES.map((category) =>
      fetchJson<ProductApi>(`${BASE_URL}/products/category/${category}`),
    ),
  );

  const lists = results.map((r) => r?.products ?? []);
  const maxLen = Math.max(0, ...lists.map((l) => l.length));

  const mixed: Product[] = [];
  for (let i = 0; i < maxLen; i++) {
    for (const list of lists) {
      if (list[i]) mixed.push(list[i]);
    }
  }

  return {
    products: mixed.slice(skip, skip + limit),
    total: mixed.length,
    skip,
    limit,
  };
}

export async function getProducts(): Promise<ProductApi> {
  return getClothingProducts(4, 0);
}

export async function getProducts2(): Promise<ProductApi> {
  return getClothingProducts(4, 8);
}
