import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TAddress } from "types/AuthTypes";
import { changeDefaultAddress } from "./useChangeDefaultAddress";

export async function addAddress(address: TAddress): Promise<{ name: string }> {
  const userId: string = useAuthStore.getState().user.firebaseId;
  const url: string = `${DB_URL}users/${userId}/addresses.json`;
  const { data } = await axios.post<{ name: string }>(url, address);
  changeDefaultAddress({ ...address, id: data.name });
  return data;
}

export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    mutationKey: ["user", "addresses"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}