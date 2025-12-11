import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { TUser } from "types/AuthTypes";

export async function saveData(updatedUser: TUser): Promise<TUser> {
  const url: string = `${DB_URL}users/${updatedUser.firebaseId}.json`;
  const { data } = await axios.patch<TUser>(url, updatedUser);
  return { ...updatedUser, ...data };
}

export function useSaveUserData(user: TUser) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: TUser) => saveData(updatedUser),
    mutationKey: ["user", user.firebaseId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user.firebaseId] });
    },
  });
}
