import { useEffect } from "react";

import { useModalStore } from "store/modalStore";
import RoutesComponent from "./app/router";

import { useSearchStore } from "./features/Header/store/searchStore";

import Header from "./features/Header";
import Footer from "./features/Footer";
import RegisterModal from "./features/auth/RegisterModal";
import AuthModal from "./features/auth/AuthModal";
import ScrollTopButton from "./features/scrollButton";
import SearchAria from "./features/SearchAria";

export default function App() {
  const openAuthModal = useModalStore((state) => state.openAuthModal);
  const openRegisterModal = useModalStore((state) => state.openRegisterModal);
  const closeModals = useModalStore((state) => state.closeModals);
  const isAuthModalOpen = useModalStore((state) => state.isAuthModalOpen);
  const isRegisterModalOpen = useModalStore(
    (state) => state.isRegisterModalOpen
  );

  const ariaOpened = useSearchStore((state) => state.ariaOpened);

  useEffect(() => {
    if (ariaOpened) {
      document.body.classList.add("overflow-y-hidden");
      document.body.classList.add("bg-transparent");
      document.body.classList.add("pr-5");
    } else {
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.remove("bg-transparent");
      document.body.classList.remove("pr-5");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {ariaOpened && <SearchAria />}
      <RoutesComponent />

      <Footer />

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => closeModals()}
          onSwitchToRegister={() => openRegisterModal()}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => closeModals()}
          onSwitchToLogin={() => openAuthModal()}
        />
      )}

      {!isAuthModalOpen && !isRegisterModalOpen && <ScrollTopButton />}
    </div>
  );
}
