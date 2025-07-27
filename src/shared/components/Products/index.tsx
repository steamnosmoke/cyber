import Card from "components/ProductCard";
import { TProduct } from "@/src/app/types/ProductTypes";
import { Props } from "./types";

import MyLoader from "./components/Loader";

export default function Products({ products, status }: Props) {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-y-20 gap-x-5 content-center">
        {(() => {
          switch (status) {
            case "success":
              return products.length > 0 ? (
                products.map((el: TProduct) => (
                  <Card key={el.objectId} product={el} />
                ))
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
