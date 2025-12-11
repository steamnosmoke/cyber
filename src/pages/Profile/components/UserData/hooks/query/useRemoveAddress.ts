import { TAddress } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function removeAddress(address: TAddress, userId: string) {
  await axios.delete<Record<string, TAddress>>(
    `${DB_URL}users/${userId}/addresses/${address.id}.json`
  );
}

export default function useRemoveAddress(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user", "address", userId],
    mutationFn: (address: TAddress) => removeAddress(address, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "address", userId] });
    },
  });
}
