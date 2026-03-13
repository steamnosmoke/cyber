import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import { useModalStore } from "store/modalStore";
import { useNavigationStore } from "store/navigationStroe";
import { useProductStore } from "store/productsStore";

export function useNavigateActions() {
  const navigate = useNavigate();
  const firebaseId = useAuthStore((s) => s.firebaseId);
  const seCategory = useProductStore((s) => s.seCategory);
  const setIsActive = useNavigationStore((s) => s.setActivePage);
  const openAuthModal = useModalStore((s) => s.openAuthModal);

  const onClickNav = useCallback(
    (i: number) => {
      window.scrollTo(0, 0);
      seCategory("Phones");
      setIsActive(i);
    },
    [seCategory, setIsActive]
  );

  const onClickButton = useCallback(() => {
    window.scrollTo(0, 0);
    setIsActive(-1);
    seCategory("Phones");
  }, [setIsActive, seCategory]);

  const onClickProfile = useCallback(() => {
    if (firebaseId !== "guest") {
      window.scrollTo(0, 0);
      setIsActive(-1);
      seCategory("Phones");
      navigate("/profile");
    } else {
      openAuthModal();
    }
  }, [firebaseId, setIsActive, seCategory, navigate, openAuthModal]);

  return { onClickNav, onClickButton, onClickProfile };
}
