export const CATEGORY_MAP: Record<
  string,
  { title: string; categories: string[] }
> = {
  all: {
    title: "All Clothing",
    categories: ["mens-shirts", "mens-shoes", "womens-dresses", "womens-shoes"],
  },
  "mens-shirts": { title: "Mens Shirts", categories: ["mens-shirts"] },
  "mens-shoes": { title: "Mens Shoes", categories: ["mens-shoes"] },
  "womens-dresses": { title: "Womens Dresses", categories: ["womens-dresses"] },
  "womens-shoes": { title: "Womens Shoes", categories: ["womens-shoes"] },
};