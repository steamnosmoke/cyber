import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "store/authStore";
import { useModalStore } from "store/modalStore";
import { useNavigationStore } from "store/navigationStroe";
import { useProductStore } from "store/productsStore";
import { useSearchStore } from "store/searchStore";

export function useNavigateActions() {
  const navigate = useNavigate();
  const firebaseId = useAuthStore((s) => s.firebaseId);
  const setCategory = useProductStore ((s) => s.setCategory);
  const setIsActive = useNavigationStore((s) => s.setActivePage);
  const openAuthModal = useModalStore((s) => s.openAuthModal);
  const setAriaOpened = useSearchStore((state) => state.setAriaOpened);

  const onClickNav = useCallback(
    (i: number) => {
      window.scrollTo(0, 0);
      setIsActive(i);
      setAriaOpened(false);
    },
    [setCategory, setIsActive],
  );

  const onClickButton = useCallback(() => {
    window.scrollTo(0, 0);
    setAriaOpened(false);
    setIsActive(-1);
  }, [setIsActive, setCategory]);

  const onClickProfile = useCallback(() => {
    if (firebaseId !== "guest") {
      window.scrollTo(0, 0);
      setIsActive(-1);
      navigate("/profile");
    } else {
      openAuthModal();
    }
    setAriaOpened(false);
  }, [firebaseId, setIsActive, setCategory, navigate, openAuthModal]);

  return { onClickNav, onClickButton, onClickProfile };
}
