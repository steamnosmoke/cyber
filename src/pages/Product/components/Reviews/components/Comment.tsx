import { useAuthStore } from "store/authStore";
import BlackLineButton from "buttons/components/BlackLineButton";
import { useCallback } from "react";
import { useReviewStore } from "../store/useReviewStore";
import { useProductStore } from "store/productsStore";
import sendComment from "../utils/sendReview";
import RatingStars from "./RatingStars";
import CommentText from "./CommentText";

export default function Comment() {
  const user = useAuthStore((state) => state.user);
  const product = useProductStore((state) => state.product);

  const comment = useReviewStore((state) => state.comment);
  const setComment = useReviewStore((state) => state.setComment);
  const rating = useReviewStore((state) => state.rating);
  const setRating = useReviewStore((state) => state.setRating);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      sendComment(e, user, rating);
      setComment("");
      setRating(0);
    },
    [user, product]
  );
  return (
    <>
      {user.firebaseId !== "guest" && (
        <form onSubmit={handleSubmit} className="form relative h-60">
          <CommentText />
          {comment && (
            <>
              <RatingStars />
              <BlackLineButton
                twclass={"submit absolute bottom-0 right-0 hover:scale-100"}
                type={"submit"}
                disabled={!comment && !rating}
                children={"Send Comment"}
              />
            </>
          )}
        </form>
      )}
    </>
  );
}
