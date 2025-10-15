import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import { useModalStore } from "store/modalStore";
import { useNavigationStore } from "store/navigationStroe";
import { useProductStore } from "store/productsStore";

export function useNavigateActions() {
  const navigate = useNavigate();
  const firebaseId = useAuthStore((s) => s.firebaseId);
  const setCategory = useProductStore((s) => s.setCategory);
  const setIsActive = useNavigationStore((s) => s.setActivePage);
  const openAuthModal = useModalStore((s) => s.openAuthModal);

  const onClickNav = useCallback(
    (i: number) => {
      window.scrollTo(0, 0);
      setCategory("Phones");
      setIsActive(i);
    },
    [setCategory, setIsActive]
  );

  const onClickButton = useCallback(() => {
    window.scrollTo(0, 0);
    setIsActive(-1);
    setCategory("Phones");
  }, [setIsActive, setCategory]);

  const onClickProfile = useCallback(() => {
    if (firebaseId !== "guest") {
      window.scrollTo(0, 0);
      setIsActive(-1);
      setCategory("Phones");
      navigate("/profile");
    } else {
      openAuthModal();
    }
  }, [firebaseId, setIsActive, setCategory, navigate, openAuthModal]);

  return { onClickNav, onClickButton, onClickProfile };
}
