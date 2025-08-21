import { useState } from "react";
import { useReviewStore } from "../store/useReviewStore";

export default function RatingStars() {
  const [ratingHover, setRatingHover] = useState(0);
  const rating = useReviewStore((state) => state.rating);
  const setRating = useReviewStore((state) => state.setRating);

  return (
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
  );
}
