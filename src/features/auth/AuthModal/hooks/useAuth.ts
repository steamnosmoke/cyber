import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bcrypt from "bcryptjs";

import { TUser, TLogin } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";

async function loginUser({ email, password }: TLogin): Promise<TUser> {
  const url: string = `${DB_URL}users.json?orderBy="email"&equalTo="${email}"`;
  const { data: user } = await axios.get<Record<string, TUser>>(url);
  if (!user || Object.values(user).length === 0) {
    throw new Error("The user was not found");
  }

  const [firebaseId, userData] = Object.entries(user)[0];
  const passwordMatch = bcrypt.compareSync(password, userData.passwordHash);
  if (!passwordMatch) {
    throw new Error("Uncorrect password");
  }

  return { firebaseId, ...userData };
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["user"],
  });
}
