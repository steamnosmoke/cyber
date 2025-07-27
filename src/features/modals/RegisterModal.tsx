import { useNavigate } from "react-router";
import { useCallback } from "react";

import { useAuthStore } from "store/authStore";
import { useRegister } from "hooks/useAuth";

import BlackLineButton from "buttons/components/BlackLineButton";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const { mutate } = useRegister();
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setConfirm = useAuthStore((state) => state.setConfirm);
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);
  const email = useAuthStore((state) => state.email);
  const error = useAuthStore((state) => state.error);
  const password = useAuthStore((state) => state.password);
  const confirm = useAuthStore((state) => state.confirm);
  const navigate = useNavigate();
  
  const onRegister = () => {
    const correct = useCallback(() => {
      mutate(
        { email, password },
        {
          onSuccess: (userData) => {
            setUser(userData);
          },
          onError: (err) => {
            setError(err.message);
          },
        }
      );
      onClose();
      navigate("/profile");
    }, []);
    password === confirm ? correct() : setError("Passwords not matches");
  };

  return (
    <div
      className="modal-overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000"
      onClick={onClose}
    >
      <div
        className="modal bg-white p-8 rounded-xl w-full max-w-100 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="title text-xl mb-4 text-black">Register</h2>

        <input
          className="modal-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="modal-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <input
          className="modal-input"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm Password"
        />

        {error && <p className="error text-red-500 text-base mb-4">{error}</p>}
        <BlackLineButton
          twclass={"login-button py-3 px-10"}
          children={"Register"}
          onClick={onRegister}
          type={"button"}
        />

        <p className="to-login mt-4 text-base text-black">
          Already have an account?{" "}
          <button
            className="to-register-button text-black font-bold underline cursor-pointer"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
