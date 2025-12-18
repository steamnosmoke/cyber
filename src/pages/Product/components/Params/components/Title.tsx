import { useProductStore } from "store/productsStore";

export default function Title() {
  const product = useProductStore((state) => state.product);

  return (
    <>
      <h1 className="title text-3xl font-medium ">
        {product.name}
        <br />
        <span className="text-2xl">{product.color}</span>
      </h1>
      <div className="price flex items-start gap-1">
        <p
          className="actualy_price text-2xl font-medium  min-w-23 text-left"
        >
          {product.totalPrice}$
        </p>
        <p
          className="old_price text-xl  text-black text-right relative 
                        after:content-[''] after:w-18 after:rotate-[18deg] after:h-[2px] after:bg-red-700 after:absolute after:top-1/2 after:left-[-15px] after:rounded-[4px]"
        >
          {product.price}$
        </p>
      </div>
    </>
  );
}
