import { NavLink } from "react-router";
import { navs } from "../config/navs";
import { useNavigationStore } from "store/navigationStroe";
import { useNavigateActions } from "../hooks/useNavigateActions";

export default function Navigation() {
  const isActive = useNavigationStore((state) => state.activePage);

  const { onClickNav } = useNavigateActions();

  return (
    <ul className="navigate-list flex items-center justify-between gap-10 ">
      {navs.map((nav, navId) => (
        <li
          className="navigate-point min-w-28 text-center"
          onClick={() => onClickNav(navId)}
          key={navId}
        >
          <NavLink
            to={nav.path}
            className={
              isActive === navId
                ? "navigate-link text-black font-extrabold  cursor-pointer transition-colors duration-200 ease-in-out"
                : "pb-1 px-1 text-gray-700  transition-all duration-200 ease-in-out hover:text-black hover:font-bold"
            }
          >
            {nav.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
