import { TReview } from "types/ProductTypes";
import usePostComment from "./usePostComment";
import { useReviewStore } from "../store/useReviewStore";
import { useProductStore } from "store/productsStore";
import useGetUserById from "hooks/useGetUserById";

export default function useSendComment(
  e: React.FormEvent<HTMLFormElement>,
  userId: string,
  rating: number
) {
  const { mutate: postComment } = usePostComment();
  const comment = useReviewStore((state) => state.comment);
  const product = useProductStore((state) => state.product);

  const { data: user } = useGetUserById(userId);

  return () => {
    e.preventDefault();
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const review: TReview = {
      userId: userId,
      userName: user.name,
      rating,
      comment,
      date,
      productId: Number(product.id),
    };
    postComment(review);
  };
}
