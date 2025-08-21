import { useProductStore } from "store/productsStore";
import { useDetailsStore } from "./store/useDetailsStore";
import Specs from "./components/Specs";
import MoreButton from "../MoreButton";

export default function Details() {
  const product = useProductStore((state) => state.product);

  const isDetailsOpened = useDetailsStore((state) => state.isDetailsOpened);
  const setDetailsOpened = useDetailsStore((state) => state.setDetailsOpened);

  return (
    <>
      <section className="details py-20">
        <div className="details-inner py-12 px-10 flex flex-col gap-8">
          <h2 className="title text-2xl leading-8">Details</h2>

          <p className="description text-[14px] leading-6 text-[#9d9d9d]">
            {product.specs.description}
          </p>

          <Specs />

          <MoreButton flag={isDetailsOpened} setFlag={setDetailsOpened} />
        </div>
      </section>
    </>
  );
}
