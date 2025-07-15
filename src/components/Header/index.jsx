import { NavLink, useNavigate } from "react-router";
import { useCallback, useMemo, useState } from "react";

import logo from "../../assets/images/Logo.svg";
import WishlistIcon from "./images/icons/WishlistIcon";
import CartIcon from "./images/icons/CartIcon";
import ProfileIcon from "./images/icons/ProfileIcon";

import Search from "./Search";

import { useProductsStore } from "../../zustand/productsStore";
import { useModalStore } from "../../zustand/modalStore";
import { useAuthStore } from "../../zustand/authStore";

export default function Header() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(0);

  const user = useAuthStore((state) => state.user);
  const openAuthModal = useModalStore((state) => state.openAuthModal);
  const setCategory = useProductsStore((state) => state.setCategory);

  const onClickNav = useCallback(
    (i) => {
      window.scrollTo(0, 0);
      setCategory("Phones");
      setIsActive(i);
    },
    [isActive]
  );

  const onClickButton = useCallback(() => {
    window.scrollTo(0, 0);
    setIsActive(-1);
    setCategory("Phones");
  }, []);

  const onClickProfile = useCallback(() => {
    if (user) {
      onClickButton();
      navigate("/profile");
    } else {
      openAuthModal();
    }
  },[]);

  const navs = useMemo(() => {
    return [
      { path: "/", label: "Home" },
      { path: "/catalog", label: "Catalog" },
      { path: "/contacts", label: "Contact Us" },
      { path: "/blog", label: "Blog" },
    ];
  }, []);

  const buttons = useMemo(() => {
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
  }, []);

  return (
    <>
      <header className="main-header h-22 w-full py-4 bg-white fixed top-0 left-0 right-0 z-999 border-b border-gray-200 shadow-md">
        <div className="container">
          <div className="header-inner flex items-center justify-between">
            <NavLink
              className="logo cursor-pointer"
              to="/"
              onClick={onClickNav}
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
