import { NavLink, useNavigate } from "react-router";
import { useCallback, useMemo } from "react";

import { useProductsStore } from "store/productsStore";
import { useModalStore } from "store/modalStore";
import { useAuthStore } from "store/authStore";
import { useNavigationStore } from "store/navigationStroe";

import { TButton, TNavigate } from "./types";

import logo from "assets/images/Logo.svg";
import WishlistIcon from "./components/WishlistIcon";
import CartIcon from "./components/CartIcon";
import ProfileIcon from "./components/ProfileIcon";
import Search from "./components/Search";

export default function Header() {
  const navigate = useNavigate();
  const isActive = useNavigationStore((state) => state.activePage);
  const setIsActive = useNavigationStore((state) => state.setActivePage);

  const user = useAuthStore((state) => state.user);
  const openAuthModal = useModalStore((state) => state.openAuthModal);
  const setCategory = useProductsStore((state) => state.setCategory);

  const onClickNav = useCallback(
    (i: number) => {
      window.scrollTo(0, 0);
      setCategory("Phones");
      setIsActive(i);
    },
    [setCategory, setIsActive]
  );

  const onClickButton = useCallback(() => {
    window.scrollTo(0, 0);
    setIsActive(-1);
    setCategory("Phones");
  }, [setIsActive, setCategory]);

  const onClickProfile = useCallback(() => {
    if (user) {
      onClickButton();
      navigate("/profile");
    } else {
      openAuthModal();
    }
  }, [onClickButton, openAuthModal, navigate]);

  const navs = useMemo<TNavigate[]>(() => {
    return [
      { path: "/", label: "Home" },
      { path: "/catalog", label: "Catalog" },
      { path: "/contacts", label: "Contact Us" },
      { path: "/blog", label: "Blog" },
    ];
  }, []);

  const buttons = useMemo<TButton[]>(() => {
    return [
      {
        path: "/wishlist",
        src: <WishlistIcon />,
        action: onClickButton,
      },
      {
        path: "/cart",
        src: <CartIcon />,
        action: onClickButton,
      },
      {
        path: "/profile",
        src: <ProfileIcon />,
        action: onClickProfile,
      },
    ];
  }, [onClickButton, onClickProfile]);

  return (
    <>
      <header className="main-header h-22 w-full py-4 bg-white fixed top-0 left-0 right-0 z-999 border-b border-gray-200 shadow-md">
        <div className="container">
          <div className="header-inner flex items-center justify-between">
            <NavLink
              className="logo cursor-pointer"
              to="/"
              onClick={() => onClickNav(0)}
            >
              <img src={logo} alt="logotype" />
            </NavLink>

            <Search />

            <ul className="navigate-list flex items-center justify-between gap-13 *:text-gray-700 *:transition-colors *:duration-100 *:ease-in-out *:hover:text-gray-500">
              {navs.map((nav, navId) => (
                <li
                  className="navigate-point"
                  onClick={() => onClickNav(navId)}
                  key={navId}
                >
                  <NavLink
                    to={nav.path}
                    className={
                      isActive === navId &&
                      "navigate-link text-black font-extrabold  cursor-pointer transition-colors duration-200 ease-in-out"
                    }
                  >
                    {nav.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul className="header-buttons flex items-center justify-between gap-6">
              {buttons.map((button, buttonId) => (
                <li
                  key={buttonId}
                  onClick={button.action}
                  className="header-button cursor-pointer"
                >
                  <NavLink
                    className="header-button-link group "
                    to={button.path}
                  >
                    {button.src}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <div className="header-background relative h-22"></div>
    </>
  );
}
