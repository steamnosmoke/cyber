import MyLoader from "./Loader";
import Card from "../ProductCard";

export default function Products({ products, status }) {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-y-20 gap-x-5 content-center">
        {(() => {
          switch (status) {
            case "success":
              return products.length > 0 ? (
                products.map((el) => <Card key={el.objectId} product={el} />)
              ) : (
                <h1>No Products Found</h1>
              );

            case "pending":
              return Array.from({ length: 16 }).map((_, i) => (
                <MyLoader key={i} />
              ));

            case "error":
            default:
              return <h2>Something Went Wrong</h2>;
          }
        })()}
      </div>
    </>
  );
}
