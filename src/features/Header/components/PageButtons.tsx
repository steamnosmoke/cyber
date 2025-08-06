import { NavLink } from "react-router";

import { useAuthStore } from "store/authStore";

import { useNavigateActions } from "../hooks/useNavigateActions";
import { TButton } from "../types";

import WishlistIcon from "../images/components/WishlistIcon";
import CartIcon from "../images/components/CartIcon";
import ProfileIcon from "../images/components/ProfileIcon";

export default function PageButtons() {
  const { onClickButton, onClickProfile } = useNavigateActions();

  const user = useAuthStore((state) => state.user);

  const buttons: TButton[] = [
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

  return (
    <ul className="header-buttons flex items-center justify-between gap-6">
      {buttons.map((button, buttonId) => (
        <li key={buttonId} className="header-button cursor-pointer">
          <NavLink
            className="header-button-link group"
            to={button.path}
            onClick={(e) => {
              if (button.path === "/profile" && user.firebaseId === "guest") {
                e.preventDefault();
              }
              button.action();
            }}
          >
            {button.src}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
