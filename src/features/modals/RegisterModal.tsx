import { useNavigate } from "react-router";
import { useMemo } from "react";

import { useAuthStore } from "store/authStore";
import { useRegister } from "hooks/useAuth";

import { TInputs } from "./types";

import BlackLineButton from "buttons/components/BlackLineButton";
import close from "images/clear.svg";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const navigate = useNavigate();

  const email = useAuthStore((state) => state.email);
  const error = useAuthStore((state) => state.error);
  const password = useAuthStore((state) => state.password);
  const confirm = useAuthStore((state) => state.confirm);

  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirm = useAuthStore((state) => state.setConfirm);
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);

  const { mutate: register } = useRegister();

  const onRegister = () => {
    register(
      { email, password, confirm },
      {
        onSuccess: (userData) => {
          setUser(userData);
          onClose();
          navigate("/profile");
        },
        onError: (err) => {
          setError(err.message);
        },
      }
    );
  };

  const inputs = useMemo<TInputs[]>(
    () => [
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
      {
        type: "password",
        label: "Confirm password",
        value: confirm,
        placeholder: "Password123!",
        func: setConfirm,
      },
    ],
    [email, password, confirm]
  );

  return (
    <div
      className="modal-overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000"
      onClick={onClose}
    >
      <div
        className="modal relative bg-white py-8 px-16 rounded-xl w-full max-w-120 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={close}
          className="absolute top-4 right-4 w-3 h-3 cursor-pointer transition-all duration-100 hover:opacity-70"
          onClick={onClose}
        ></img>
        <h2 className="title text-xl mb-4 text-black">Register</h2>

        <ul className="list flex flex-col gap-4 max-w-150 w-full">
          {inputs.map((el) => (
            <li key={el.label} className="relative">
              <label
                htmlFor={el.label}
                className="capitalize absolute left-4 top-2 text-[14px] cursor-text"
              >
                {el.label}
              </label>
              <input
                className="pt-8 px-4 pb-2 border-1 border-stone-300 rounded-lg max-w-150 w-full placeholder:text-stone-500  transition-all duration-200 hover:border-black"
                type={el.type}
                name={el.label}
                placeholder={el.placeholder}
                id={el.label}
                value={el.value}
                onChange={(e) => el.func(e.target.value)}
              />
            </li>
          ))}
        </ul>

        {error && <p className="error text-red-500 text-base mb-4">{error}</p>}
        <BlackLineButton
          twclass={"login-button !py-4 !w-full"}
          children={"Register"}
          onClick={onRegister}
          type={"button"}
        />

        <p className="to-login mt-4 text-base text-black">
          Already have an account?{" "}
          <button
            className="to-register-button text-black font-bold underline cursor-pointer transition-all duration-200 hover:opacity-70"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
