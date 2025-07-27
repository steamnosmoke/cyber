import { Link, useParams } from "react-router";

import { THeaderProps } from "../types";
import { useNavigationStore } from "store/navigationStroe";
import { useProductsStore } from "store/productsStore";

export default function Header({ name }: THeaderProps) {
  const { id } = useParams();
  const setActivePage = useNavigationStore((state) => state.setActivePage);

  const category = useProductsStore((state) => state.category);
  const setCategory = useProductsStore((state) => state.setCategory);

  return (
    <header className="py-11 flex gap-3">
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
        {name}
      </Link>
    </header>
  );
}
