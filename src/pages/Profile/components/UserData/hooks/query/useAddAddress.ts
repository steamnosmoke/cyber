import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { Address } from "types/AuthTypes";
import { changeDefaulAddress } from "./useChangeDefaulAddress";

export async function addAddress(
  address: Address,
  userId: string
): Promise<Address> {
  const url: string = `${DB_URL}users/${userId}/addresses.json`;
  const { data } = await axios.post<{ name: string }>(url, address);

  const newAddress: Address = { ...address, id: data.name };
  changeDefaulAddress(newAddress, userId);
  return newAddress;
}

export function useAddAddress(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Address) => addAddress(address, userId),
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "addresses", userId],
      });
    },
  });
}
