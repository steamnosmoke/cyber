import { TArrowProps } from "../types";

export default function Arrow({ check }: TArrowProps) {
  return (
    <svg
      className={`arrow transition-all duration-200 ease-in-out ${
        check ? "transition-all duration-200 ease-in-out rotate-180" : ""
      }`}
      width="24.000000"
      height="24.000000"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        id="Icon/24px/Arrow Down"
        rx="0.000000"
        width="23.000000"
        height="23.000000"
        transform="translate(0.500000 0.500000)"
        fill="#FFFFFF"
        fillOpacity="0"
      />
      <path
        className="fill-black transition-all duration-200 ease-in-out group-hover:fill-white"
        id="Vector 9"
        d="M18.5 9.53L18.53 9.53C18.82 9.23 18.82 8.76 18.53 8.46C18.23 8.17 17.76 8.17 17.46 8.46L17.46 8.49L18.5 9.53ZM6.53 8.49L6.53 8.46C6.23 8.17 5.76 8.17 5.46 8.46C5.17 8.76 5.17 9.23 5.46 9.53L5.49 9.53L6.53 8.49Z"
        fill="#000000"
        fillOpacity="1.000000"
      />
      <path
        className="fill-black transition-all duration-200 ease-in-out group-hover:fill-white"
        id="Vector 9"
        d="M17.46 8.46L11.46 14.46L12 15L12.53 14.46L6.53 8.46L5.46 9.53L12 16.06L18.53 9.53L17.46 8.46ZM18.5 9.53L18.53 9.53C18.82 9.23 18.82 8.76 18.53 8.46C18.23 8.17 17.76 8.17 17.46 8.46L17.46 8.49L18.5 9.53ZM6.53 8.49L6.53 8.46C6.23 8.17 5.76 8.17 5.46 8.46C5.17 8.76 5.17 9.23 5.46 9.53L5.49 9.53L6.53 8.49Z"
        fill="#000000"
        fillOpacity="1.000000"
      />
    </svg>
  );
}
