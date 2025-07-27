import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { TReview } from "@/src/app/types/ProductTypes";

export function useGetReviews(productId: number) {
  const { data, status, error } = useQuery({
    queryKey: ["reviews", productId-1],
    queryFn: async () => {
      const response = await axios.get<Record<string, TReview>>(
        `${DB_URL}products/${productId}/reviews.json`
      );
      console.log(`${DB_URL}/products/${productId}/reviews.json`);
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
    placeholderData: (previousData) => previousData,
    enabled: !!productId,
  });

  return { data, status, error };
}

export function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: TReview) => {
      const { productId, ...comment } = review;
      const response = await axios.post(
        `${DB_URL}/products/${productId}/reviews.json`,
        comment
      );
      return { id: response.data.name, ...review };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", data.productId-1],
      });
    },
  });
}
