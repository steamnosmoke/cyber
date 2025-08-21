import { useChangeData } from "../store/userData";
import { TUserData } from "../types";

export default function useUserData(): TUserData[] {
  const {
    email,
    name,
    phone,
    birthday,
    setEmail,
    setName,
    setPhone,
    setBirthday,
  } = useChangeData();

  return [
    {
      type: "text",
      label: "first name",
      value: name,
      placeholder: "Donald",
      func: setName,
    },
    {
      type: "email",
      label: "email",
      value: email,
      placeholder: "example@cyber.com",
      func: setEmail,
    },
    {
      type: "phone",
      label: "phone",
      value: phone,
      placeholder: "+1 234 567 89 00",
      func: setPhone,
    },
    {
      type: "text",
      label: "birthday",
      value: birthday,
      placeholder: "01-01-2000",
      func: setBirthday,
    },
  ];
}
