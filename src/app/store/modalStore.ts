import { create } from "zustand";

import { AuthModalStore } from "types/ModalTypes";

export const useModalStore = create<AuthModalStore>()((set) => ({
  isAuthModalOpen: false,
  isRegisterModalOpen: false,

  openAuthModal: () =>
    set(() => ({
      isAuthModalOpen: true,
      isRegisterModalOpen: false,
    })),
  openRegisterModal: () =>
    set(() => ({
      isAuthModalOpen: false,
      isRegisterModalOpen: true,
    })),
  closeModals: () =>
    set(() => ({
      isAuthModalOpen: false,
      isRegisterModalOpen: false,
    })),
}));
