import { useReviewStore } from "../store/useReviewStore";

export default function CommentText() {
  const comment = useReviewStore((state) => state.comment);
  const setComment = useReviewStore((state) => state.setComment);
  return (
    <textarea
      className="comment resize-none block py-4 px-4 w-full rounded-md border-1 border-stone-400 transition-all duration-200 ease-in-out placeholder:transition-all placeholder:duration-200 placeholder:ease-in-out hover:border-black active:border-black focus:border-black hover:placeholder:text-black active:placeholder:text-black focus:placeholder:text-black focus:border-1 outline-0"
      name="comment"
      id="comment"
      placeholder="Leave Comment"
      value={comment}
      rows={4}
      wrap="soft"
      maxLength={400}
      minLength={4}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  );
}
