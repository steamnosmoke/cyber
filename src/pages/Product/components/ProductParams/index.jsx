import screen from "./images/screen.svg";
import cpu from "./images/cpu.svg";
import cores from "./images/cores.svg";
import camera from "./images/camera.svg";
import battery from "./images/battery.svg";
import front from "./images/front.svg";
import Delivery from "./images/Delivery.svg";
import Stock from "./images/Stock.svg";
import Guaranteed from "./images/Guaranteed.svg";
import ProductGallery from "../SwiperPhoto";
import { useProductsStore } from "stores/productsStore";
import { useAddToCart } from "hooks/useCart";
import { useToggleProduct } from "hooks/useWihlist";
import { useCallback, useMemo } from "react";
import BlackLineButton from "buttons/BlackLineButton";

const ProductParams = ({product}) => {
  const addToCart = useAddToCart();
  const setProduct = useProductsStore((state) => state.setProduct);
  const addToWishlist = useToggleProduct();
  const colors = useMemo(
    () => [...new Set(product.variants?.map((v) => v.color))],
    []
  );
  const colorHexs = useMemo(
    () => [...new Set(product.variants?.map((v) => v.colorHex))],
    []
  );
  const memories = useMemo(
    () => [...new Set(product.variants?.map((v) => v.memory))],
    []
  );

  const characters = useMemo(
    () => [
      {
        label: "Screen size",
        img: screen,
        value: product.screenSize,
      },
      {
        label: "CPU",
        img: cpu,
        value: product.processor,
      },
      {
        label: "Number of Cores",
        img: cores,
        value: product.cpuCores,
      },
      {
        label: "Main camera",
        img: camera,
        value: product.camera,
      },
      {
        label: "Front camera",
        img: front,
        value: "12MP",
      },
      {
        label: "Battery capacity",
        img: battery,
        value: product.battery,
      },
    ],
    []
  );

  const tablets = useMemo(
    () => [
      {
        label: "Delivery",
        img: Delivery,
        value: "1-2 days",
      },
      {
        label: "in Stock",
        img: Stock,
        value: product.stock > 0 ? "Today" : "For order",
      },
      {
        label: "Guaranteed",
        img: Guaranteed,
        value:
          product.specs.guarantee.split(" ")[0] +
          " " +
          product.specs.guarantee.split(" ")[1],
      },
    ],
    []
  );

  const setItem = useCallback((color, memory) => {
    const currentVariant = product.variants.find(
      (item) => item.color === color && item.memory === memory
    );
    const variantId = product.variants.indexOf(currentVariant);
    const objectId = `${product.id}x${variantId}`;
    const price =
      currentVariant && currentVariant.price - currentVariant.discount;
    const item = {
      ...product,
      ...currentVariant,
      variantId,
      objectId,
      price,
    };
    setProduct(item);
    return item;
  });

  const onAddToCart = useCallback(() => {
    const item = setItem(product.color, product.memory);
    addToCart.mutate(item);
  });

  if (!product) return <div>Loading variant...</div>;

  return (
    <>
      <section className="params flex items-center justify-between pt-11">
        <ProductGallery images={product.images} />

        <div className="params_block flex flex-col gap-5 items-start max-w-134">
          <h1 className="title text-[40px] font-bold leading-10">
            {product.name},<br />
            {product.color}
          </h1>
          <div className="price flex items-center gap-6">
            <p
              className="actualy_price text-[32px] leading-12 min-w-23 text-center"
              style={{ letterSpacing: "3%" }}
            >
              {product.price - product.discount}$
            </p>
            <p
              className="old_price text-[32px] leading-12 text-black relative 
                        after:content-[''] after:w-25 after:rotate-[20deg] after:h-[4px] after:bg-red-700 after:absolute after:top-1/2 after:left-[-10px] after:rounded-[4px]"
            >
              {product.price}$
            </p>
          </div>
          <div className="select_color flex gap-6 items-center">
            <p className="color_label color-[#212121] text-base font-normal leading-6">
              Select color:
            </p>
            <ul className="color_list flex justify-between gap-3">
              {colors.map((col, colIndex) => (
                <li
                  className={`color_item w-8 h-8 rounded-[50%] cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 ${
                    product.color === col
                      ? "color_active transition-all duration-200 ease-in-out outline-2 border-2 border-white"
                      : ""
                  }`}
                  key={colIndex}
                  style={{
                    background: colorHexs[colIndex],
                    outlineColor: colorHexs[colIndex],
                  }}
                  onClick={() => setItem(col, product.memory)}
                ></li>
              ))}
            </ul>
          </div>
          <ul className="memory_list flex items-center justify-between gap-4">
            {memories.map((mem, memIndex) => (
              <li
                className={`memory_item min-w-31 py-4 px-6 text-[14px] leading-4 text-center  border-1  rounded-[8px] transition-all duration-200 cursor-pointer hover:border-black hover:text-black ${
                  product.memory === mem
                    ? "memory_active border-black text-black"
                    : "border-gray-400 text-gray-400"
                }`}
                key={memIndex}
                onClick={() => setItem(product.color, mem)}
              >
                {mem}
                {mem !== 1 ? "GB" : "TB"}
              </li>
            ))}
          </ul>
          <ul className="characters_list grid grid-cols-3 grid-rows-2 gap-4">
            {characters.map((character, index) => (
              <li className="characters_item flex items-center gap-2 py-4 px-2 bg-stone-100 rounded-md" key={index}>
                <img src={character.img} alt="" />
                <p className="naming text-[14px] text-stone-400 leading-4 max-w-30">
                  {character.label}
                  <br />
                  <span className="value text-[14px] leading-4 text-wrap text-stone-500">
                    {character.value}
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <div className="info max-w-134">
            <p
              className="text text-[14px] leading-6 text-stone-600"
              style={{ letterSpacing: "3%" }}
            >
              {product.specs.description}
            </p>
            <button></button>
          </div>
          <div className="buttons flex items-center justify-between w-full ">
            <BlackLineButton
              onClick={() => addToWishlist.mutate(product)}
              children={"Add to Wishlist"}
              twclass={"py-4 px-18"}
            />
            <BlackLineButton
              onClick={onAddToCart}
              children={"Add to Cart"}
              twclass={"py-4 px-18"}
            />
          </div>
          <ul className="tablets flex justify-between gap-8 w-full">
            {tablets.map((tablet, index) => (
              <li className="tablet flex items-center gap-4" key={index}>
                <img src={tablet.img} alt="" />
                <p className="naming text-[14px] leading-6">
                  {tablet.label}
                  <br />
                  <span className="tablet_text text-black text-[14px] leading-6">
                    {tablet.value}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ProductParams;
