
export default function Stars({rating}) {
  return (
    <>
      <div className="stars bg-[url('/images/product/reviews/stars.svg')] h-6 bg-no-repeat bg-left bg-cover w-31">
        <div
          className="stars_front bg-[url('/images/product/reviews/rating.svg')] h-6 bg-no-repeat bg-left bg-cover overflow-x-hidden z-10"
          style={{ width: `${(124 * rating) / 5}px` }}
        ></div>
      </div>
    </>
  );
}
