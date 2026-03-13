import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { Address } from "types/AuthTypes";

export async function geAddresses(userId: string): Promise<Address[]> {
  const url = `${DB_URL}users/${userId}/addresses.json`;

  const { data } = await axios.get<Record<string, Address> | null>(url);

  return data
    ? Object.entries(data).map(([id, address]) => ({
        ...address,
        id,
      }))
    : [];
}

export function useGeAddresses(userId: string) {
  return useQuery<Address[]>({
    queryFn: () => geAddresses(userId),
    queryKey: ["user", "addresses", userId],
  });
}
