export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  image: string[];
  thumbnail: string;
  rating: number;
}

export interface ProductApi {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
