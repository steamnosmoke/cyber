import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { Address } from "types/AuthTypes";

import getDefaulAddress from "./useGetDefaulAddress";

export async function changeDefaulAddress(
  address: Address,
  userId: string
): Promise<{ isDefault: string }> {
  const url = `${DB_URL}users/${userId}/addresses`;
  const defaulAddress = await getDefaulAddress(userId);
  if (defaulAddress && defaulAddress.id !== address.id) {
    await axios.patch(`${url}/${defaulAddress.id}.json`, {
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

export function useChangeDefaulAddress(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Address) => changeDefaulAddress(address, userId),
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}
