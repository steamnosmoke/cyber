import Card from "components/ProductCard";
import { Props } from "./types";

import MyLoader from "./components/Loader";

export default function Products({ products, status }: Props) {
  return (
    <>
      <div
        className="
    grid 
    gap-x-20 gap-y-8
    justify-items-center 
    content-center
    grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
    transition-all duration-300
  "
      >
        {(() => {
          switch (status) {
            case "success":
              return products.length > 0 ? (
                products.map((el) => <Card key={el.objectId} product={el} />)
              ) : (
                <h1 className="text-4xl text-center font-semibold mt-3">
                  No Products Found
                </h1>
              );

            case "pending":
              return Array.from({ length: 16 }).map((_, i) => (
                <MyLoader key={i} />
              ));

            case "error":
            default:
              return (
                <h2 className="text-4xl text-center font-semibold mt-3">
                  Something Went Wrong
                </h2>
              );
          }
        })()}
      </div>
    </>
  );
}
