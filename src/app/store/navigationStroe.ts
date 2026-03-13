import { create } from "zustand";
import { persist } from "zustand/middleware";

import { NavigateStore } from "types/NavigationStore";

export const useNavigationStore = create<NavigateStore>()(
  persist(
    (set) => ({
      activePage: 0,
      setActivePage: (page) => set({ activePage: page }),
    }),
    {
      name: "navigation-storage",
      partialize: (state) => ({
        activePage: state.activePage,
      }),
    }
  )
);
