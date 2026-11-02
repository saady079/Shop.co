export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  images: string[];
  category: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
}

export interface ProductApi {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
