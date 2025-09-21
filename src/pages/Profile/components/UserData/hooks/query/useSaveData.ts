import { useAuthStore } from "store/authStore";
import { TUser } from "types/AuthTypes";

import { useSaveUserData } from "./useSaveUserData";
import { useGetAddresses } from "./useGetAddresses";

import { useChangeData } from "../../store/useChageData";

export function useSaveData() {
  const user = useAuthStore((state) => state.user);

  const { mutate: saveData } = useSaveUserData();

  const { data: addresses } = useGetAddresses(user.firebaseId);

  const setUser = useAuthStore((state) => state.setUser);
  const setUserData = useChangeData((state) => state.setUser);

  const userData = useChangeData((state) => state.user) || {};
  const defaultAddress = useChangeData((state) => state.defaultAddress);

  const { email, name, phone, birthday } = userData;

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
    setUserData({ ...updatedUser, defaultAddress });
  };
}
