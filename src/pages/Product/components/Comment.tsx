import { TReview } from "@/src/app/types/ProductTypes";
import Stars from "./stars";
export default function Comment(review:TReview) {
  return (
    <>
      <section className="comment p-6 mb-5 bg-stone-100 flex flex-col w-full gap-2 rounded-[10px]">
        <header className="header flex items-center justify-between">
          <p className="name text-base font-bold leading-6">{review.userName}</p>
          <p className="date text-black text-[14px] font-medium leading-4 text-right opacity-30">{review.date}</p>
        </header>
        <Stars rating={review.rating} />
        <p className="text text-base font-medium leading-6 text-stone-400">{review.comment}</p>
      </section>
    </>
  );
}
