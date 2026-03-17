import { Product } from "@/types";
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
interface GetProductsParams {
  limit?: number;
  skip?: number;
}
export const getProducts = async ({ limit = 6, skip = 0 }: GetProductsParams = {}) => {
  try {
    
    const response = await fetch(`${BASE_URL}/?limit=${limit}&offset=${skip}`);
    if (!response.ok) {
      console.error("Failed to fetch products:", response.status);
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsWithSearchAndCategory = async ({
  search,
  category,
  limit = 6,
  skip = 0,
}: {
  search: string;
  category: string;
  limit?: number;
  skip?: number;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/?title=${search}&category=${category}&limit=${limit}&offset=${skip}
`
    );
    if (!response.ok) {
      console.error("Failed to search products:", response.status);
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const getProductById = async (
  id: string
): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};