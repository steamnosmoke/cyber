import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bcrypt from "bcryptjs";

const DB_URL =
  "https://e-store-4ca3a-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function loginUser({ email, password }) {
  const url = `${DB_URL}?orderBy="email"&equalTo="${email}"`;
  const response = await axios.get(url);
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

async function registerUser({ email, password }) {
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = {
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

  const response = await axios.post(DB_URL, newUser);

  return { ...newUser, firebaseId: response.data.name };
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
