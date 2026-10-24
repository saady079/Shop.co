import { Product } from "@/src/components/types/product";

export async function getProductById(id: string): Promise<Product> {
  const result = await fetch(`https://dummyjson.com/products/${id}`);
  return result.json();
}