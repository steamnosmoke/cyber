import { TUser } from "types/AuthTypes";
import { TReview } from "types/ProductTypes";
import usePostComment from "../hooks/usePostComment";
import { useReviewStore } from "../store/useReviewStore";
import { useProductStore } from "store/productsStore";

export default function sendComment(
  e: React.FormEvent<HTMLFormElement>,
  user: TUser,
  rating: number
) {
  const { mutate } = usePostComment();
  const comment = useReviewStore((state) => state.comment);
  const product = useProductStore((state) => state.product);

  return () => {
    e.preventDefault();
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const review: TReview = {
      userId: user.firebaseId,
      userName: user.name,
      rating,
      comment,
      date,
      productId: Number(product.id),
    };
    mutate(review);
  };
}
