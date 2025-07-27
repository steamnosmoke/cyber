import { useModalStore } from "store/modalStore";

import Header from "./features/Header";
import Footer from "./features/Footer";
import RegisterModal from "./features/modals/RegisterModal";
import AuthModal from "./features/modals/AuthModal";
import RoutesComponent from "./app/router";

function App() {
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

      <Footer />
    </div>
  );
}

export default App;
