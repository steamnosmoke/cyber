import ButtonProps from "../types";

export default function BlackLineButton({
  children,
  onClick,
  twclass,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      className={`black-line-btn cursor-pointer py-4 px-14 border-1 border-black rounded-xl text-black bg-transparent text-center text-lg transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:scale-110 active:transform:scale-95 ${twclass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
