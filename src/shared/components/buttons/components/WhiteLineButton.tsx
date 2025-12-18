import ButtonProps from "../types";

export default function WhiteLineButton({
  children,
  onClick,
  twclass,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      className={`white-line-btn cursor-pointer py-3 px-10 border-1 border-white rounded-xl text-white bg-transparent text-center text-base transition-all duration-200 ease-in-out hover:bg-white hover:text-black hover:scale-105 active:transform:scale-95 ${twclass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
