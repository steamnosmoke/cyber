import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import useGetUserById from "hooks/useGetUserById";

import Orders from "./components/Orders";
import UserData from "./components/UserData";
import { useChangeData } from "./components/UserData/store/useChageData";
import BlackButton from "buttons/components/BlackButton";
import BlackLineButton from "buttons/components/BlackLineButton";

export default function Profile() {
  const [isData, setIsData] = useState(false);
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.firebaseId);
  const logOut = useAuthStore((state) => state.logOut);
  const clearData = useChangeData((state) => state.clearData);
  const setUser = useChangeData((state) => state.setUser);

  const { data: user } = useGetUserById(userId);

  const onLogOut = () => {
    logOut();
    clearData();
    navigate("/");
  };

  useEffect(() => {
    setUser(user);
  }, [user]);

  if (userId !== "guest")
    return (
      <section className="flex-grow">
        <div className="container min-h-[calc(100vh-120px)]">
          <div className="flex items-center justify-between py-8 px-0 ">
            <h1 className="hello text-2xl leading-9">
              Hello, {user?.name ? user?.name : user?.email}!
            </h1>
            <div className="buttons flex items-center gap-6">
              <BlackLineButton
                children="Change your profile"
                twclass="!px-8 !py-3 !text-base"
                onClick={() => setIsData(!isData)}
              />
              <BlackButton children="Log out" onClick={onLogOut} />
            </div>
          </div>
          <UserData flag={isData} />
          <Orders />
        </div>
      </section>
    );
}
