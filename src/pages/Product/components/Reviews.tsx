import { useCallback, useMemo, useState } from "react";

import { useAuthStore } from "store/authStore";
import { useReviewStore } from "../store/review";
import { useGetReviews, usePostComment } from "../hooks/useReview";
import { TProps } from "../types";

import BlackLineButton from "buttons/components/BlackLineButton";
import Stars from "./stars";
import Comment from "./Comment";
import Arrow from "./Arrow";
import { TReview } from "@/src/app/types/ProductTypes";

export default function Reviews({ product }: TProps) {
  const marks = useMemo<string[]>(
    () => ["Poor", "Below Average", "Average", "Good", "Excellent"],
    []
  );
  const [isCommentsOpened, setCommentsOpened] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);

  const user = useAuthStore((state) => state.user);

  const comment = useReviewStore((state) => state.comment);
  const setComment = useReviewStore((state) => state.setComment);

  const postComment = usePostComment();
  const { data, status } = useGetReviews(product.productId);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
      postComment.mutate(review);
      setComment("");
      setRating(0);
    },
    [postComment, setComment, setRating, rating, comment, user, product.id]
  );

  if (!data || status === "pending") return <h1>Loading reviews...</h1>;

  if (status === "error") return <p>Error loading reviews. Try again later.</p>;

  return (
    <>
      <section className="reviews pt-22">
        <div className="reviews_inner">
          <h2 className="title text-2xl leading-8">Reviews</h2>
          <div className="rating py-12 px-0 flex items-center justify-between">
            <div className="left p-8 bg-stone-100 max-w-46 flex flex-col gap-4 items-center">
              <p className="number text-[56px] leading-14 text-center">
                {product.rating}
              </p>
              <p className="count_review text-base leading-4 text-center text-black opacity-30">
                of {data.reviews.length} reviews
              </p>
              <Stars rating={product.rating} />
            </div>

            <div className="right">
              <ul className="list flex flex-col-reverse justify-start items-start gap-6">
                {data.rates.map((el, i) => (
                  <li className="item flex items-center gap-4" key={i}>
                    <p className="item_title w-33">{marks[i]}</p>
                    <div className="bar w-150 h-1 bg-stone-300 rounded-2xl">
                      <div
                        className="bar_front bg-amber-500 h-1 rounded-2xl"
                        style={{
                          width: `${(600 * el) / data.reviews.length}px`,
                        }}
                      ></div>
                    </div>
                    <p className="item_count color-black text-base font-medium leading-4 text-center opacity-30">
                      {el}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {Object.keys(user).length !== 0 && (
            <form onSubmit={handleSubmit} className="form relative h-55">
              <textarea
                className="comment block py-6 px-4 w-full rounded-md border-1 border-stone-400 transition-all duration-200 ease-in-out placeholder:transition-all placeholder:duration-200 placeholder:ease-in-out hover:border-black active:border-black focus:border-black hover:placeholder:text-black active:placeholder:text-black focus:placeholder:text-black"
                name="comment"
                id="comment"
                placeholder="Leave Comment"
                value={comment}
                rows={4}
                wrap="soft"
                maxLength={500}
                minLength={4}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {comment && (
                <>
                  <div className="rating_stars flex absolute bottom-4 left-0">
                    {[...Array(5)].map((_, i) => {
                      const value = i + 1;
                      const isActive = value <= (ratingHover || rating);
                      return (
                        <div
                          className="star_item cursor-pointer w-6 h-6 bg-cover transition-all duration-200"
                          key={i + 1}
                          onClick={() => setRating(i + 1)}
                          onMouseEnter={() => setRatingHover(i + 1)}
                          onMouseLeave={() => setRatingHover(0)}
                          style={{
                            backgroundImage: `url(${
                              isActive
                                ? "/images/product/reviews/star-filled.svg"
                                : "/images/product/reviews/star.svg"
                            })`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                  <BlackLineButton
                    twclass={"submit absolute bottom-0 right-0 hover:scale-100"}
                    type={"submit"}
                    disabled={!comment || !rating}
                    children={"Send Comment"}
                  />
                </>
              )}
            </form>
          )}
          <ul
            className={`comments max-h-112 overflow-hidden mt-10 ${
              isCommentsOpened &&
              "all_list transition-all duration-200 ease-in-out max-h-none"
            }`}
          >
            {data.reviews.length > 0 &&
              data.reviews.map((review) => (
                <Comment key={review.id} {...review} />
              ))}
          </ul>
          <button
            className="button flex items-center justify-center py-3 px-14 gap-2 rounded-md border-2 border-black bg-transparent cursor-pointer text-black text-[14px] font-medium mt-10 mb-0 mx-auto transition-all duration-200 ease-in-out hover:bg-black hover:text-white group"
            onClick={() => setCommentsOpened(!isCommentsOpened)}
          >
            View More
            <Arrow check={isCommentsOpened} />
          </button>
        </div>
      </section>
    </>
  );
}
