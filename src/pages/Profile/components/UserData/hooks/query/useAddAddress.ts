import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TAddress } from "types/AuthTypes";
import { changeDefaultAddress } from "./useChangeDefaultAddress";

export async function addAddress(
  address: TAddress,
  userId: string
): Promise<TAddress> {
  const url: string = `${DB_URL}users/${userId}/addresses.json`;
  const { data } = await axios.post<{ name: string }>(url, address);

  const newAddress: TAddress = { ...address, id: data.name };
  changeDefaultAddress(newAddress, userId);
  return newAddress;
}

export function useAddAddress(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: TAddress) => addAddress(address, userId),
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "addresses", userId],
      });
    },
  });
}
