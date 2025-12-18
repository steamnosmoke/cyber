import Card from "components/ProductCard";
import { Props } from "./types";

import MyLoader from "./components/Loader";

export default function Products({ products, status }: Props) {
  return (
    <>
      <div
        className={
          status === "success" && products.length > 0 
            ? "grid gap-x-20 gap-y-6 place-items-center justify-center content-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))] transition-all duration-300"
            : "mt-50"
        }
      >
        {(() => {
          switch (status) {
            case "success":
              return products.length > 0 ? (
                products.map((el) => <Card key={el.objectId} product={el} />)
              ) : (
                <h1 className="text-2xl text-center font-semibold mt-3">
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
                <h2 className="text-2xl text-center font-semibold mt-3">
                  Something Went Wrong
                </h2>
              );
          }
        })()}
      </div>
    </>
  );
}
