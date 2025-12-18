import { useProductStore } from "store/productsStore";

import ProductGallery from "./components/Gallary";
import Title from "./components/Title";
import Colors from "./components/Colors";
import Memory from "./components/Memory";
import Characters from "./components/Characters";
import Tablets from "./components/Tablets";
import Buttons from "./components/Buttons";
import MyLoader from "./components/Loader";

export default function ProductParams() {
  const product = useProductStore((state) => state.product);
  

  if (!product) return <MyLoader />;

  return (
    <>
      <section className="params flex items-center justify-between">
        <ProductGallery />

        <div className="params_block flex flex-col gap-6 items-start max-w-134">
          <Title />
          <Colors />
          <Memory />
          <Characters />
          <Buttons />
          <Tablets />
        </div>
      </section>
    </>
  );
}
