import { ProductApi } from "@/src/components/types/product";

export async function getProducts(): Promise<ProductApi> {
  const data = await fetch("https://dummyjson.com/products?limit=4", {
    next: { revalidate: 15 },
  });
  return data.json();
}

export async function getProducts2(): Promise<ProductApi> {
  const data = await fetch("https://dummyjson.com/products?limit=4&skip=78", {
    next: { revalidate: 15 },
  });
  return data.json();
}
