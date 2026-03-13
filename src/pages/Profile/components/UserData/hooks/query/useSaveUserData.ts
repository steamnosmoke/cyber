import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { User } from "types/AuthTypes";

export async function saveData(updatedUser: User): Promise<User> {
  const url: string = `${DB_URL}users/${updatedUser.firebaseId}.json`;
  const { data } = await axios.patch<User>(url, updatedUser);
  return { ...updatedUser, ...data };
}

export function useSaveUserData(user: User) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: User) => saveData(updatedUser),
    mutationKey: ["user", user.firebaseId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user.firebaseId] });
    },
  });
}
