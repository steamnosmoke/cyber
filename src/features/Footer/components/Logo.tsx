import { Link } from "react-router";

import logo from "assets/images/Logo-white.svg";

export default function Logo() {
  return (
    <div className="block">
      <Link to={"/"}>
        <img
          className="w-20"
          src={logo}
          alt="logotype"
          onClick={() => window.scrollTo(0, 0)}
        />
      </Link>
      <p className="max-w-100 mt-6 text-[12px]">
        Cyber — интернет-магазин электроники с ИИ-помощником, который разбирается в
        технике не хуже продавца-консультанта.
      </p>
    </div>
  );
}
