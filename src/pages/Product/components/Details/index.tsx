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
      <section className="details py-16">
        <div className="details-inner flex flex-col gap-4">
          <h2 className="title text-2xl">Details</h2>

          <p className="description text-[14px] text-[#9d9d9d] mb-8">
            {product.specs.description}
          </p>

          <Specs />

          <MoreButton flag={isDetailsOpened} setFlag={setDetailsOpened} />
        </div>
      </section>
    </>
  );
}
