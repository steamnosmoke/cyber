import { useParams } from "react-router";
import ProductParams from "./components/ProductParams";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import { Link } from "react-router";
import { useProductsStore } from "../../zustand/productsStore";

export default function Product() {
  const { id } = useParams();
  const setCategory = useProductsStore((state) => state.setCategory);
  const product = useProductsStore((state) => state.product);

  if (Object.values(product).length === 0) {
    return <>loading...</>;
  }

  return (
    <>
      <main className="main flex-grow">
        <div className="container">
          <header className="py-11 flex gap-3">
            <Link to={"/"}>Home</Link>
            <p>{`>`}</p>
            <Link to={"/catalog"}>Catalog</Link>
            <p>{`>`}</p>
            <Link
              to={`/catalog/${product.category}`}
              onClick={() => setCategory(product.category)}
            >
              {product.category}
            </Link>
            <p>{`>`}</p>
            <Link to={`/catalog/${id}`}>{product.name}</Link>
          </header>
          <ProductParams product={product || {}} />
          <Details product={product || {}} />
          <Reviews product={product || {}} />
        </div>
      </main>
    </>
  );
}
