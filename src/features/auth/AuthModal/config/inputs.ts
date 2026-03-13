import { useAuthStore } from "store/authStore";
import { Inputs } from "../../types";

export default function useAuthInputs(): Inputs[] {
  const email = useAuthStore((s) => s.email);
  const password = useAuthStore((s) => s.password);
  const setEmail = useAuthStore((s) => s.setEmail);
  const setPassword = useAuthStore((s) => s.setPassword);

  return [
    {
      type: "email",
      label: "email",
      value: email,
      placeholder: "example@cyber.com",
      func: setEmail,
    },
    {
      type: "password",
      label: "Password",
      value: password,
      placeholder: "Password123!",
      func: setPassword,
    },
  ];
}
