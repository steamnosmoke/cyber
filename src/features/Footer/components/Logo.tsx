import { Link } from "react-router";

import logo from "assets/images/Logo-white.svg";

export default function Logo() {
  return (
    <div className="block">
      <Link to={"/"}>
        <img src={logo} alt="logotype" onClick={() => window.scrollTo(0, 0)} />
      </Link>
      <p className="max-w-92 mt-6 text-[14px]">
        We are a residential interior design firm located in Portland. Our
        boutique-studio offers more than
      </p>
    </div>
  );
}
