import { NavLink } from "react-router";

import { useNavigateActions } from "../../hooks/useNavigateActions";

import logo from "assets/images/Logo-black.svg";

export default function Logo() {
  const { onClickNav } = useNavigateActions();

  return (
    <NavLink
      className="logo cursor-pointer"
      to="/"
      onClick={() => onClickNav(0)}
    >
      <img src={logo} alt="logotype" />
    </NavLink>
  );
}
