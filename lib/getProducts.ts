import { ProductApi } from "@/src/components/types/product";
import { BASE_URL } from "./variables";

export async function getProducts(): Promise<ProductApi> {
  const data = await fetch(`${BASE_URL}/products?limit=4`, {
    next: { revalidate: 15 },
  });
  return data.json();
}

export async function getProducts2(): Promise<ProductApi> {
  const data = await fetch(`${BASE_URL}/products?limit=4&skip=184`, {
    next: { revalidate: 15 },
  });
  return data.json();
}
