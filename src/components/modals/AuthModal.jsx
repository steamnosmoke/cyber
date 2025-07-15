import { useAuthStore } from "stores/authStore";
import { useLogin } from "hooks/useAuth";
import { useCallback } from "react";
import BlackLineButton from "buttons/BlackLineButton";

export default function AuthModal({ onClose, onSwitchToRegister }) {
  const { mutate } = useLogin();
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const error = useAuthStore((state) => state.error);

  const onLogin = useCallback(() => {
    mutate(
      { email, password },
      {
        onSuccess: (userData) => {
          setUser(userData);
          onClose();
        },
        onError: (err) => {
          setError(err.message);
        },
      }
    );
  }, []);

  return (
    <div
      className="modal-overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000"
      onClick={onClose}
    >
      <div
        className="modal bg-white p-8 rounded-xl w-full max-w-100 shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-center flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="title text-xl mb-4 text-black">Login</h2>
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

        {error && <p className="error text-red-500 text-base mb-4">{error}</p>}
        <BlackLineButton
          className="login-button py-3 px-10"
          children={"Log in"}
          onClick={onLogin}
        />

        <p className="to-register mt-4 text-base text-black">
          No account?{" "}
          <button
            className="to-register-button text-black font-bold underline cursor-pointer"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
