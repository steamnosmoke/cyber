import { useState } from "react";
import MoreButton from "../../MoreButton";
import Review from "./Review";
import { TProps } from "../types";

export default function ReviewList({ data }: TProps) {
  const [isCommentsOpened, setCommentsOpened] = useState(false);
  return (
    <>
      <ul
        className={`comments mt-8 transition-all duration-200 ease-in-out ${
          isCommentsOpened ? "max-h-3000" : "max-h-96 overflow-hidden"
        }`}
      >
        {data.reviews &&
          data.reviews.map((review, i) => (
            <li key={i}>
              <Review review={review} />
            </li>
          ))}
      </ul>
      <MoreButton flag={isCommentsOpened} setFlag={setCommentsOpened} />
    </>
  );
}
