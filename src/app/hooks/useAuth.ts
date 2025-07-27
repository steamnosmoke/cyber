import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bcrypt from "bcryptjs";

import { TUser, TLogin } from "types/AuthTypes";
import DB_URL from "constants/DB_URL";

async function loginUser({ email, password }: TLogin) {
  const url: string = `${DB_URL}users.json?orderBy="email"&equalTo="${email}"`;
  const response = await axios.get<Record<string, TUser>>(url);
  const users = response.data;

  if (!users || Object.keys(users).length === 0) {
    throw new Error("Пользователь не найден");
  }

  const [firebaseId, userData] = Object.entries(users)[0];

  const passwordMatch = bcrypt.compareSync(password, userData.passwordHash);
  if (!passwordMatch) {
    throw new Error("Неверный пароль");
  }

  return { ...userData, firebaseId };
}

async function registerUser({ email, password }: TLogin) {
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

  const response = await axios.post<{ name: string }>(`${DB_URL}users.json`, newUser);

  return { firebaseId: response.data.name, ...newUser };
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["user"],
  });
}
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["user"],
  });
}
