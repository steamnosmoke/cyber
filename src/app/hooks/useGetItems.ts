import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";
import { useAuthStore } from "../store/authStore";

async function getItems<T>(
  page: string,
  userId: string
): Promise<Record<string, T>> {
  if (userId === "guest") {
    return JSON.parse(localStorage.getItem(`guest-${page}`)) || {};
  }
  const url = `${DB_URL}users/${userId}/${page}.json`;
  const response = await axios.get<Record<string, T>>(url);
  return response.data || {};
}

export function useGetItems<T>(page: string) {
  const user = useAuthStore((state) => state.user);
  const userId = user ? user.firebaseId : "guest";
  const { data = {}, status } = useQuery<Record<string, T>>({
    queryKey: [page, userId],
    queryFn: () => getItems<T>(page, userId),
    placeholderData: (prev) => prev,
    enabled: !!userId && !!page,
  });

  const items = data
    ? (Object.entries(data).map(([id, value]) => ({
        ...value,
        id,
      })) as (T & { id: string })[])
    : [];

  return { items, status };
}
