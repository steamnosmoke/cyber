import { Review } from "types/ProductTypes";

export type ReviewStore = {
  comment: string;
  rating: number;
  setComment: (comment: string) => void;
  setRating: (rating: number) => void;
};

export type Props = {
  data: {
    reviews: Review[];
    rates: number[];
  };
};
export type ReviewProps = {
  review: Review;
};
