export interface AuthModalStore {
  isAuthModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openAuthModal: () => void;
  openRegisterModal: () => void;
  closeModals: () => void;
};