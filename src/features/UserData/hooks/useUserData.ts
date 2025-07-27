import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import DB_URL from "constants/DB_URL";
import { TUser } from "types/AuthTypes";

async function changeData(user: TUser) {
  const url: string = `${DB_URL}users.json/${user.firebaseId}`;
  const response = await axios.patch<{user:TUser}>(url, user)
  return user;
}

export function useChangeData(){
    return useMutation({
        mutationFn: changeData,
        mutationKey: ["user"]
    })
}
