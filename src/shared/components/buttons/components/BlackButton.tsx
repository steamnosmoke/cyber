import ButtonProps from "../types";

export default function BlackButton({
  children,
  onClick,
  twclass,
  disabled,
  type,
  textclass,
}: ButtonProps) {
  return (
    <button
      className={`black-btn relative cursor-pointer py-3 px-10 border-1 border-black rounded-xl bg-black  transition-all duration-200 ease-in-out hover:bg-transparent group hover:scale-105 overflow-hidden w-45 h-12 ${twclass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <p
        className={`absolute top-[50%] left-[50%] translate-[-50%] z-100 text-white text-center text-[16px] group-hover:text-black transition-all duration-100 ease-in-out text-nowrap ${textclass}`}
      >
        {children}
      </p>
    </button>
  );
}
