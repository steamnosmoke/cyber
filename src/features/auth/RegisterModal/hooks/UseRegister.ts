import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bcrypt from "bcryptjs";

import { TUser, TLogin } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";


async function registerUser({
  email,
  password,
  confirm,
}: TLogin): Promise<TUser> {
  if (password !== confirm) throw new Error("Passwords not matches");

  const checkUser = await axios.get<TUser>(
    `${DB_URL}users.json?orderBy="email"&equalTo="${email}"`
  );
  if (!checkUser) {
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser: TUser = {
      name: "",
      email,
      role: "customer",
      wishlist: [],
      cart: [],
      orders: [],
      permissions: [],
      phone: "",
      addresses: [],
      passwordHash,
    };

    const { data } = await axios.post<{ name: string }>(
      `${DB_URL}users.json`,
      newUser
    );

    return { ...newUser, firebaseId: data.name };
  } else throw new Error("This e-mail already registered");
}

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["user"],
  });
}
