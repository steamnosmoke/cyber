import { useQuery} from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TAddress, TUser } from "types/AuthTypes";

export async function getAddresses(): Promise<TAddress[]> {
  const user: TUser = useAuthStore.getState().user;
  const url = `${DB_URL}users/${user.firebaseId}/addresses.json`;

  const { data } = await axios.get<Record<string, TAddress> | null>(url);

  return Object.values(data)
    ? Object.entries(data).map(([id, address]) => ({
        ...address,
        id,
      }))
    : [];
}

export function useGetAddresses() {
  return useQuery<TAddress[]>({
    queryFn: getAddresses,
    queryKey: ["user", "addresses"],
    
  });
}