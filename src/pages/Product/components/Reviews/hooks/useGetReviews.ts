import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { Review } from "types/ProductTypes";

async function geReviews(productId: string) {
  const response = await axios.get<Record<string, Review>>(
    `${DB_URL}products/${productId}/reviews.json`
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
}

export default function useGeReviews(productId: string) {
  const { data, status, error } = useQuery({
    queryKey: ["reviews", Number(productId) - 1],
    queryFn: () => geReviews(productId),
    placeholderData: (previousData) => previousData,
    enabled: !!productId,
  });

  return { data, status, error };
}
