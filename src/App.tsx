import { useModalStore } from "store/modalStore";

import Header from "./features/Header";
import Footer from "./features/Footer";
import RegisterModal from "./features/auth/RegisterModal";
import AuthModal from "./features/auth/AuthModal";
import RoutesComponent from "./app/router";
import ScrollTopButton from "./features/scrollButton";

export default function App() {
  const openAuthModal = useModalStore((state) => state.openAuthModal);
  const openRegisterModal = useModalStore((state) => state.openRegisterModal);
  const closeModals = useModalStore((state) => state.closeModals);
  const isAuthModalOpen = useModalStore((state) => state.isAuthModalOpen);
  const isRegisterModalOpen = useModalStore(
    (state) => state.isRegisterModalOpen
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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

      {!isAuthModalOpen && !isRegisterModalOpen && (
        <ScrollTopButton />
      )}
    </div>
  );
}
