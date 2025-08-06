import { useAuthStore } from "store/authStore";
import { useModalStore } from "store/modalStore";
import { useNavigationStore } from "store/navigationStroe";
import { useProductStore } from "store/productsStore";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export function useNavigateActions() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setCategory = useProductStore((s) => s.setCategory);
  const setIsActive = useNavigationStore((s) => s.setActivePage);
  const openAuthModal = useModalStore((s) => s.openAuthModal);

  const onClickNav = useCallback((i: number) => {
    window.scrollTo(0, 0);
    setCategory("Phones");
    setIsActive(i);
  }, []);

  const onClickButton = useCallback(() => {
    window.scrollTo(0, 0);
    setIsActive(-1);
    setCategory("Phones");
  }, []);

  const onClickProfile = useCallback(() => {
    if (user.firebaseId !== "guest") {
      setIsActive(-1);
      setCategory("Phones");
      navigate("/profile");
    } else {
      openAuthModal();
    }
  }, [user]);

  return { onClickNav, onClickButton, onClickProfile };
}
