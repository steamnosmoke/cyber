import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const DB_URL =
  "https://e-store-4ca3a-default-rtdb.europe-west1.firebasedatabase.app";

export function useProducts(category) {
  const { data, status } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await axios.get(
        `${DB_URL}/products.json${
          category ? `?orderBy="category"&equalTo="${category}"` : ""
        }`
      );
      return response.data;
    },
    select: (data) => {
      const productsData = Object.values(data || {});
      let products = [];

      if (category === "Phones") {
        productsData.forEach((product, prodId) => {
          product.variants?.forEach((variant, varId) => {
            products.push({
              ...product,
              ...variant,
              objectId: `${prodId}x${varId}`,
              variantId: varId,
              stock: variant.stock,
              totalPrice: variant.price - variant.discount,
            });
          });
        });
      }

      return products;
    },
    keepPreviousData: true,
  });

  return { products: data || [], status };
}

export function useFilters(category) {
  const { data, status } = useQuery({
    queryKey: ["filters", category],
    queryFn: async () => {
      const response = await axios.get(
        `${DB_URL}/categories.json${
          category ? `?orderBy="name"&equalTo="${category}"` : ""
        }`
      );
      return response.data;
    },
    select: (data) => {
      const categoryData = Object.values(data || {})[0];
      return categoryData?.filters || [];
    },
    keepPreviousData: true,
    enabled: !!category,
  });
  return {
    filters: data || [],
    status,
  };
}

export function useGetReviews(productId) {
  const { data, status, error } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const response = await axios.get(
        `${DB_URL}/products/${productId - 1}/reviews.json`
      );

      const rawData = response.data;

      if (!rawData) {
        return { reviews: [], rates: [0, 0, 0, 0, 0] };
      }

      const reviews = Object.entries(rawData).map(([id, review]) => ({
        id,
        ...review,
      }));

      const rates = [0, 0, 0, 0, 0];
      reviews.forEach((el) => {
        if (el.rating >= 1 && el.rating <= 5) {
          rates[el.rating - 1] += 1;
        }
      });

      return { reviews, rates };
    },
    keepPreviousData: true,
    enabled: !!productId,
  });

  return { data, status, error };
}

export function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review) => {
      const { productId, ...comment } = review;
      const response = await axios.post(
        `${DB_URL}/products/${productId - 1}/reviews.json`,
        comment
      );
      return { id: response.data.name, ...review };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", data.productId],
      });
    },
  });
}
