export interface tsProduct {
  _id: number;
  title: string;
  isNew: boolean;
  oldPrice: string;
  price: number;
  image: string;
}

export default async function getProducts() {
  const response = await fetch("https://fakestoreapi.noksha.dev/api/products",{next:{revalidate:15}});
  const result = await response.json();
  const product: tsProduct[] = result.data;
  return product;  
}
