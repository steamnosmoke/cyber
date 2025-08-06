import { useAuthStore } from "store/authStore";
import { TInputs } from "../../types";

export default function useAuthInputs(): TInputs[] {
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
