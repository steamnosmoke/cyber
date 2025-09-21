import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import { useRegister } from "./hooks/UseRegister";

import { TModalProps } from "../types";
import { useOpenModal } from "../utils/useOpenModal";


import BlackLineButton from "buttons/components/BlackLineButton";
import close from "images/clear.svg";

import RegisterInputs from "./components/RegisterInputs";
export default function RegisterModal({
  onClose,
  onSwitchToLogin,
}: TModalProps) {
  const navigate = useNavigate();

  const { mutate: register } = useRegister();

  const email = useAuthStore((s) => s.email);
  const password = useAuthStore((s) => s.password);
  const confirm = useAuthStore((s) => s.confirm);
  const error = useAuthStore((state) => state.error);

  const setError = useAuthStore((state) => state.setError);
  const setUser = useAuthStore((state) => state.setUser);

  const onRegister = () => {
    setError("");
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
  const [closing, setClosing] = useState(false);

  const onClickClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useOpenModal();

  useEffect(() => {
    setClosing(false);
  }, []);

  return (
    <div
      className={`modal-overlay fixed top-0 left-0  w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000 transition-all duration-200 ${
        closing ? "close" : ""
      }`}
      onClick={onClickClose}
    >
      <div
        className="modal relative bg-white py-8 px-16 rounded-xl w-full max-w-120 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={close}
          className="absolute top-4 right-4 w-3 h-3 cursor-pointer transition-all duration-100 hover:opacity-70"
          onClick={onClickClose}
        ></img>
        <h2 className="title text-xl mb-4 text-black">Register</h2>

        <RegisterInputs />

        {error && <p className="error text-red-500 text-base mb-4">{error}</p>}
        <BlackLineButton
          twclass={"login-button !py-4 !w-full"}
          children={"Register"}
          onClick={onRegister}
          type={"button"}
        />

        <p className="to-login mt-4 text-base text-black">
          Already have an account?{" "}
          <span
            className="to-register-button text-black font-bold underline cursor-pointer transition-all duration-200 hover:opacity-70"
            onClick={onSwitchToLogin}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
