
import { useChangeData } from "../store/useChageData";
import { TUserData } from "../types";

export default function useUserData(): TUserData[] {
  const user = useChangeData((state) => state.user);
  const { setEmail, setName, setPhone, setBirthday } = useChangeData();

  return [
    {
      type: "text",
      label: "first name",
      value: user?.name || "",
      placeholder: "Donald",
      func: setName,
    },
    {
      type: "email",
      label: "email",
      value: user?.email || "",
      placeholder: "example@cyber.com",
      func: setEmail,
    },
    {
      type: "phone",
      label: "phone",
      value: user?.phone || "",
      placeholder: "+1 234 567 89 00",
      func: setPhone,
    },
    {
      type: "text",
      label: "birthday",
      value: user?.birthday || "",
      placeholder: "01-01-2000",
      func: setBirthday,
    },
  ];
}
