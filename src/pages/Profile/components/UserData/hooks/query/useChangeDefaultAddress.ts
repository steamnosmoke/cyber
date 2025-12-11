import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TAddress } from "types/AuthTypes";

import getDefaultAddress from "./useGetDefaultAddress";

export async function changeDefaultAddress(
  address: TAddress,
  userId: string
): Promise<{ isDefault: string }> {
  const url = `${DB_URL}users/${userId}/addresses`;
  const defaultAddress = await getDefaultAddress(userId);
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
    mutationFn: (address: TAddress) => changeDefaultAddress(address, userId),
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}
