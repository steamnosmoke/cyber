import { useAuthStore } from "store/authStore";
import { TUser } from "types/AuthTypes";
import useGetUserById from "hooks/useGetUserById";

import { useSaveUserData } from "./query/useSaveUserData";
import { useGetAddresses } from "./query/useGetAddresses";

import { useChangeData } from "../store/useChageData";

export function useSaveData() {
  const firebaseId = useAuthStore((state) => state.firebaseId);
  const { data: user } = useGetUserById(firebaseId);

  const { mutate: saveData } = useSaveUserData({...user, firebaseId});

  const { data: addresses } = useGetAddresses(firebaseId);

  const setUserData = useChangeData((state) => state.setUser);

  const userData = useChangeData((state) => state.user) || {};
  const defaultAddress = useChangeData((state) => state.defaultAddress);

  const { email, name, phone, birthday } = userData;

  return () => {
    const updatedUser: TUser = {
      ...user,
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
