import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { User } from "types/AuthTypes";

export async function saveData(
  updatedUser: User,
  userId: string,
): Promise<User> {
  const url: string = `${DB_URL}users/${userId}.json`;
  const { data } = await axios.patch<User>(url, updatedUser);
  return { ...updatedUser, ...data };
}

export function useSaveUserData(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: User) => saveData(updatedUser, userId),
    mutationKey: ["user", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
}
