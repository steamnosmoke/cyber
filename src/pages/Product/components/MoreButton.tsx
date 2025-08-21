import { TButtonProps } from "../types";
import Arrow from "../images/components/Arrow";

export default function MoreButton({ flag, setFlag }: TButtonProps) {
  return (
    <button
      className="button flex items-center justify-center py-3 px-14 gap-2 rounded-md border-2 border-black bg-transparent cursor-pointer text-black text-[14px] font-medium mt-10 mb-0 mx-auto transition-all duration-200 ease-in-out hover:bg-black hover:text-white group"
      onClick={() => setFlag(!flag)}
    >
      View More
      <Arrow check={flag} />
    </button>
  );
}
