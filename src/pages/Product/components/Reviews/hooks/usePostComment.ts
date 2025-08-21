import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TReview } from "types/ProductTypes";

async function postComment(review: TReview) {
  const { productId, ...comment } = review;
  const response = await axios.post(
    `${DB_URL}/products/${productId}/reviews.json`,
    comment
  );
  return { id: response.data.name, ...review };
}

export default function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", data.productId - 1],
      });
    },
  });
}
