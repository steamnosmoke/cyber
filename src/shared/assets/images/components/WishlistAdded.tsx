export default function WishlistAdded({ cl }: { cl?: string }) {
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
      <path
        id="Vector 15"
        d="M15.32 27.36L6.42 19C3.53 16.29 3.18 11.83 5.61 8.7C8.23 5.32 13.5 5.88 15.35 9.75C15.61 10.29 16.38 10.29 16.64 9.75C18.49 5.88 23.76 5.32 26.38 8.7L26.79 9.23C28.99 12.06 28.67 16.09 26.06 18.54L16.67 27.36L16 27.81L15.99 27.81L15.32 27.36Z"
        fill="#FF0000"
        fillOpacity="1.000000"
        fillRule="evenodd"
      />
      <path
        className="transition-all duration-200 ease-in-out group-[.add-to-wishlist]:group-hover:stroke-transparent"
        id="Vector 15"
        d="M6.42 19C3.53 16.29 3.18 11.83 5.61 8.7C8.23 5.32 13.5 5.88 15.35 9.75C15.61 10.29 16.38 10.29 16.64 9.75C18.49 5.88 23.76 5.32 26.38 8.7L26.79 9.23C28.99 12.06 28.67 16.09 26.06 18.54L16.67 27.36L16 27.81L15.99 27.81L15.32 27.36L6.42 19Z"
        stroke="#FF0000"
        strokeOpacity="1.000000"
        strokeWidth="1.400000"
      />
    </svg>
  );
}
