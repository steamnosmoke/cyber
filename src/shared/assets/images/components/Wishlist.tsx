export default function Wishlist({ cl }: { cl?: string }) {
  return (
    <svg
      className={cl}
      width="32.000000"
      height="32.000000"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <rect
        id="Icon/32px/Like"
        rx="0.000000"
        width="31.000000"
        height="31.000000"
        transform="translate(0.500000 0.500000)"
        fill="#FFFFFF"
        fillOpacity="0"
      />
      <path
        className="transition-all duration-200 ease-in-out group-[.add-to-wishlist]:group-hover:stroke-red-600 "
        id="Vector 15"
        d="M6.42 19C3.53 16.29 3.18 11.83 5.61 8.7C8.23 5.32 13.5 5.88 15.35 9.75C15.61 10.29 16.38 10.29 16.64 9.75C18.49 5.88 23.76 5.32 26.38 8.7L26.79 9.23C28.99 12.06 28.67 16.09 26.06 18.54L16.67 27.36L16 27.81L15.99 27.81L15.32 27.36L6.42 19Z"
        stroke="#919191"
        strokeOpacity="0.770000"
        strokeWidth="1.400000"
      />
    </svg>
  );
}
