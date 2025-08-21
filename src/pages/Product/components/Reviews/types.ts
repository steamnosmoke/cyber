import { TReview } from "types/ProductTypes";

export type TReviewStore = {
  comment: string;
  rating: number;
  setComment: (comment: string) => void;
  setRating: (rating: number) => void;
};

export type TProps = {
  data: {
    reviews: TReview[];
    rates: number[];
  };
};
export type TReviewProps = {
  review: TReview;
};
