import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TAuthModalStore } from "types/ModalTypes";

export const useModalStore = create<TAuthModalStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "modal-storage",
      partialize: (state) => ({
        auth: state.isAuthModalOpen,
        reg: state.isRegisterModalOpen,
      }),
    }
  )
);
