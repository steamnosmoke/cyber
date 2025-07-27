import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import user from "constants/user";

export function usePage<T>(page: string) {
  const userId = user.firebaseId;

  const { data = {}, status } = useQuery<Record<string, T>>({
    queryKey: [page, userId],
    queryFn: async () => {
      const url = `${DB_URL}users/${userId}/${page}.json`;
      const response = await axios.get<Record<string, T>>(url);
      return response.data || {};
    },
    placeholderData: (prev) => prev,
    enabled: !!userId && !!page,
  });

  const items = Object.entries(data).map(([id, value]) => ({
    ...value,
    id,
  })) as (T & { id: string })[];
  return { items, status };
}
