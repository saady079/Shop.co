import { Product } from "@/src/components/types/product";
import { BASE_URL } from "./variables";

export async function getProductById(id: string): Promise<Product> {
  const result = await fetch(`${BASE_URL}/products/${id}`);
  return result.json();
}