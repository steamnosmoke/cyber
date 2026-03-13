import { useAuthStore } from "store/authStore";
import { User } from "types/AuthTypes";
import useGeUserById from "hooks/useGeUserById";

import { useSaveUserData } from "./query/useSaveUserData";
import { useGeAddresses } from "./query/useGeAddresses";

import { useChangeData } from "../store/useChageData";

export function useSaveData() {
  const firebaseId = useAuthStore((state) => state.firebaseId);
  const { data: user } = useGeUserById(firebaseId);

  const { mutate: saveData } = useSaveUserData({...user, firebaseId});

  const { data: addresses } = useGeAddresses(firebaseId);

  const seUserData = useChangeData((state) => state.seUser);

  const userData = useChangeData((state) => state.user) || {};
  const defaulAddress = useChangeData((state) => state.defaulAddress);

  const { email, name, phone, birthday } = userData;

  return () => {
    const updatedUser: User = {
      ...user,
      email,
      name,
      phone,
      birthday,
      addresses: addresses,
    };
    saveData(updatedUser);
    seUserData({ ...updatedUser, defaulAddress });
  };
}
