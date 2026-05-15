
import { useChangeData } from "../store/useChangeData";
import { UserData } from "../types";

export default function useUserData(): UserData[] {
  const user = useChangeData((state) => state.user);
  const { setEmail, setName, setPhone, setBirthday } = useChangeData();

  return [
    {
      type: "text",
      label: "Имя",
      value: user?.name || "",
      placeholder: "Иван",
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
      label: "Телефон",
      value: user?.phone || "",
      placeholder: "+7 999 999 99 99",
      func: setPhone,
    },
    {
      type: "text",
      label: "Дата рождения",
      value: user?.birthday || "",
      placeholder: "2000.01.01",
      func: setBirthday,
    },
  ];
}
