import { useAuthStore } from "store/authStore";
import { User } from "types/AuthTypes";

import { useSaveUserData } from "./useSaveUserData";
import { useGeAddresses } from "./useGeAddresses";

import { useChangeData } from "../../store/useChageData";

export function useSaveData() {
  const user = useAuthStore((state) => state.user);

  const { mutate: saveData } = useSaveUserData();

  const { data: addresses } = useGeAddresses(user.firebaseId);

  const seUser = useAuthStore((state) => state.seUser);
  const seUserData = useChangeData((state) => state.seUser);

  const userData = useChangeData((state) => state.user) || {};
  const defaulAddress = useChangeData((state) => state.defaulAddress);

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
    seUser({ ...user, ...updatedUser });
    seUserData({ ...updatedUser, defaulAddress });
  };
}
