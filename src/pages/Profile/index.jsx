import { useNavigate } from "react-router";
import Orders from "./components/Orders";
import { useAuthStore } from "../../zustand/authStore";
import { useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="flex-grow">
      {user && (
        <div className="container">
          <div className="flex items-center justify-between py-10 px-0">
            <p className="hello text-2xl leading-9">Hello, {user.email}</p>
            <button className="black-btn" onClick={() => logOut()}>
              Log out
            </button>
          </div>
          <Orders />
        </div>
      )}
    </section>
  );
}
