import { useAuthStore } from "store/authStore";
import { User } from "types/AuthTypes";

import { useSaveUserData } from "./useSaveUserData";
import { useGetAddresses } from "./useGetAddresses";

import { useChangeData } from "../../store/useChangeData";

export function useSaveData() {
  const userId = useAuthStore((state) => state.firebaseId);

  const { mutate: saveData } = useSaveUserData(userId);

  const { data: addresses } = useGetAddresses(userId);

  const setUserData = useChangeData((state) => state.setUser);

  const userData = useChangeData((state) => state.user) || {};
  const defaultAddress = useChangeData((state) => state.defaultAddress);

  const { email, name, phone, birthday } = userData;

  return () => {
    const updatedUser: User = {
      email,
      name,
      phone,
      birthday,
      addresses: addresses,
    };
    saveData(updatedUser);
    setUserData({ ...updatedUser, defaultAddress });
  };
}
