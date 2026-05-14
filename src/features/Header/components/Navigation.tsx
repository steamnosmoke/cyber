import { NavLink } from "react-router";
import { navs } from "../config/navs";
import { useNavigationStore } from "store/navigationStroe";
import { useNavigateActions } from "hooks/useNavigateActions";

export default function Navigation() {
  const isActive = useNavigationStore((state) => state.activePage);

  const { onClickNav } = useNavigateActions();

  return (
    <ul className="navigate-list flex items-center justify-between gap-10 ">
      {navs.map((nav, navId) => (
        <li
          className="navigate-point min-w-30 text-center"
          onClick={() => onClickNav(navId)}
          key={navId}
        >
          <NavLink
            to={nav.path}
            className={` cursor-pointer transition-colors duration-200 ease-in-out 
              ${
                isActive === navId
                  ? "text-black font-bold"
                  : "text-gray-700 hover:text-black hover:font-bold"
              }`}
          >
            {nav.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
