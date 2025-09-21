import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TAddress } from "types/AuthTypes";

export async function getAddresses(userId: string): Promise<TAddress[]> {
  const url = `${DB_URL}users/${userId}/addresses.json`;

  const { data } = await axios.get<Record<string, TAddress> | null>(url);

  return data
    ? Object.entries(data).map(([id, address]) => ({
        ...address,
        id,
      }))
    : [];
}

export function useGetAddresses(userId: string) {
  return useQuery<TAddress[]>({
    queryFn: () => getAddresses(userId),
    queryKey: ["user", "addresses", userId],
  });
}
