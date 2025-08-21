import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import DB_URL from "constants/DB_URL";

import { useAuthStore } from "store/authStore";
import { TUser } from "types/AuthTypes";

export async function saveData(updatedUser: TUser): Promise<TUser> {
  const user: TUser = useAuthStore.getState().user;
  const url: string = `${DB_URL}users/${user.firebaseId}.json`;
  const { data } = await axios.patch<TUser>(url, updatedUser);
  return { ...user, ...data };
}

export function useSaveUserData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveData,
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "addresses"] });
    },
  });
}
