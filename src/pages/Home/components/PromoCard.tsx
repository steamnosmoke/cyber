import { Link } from "react-router";

import { Product } from "types/ProductTypes";

import getLink from "utils/getLink";

type PromoLinkProps = {
  product?: Product;
  children: React.ReactNode;
  className?: string;
};

export default function PromoLink({
  product,
  children,
  className = "",
}: PromoLinkProps) {
  if (!product) {
    return (
      <div
        className={`${className} opacity-70 cursor-default`}
        title="Скоро появится"
      >
        {children}
      </div>
    );
  }

  return (
    <Link to={getLink(product)} className={className}>
      {children}
    </Link>
  );
}
