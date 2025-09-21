import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TAddress, TUser } from "types/AuthTypes";

import useGetDefaultAddress from "./useGetDefaultAddress";

export async function changeDefaultAddress(
  address: TAddress
): Promise<{ isDefault: string }> {
  const user: TUser = useAuthStore.getState().user;
  const url = `${DB_URL}users/${user.firebaseId}/addresses`;
  const defaultAddress = await useGetDefaultAddress();
  if (defaultAddress && defaultAddress.id !== address.id) {
    await axios.patch(`${url}/${defaultAddress.id}.json`, {
      isDefault: false,
    });
  }

  const { data } = await axios.patch<{ isDefault: string }>(
    `${url}/${address.id}.json`,
    {
      isDefault: true,
    }
  );

  return { ...address, ...data };
}

export function useChangeDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeDefaultAddress,
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}
