export default function Stars({ rating }: { rating: number }) {
  return (
    <>
      <div className="stars bg-[url('/images/product/reviews/stars.svg')] h-4 bg-no-repeat bg-left bg-cover w-21">
        <div
          className="stars_front bg-[url('/images/product/reviews/rating.svg')] h-4 bg-no-repeat bg-left bg-cover overflow-x-hidden z-10"
          style={{ width: `${(84 * rating) / 5}px` }}
        ></div>
      </div>
    </>
  );
}
