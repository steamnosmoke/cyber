import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { Address } from "types/AuthTypes";

import getdefaultAddress from "./useGetDefaultAddress";

export async function changedefaultAddress(
  address: Address,
  userId: string
): Promise<{ isDefault: string }> {
  const url = `${DB_URL}users/${userId}/addresses`;
  const defaultAddress = await getdefaultAddress(userId);
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

export function useChangeDefaultAddress(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Address) => changedefaultAddress(address, userId),
    mutationKey: ["user", "addresses", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "addresses", userId],
      });
    },
  });
}
