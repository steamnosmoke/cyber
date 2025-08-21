import { useProductStore } from "store/productsStore";

export default function Title() {
  const product = useProductStore((state) => state.product);

  return (
    <>
      <h1 className="title text-[40px] font-bold leading-10">
        {product.name},<br />
        {product.color}
      </h1>
      <div className="price flex items-center gap-6">
        <p
          className="actualy_price text-[32px] leading-12 min-w-23 text-center"
          style={{ letterSpacing: "3%" }}
        >
          {product.totalPrice}$
        </p>
        <p
          className="old_price text-[32px] leading-12 text-black relative 
                        after:content-[''] after:w-25 after:rotate-[20deg] after:h-[4px] after:bg-red-700 after:absolute after:top-1/2 after:left-[-10px] after:rounded-[4px]"
        >
          {product.price}$
        </p>
      </div>
    </>
  );
}
