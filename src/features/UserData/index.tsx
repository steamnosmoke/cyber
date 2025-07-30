import { useCallback, useMemo } from "react";

import { useAuthStore } from "store/authStore";
import { TUser } from "types/AuthTypes";

import {
  useGetAddresses,
  useSaveData,
} from "./hooks/useUserData";
import { useChangeData } from "./store/userData";
import { TUserData } from "./types";

import BlackButton from "buttons/components/BlackButton";

import Addresses from "./components/Addresses";

export default function UserData() {
  const user = useAuthStore((state) => state.user);

  const email = useChangeData((state) => state.email);
  const name = useChangeData((state) => state.name);
  const phone = useChangeData((state) => state.phone);
  const birthday = useChangeData((state) => state.birthday);

  const setEmail = useChangeData((state) => state.setEmail);
  const setName = useChangeData((state) => state.setName);
  const setPhone = useChangeData((state) => state.setPhone);
  const setBirthday = useChangeData((state) => state.setBirthday);

  const setUser = useAuthStore(state=>state.setUser)

  const { data: addresses } = useGetAddresses();

  const { mutate: saveData } = useSaveData();

  const onClickSave = useCallback(() => {
    const updatedUser: TUser = {
      email,
      name,
      phone,
      birthday,
      addresses: addresses,
    };
    saveData(updatedUser);
    setUser({...user, ...updatedUser})

  }, [email, name, phone, birthday, saveData]);

  const userData = useMemo<TUserData[]>(
    () => [
      {
        label: "first name",
        value: name,
        placeholder: "Donald",
        func: setName,
      },
      {
        label: "email",
        value: email,
        placeholder: "example@cyber.com",
        func: setEmail,
      },
      {
        label: "phone",
        value: phone,
        placeholder: "+1 234 567 89 00",
        func: setPhone,
      },
      {
        label: "birthday",
        value: birthday,
        placeholder: "01-01-2000",
        func: setBirthday,
      },
    ],
    [user, email, name, phone, birthday]
  );

  const onChange = useCallback(
    (func: (e: string) => void, e: string) => {
      func(e);
    },
    [user, email, name, phone, birthday]
  );
  return (
    <section className="userdata mt-4 mx-auto justify-items-center w-full border-b-1 border-b-stone-300 pb-8">
      <h2 className="title text-2xl mb-4 text-center">
        Change your personal data
      </h2>
      <ul className="list flex flex-col gap-4 max-w-150 w-full">
        {userData.map((el) => (
          <li key={el.label} className="relative">
            <label
              htmlFor={el.label}
              className="capitalize absolute left-4 top-2 text-[14px] cursor-text"
            >
              {el.label}
            </label>
            <input
              className="pt-8 px-4 pb-2 border-1 border-stone-300 rounded-lg max-w-150 w-full placeholder:text-stone-500  transition-all duration-200 hover:border-black"
              type="text"
              name={el.label}
              placeholder={el.placeholder}
              id={el.label}
              value={el.value}
              onChange={(e) => onChange(el.func, e.target.value)}
            />
          </li>
        ))}
        <li>
          <Addresses />
        </li>
      </ul>
      <BlackButton
        children="Save changes"
        twclass="mt-4 !max-w-150 !w-full"
        onClick={() => onClickSave()}
      />
    </section>
  );
}
