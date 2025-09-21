import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";

import Orders from "./components/Orders";
import BlackButton from "buttons/components/BlackButton";
import BlackLineButton from "buttons/components/BlackLineButton";
import UserData from "./components/UserData";
import { useChangeData } from "./components/UserData/store/useChageData";
import { syncUserData } from "utils/syncUserData";

export default function Profile() {
  const [isData, setIsData] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);
  const clearData = useChangeData((state) => state.clearData);

  useEffect(() => {
    syncUserData();
  }, [user]);

  const onLogOut = () => {
    logOut();
    clearData();
    navigate("/");
  };

  if (user)
    return (
      <section className="flex-grow">
        {user && (
          <div className="container">
            <div className="flex items-center justify-between py-10 px-0 border-b-1 border-b-stone-300">
              <h1 className="hello text-3xl leading-9">
                Hello, {user.name ? user.name : user.email}!
              </h1>
              <div className="buttons flex items-center gap-6">
                <BlackLineButton
                  children="Change your profile"
                  twclass="!px-8"
                  onClick={() => setIsData(!isData)}
                />
                <BlackButton children="Log out" onClick={onLogOut} />
              </div>
            </div>
            <UserData flag={isData} />
            <Orders />
          </div>
        )}
      </section>
    );
}
