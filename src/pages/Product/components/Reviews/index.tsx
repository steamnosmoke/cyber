
import useGetReviews from "./hooks/useGetReviews";

import { useProductStore } from "store/productsStore";
import Rates from "./components/Rates";
import Comment from "./components/Comment";
import ReviewList from "./components/ReviewList";

export default function Reviews() {
  const product = useProductStore((state) => state.product);
  const { data: reviewsData, status } = useGetReviews(product.productId);

  if (!reviewsData || status === "pending") return <h1>Loading reviews...</h1>;

  if (status === "error") return <p>Error loading reviews. Try again later.</p>;

  return (
    <>
      <section className="reviews ">
        <div className="reviews_inner">
          <h2 className="title text-2xl">Reviews</h2>

          <Rates data={reviewsData} />

          <Comment />

          <ReviewList data={reviewsData} />
        </div>
      </section>
    </>
  );
}
