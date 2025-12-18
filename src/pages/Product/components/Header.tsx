import { Link, useParams } from "react-router";

import { useNavigationStore } from "store/navigationStroe";
import { useProductStore } from "store/productsStore";

export default function Header() {
  const { id } = useParams();
  const setActivePage = useNavigationStore((state) => state.setActivePage);
  const product = useProductStore((state) => state.product);
  const category = useProductStore((state) => state.category);
  const setCategory = useProductStore((state) => state.setCategory);

  return (
    <header className="py-8 flex gap-3">
      <Link
        to={"/"}
        className="transition-all duration-200 hover:font-semibold w-14"
        onClick={() => setActivePage(0)}
      >
        Home
      </Link>
      <p className="cursor-default">{`>`}</p>
      <Link
        to={"/catalog"}
        className="transition-all duration-200 hover:font-semibold w-14"
      >
        Catalog
      </Link>
      <p className="cursor-default">{`>`}</p>
      <Link
        to={`/catalog/${category}`}
        className="transition-all duration-200 hover:font-semibold w-14"
        onClick={() => setCategory(category)}
      >
        {category}
      </Link>
      <p className="cursor-default">{`>`}</p>
      <Link
        to={`/catalog/${id}`}
        className="transition-all duration-200 hover:font-semibold"
      >
        {product.name}
      </Link>
    </header>
  );
}
