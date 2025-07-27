import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";

import Orders from "features/Orders";
import BlackButton from "buttons/components/BlackButton";
import BlackLineButton from "buttons/components/BlackLineButton";
import UserData from "features/UserData";

export default function Profile() {
  const [isData, setIsData] = useState(false);
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
              <BlackButton children="Log out" onClick={() => logOut} />
            </div>
          </div>
          {isData && <UserData />}
          <Orders />
        </div>
      )}
    </section>

    // <section className="profile">
    //   <div className="container">
    //     <div className="flex items-center justify-between py-10 px-0 border-b-1 border-b-stone-300">
    //       <h1 className="hello text-3xl leading-9">
    //         Hello, {user.name ? user.name : user.email}!
    //       </h1>
    //     </div>
    //   </div>
    // </section>
  );
}
