import { useAuthStore } from "store/authStore";
import { TUser } from "types/AuthTypes";

import { useSaveUserData } from "./useSaveUSerData";
import { useGetAddresses } from "./useGetAddresses";

import { useChangeData } from "../store/userData";

export function useSaveData() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const email = useChangeData((state) => state.email);
  const name = useChangeData((state) => state.name);
  const phone = useChangeData((state) => state.phone);
  const birthday = useChangeData((state) => state.birthday);

  const { mutate: saveData } = useSaveUserData();
  const { data: addresses } = useGetAddresses();

  return () => {
    const updatedUser: TUser = {
      email,
      name,
      phone,
      birthday,
      addresses: addresses,
    };
    saveData(updatedUser);
    setUser({ ...user, ...updatedUser });
  };
}
