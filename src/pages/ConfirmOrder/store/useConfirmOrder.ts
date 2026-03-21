import { create } from "zustand";
import confirmOrder from "../types/storeType";
import { persist } from "zustand/middleware";

const useConfirmOrder = create<confirmOrder>()(
  persist(
    (set) => ({
      activePage: 0,
      setActivePage: (activePage) => set({ activePage }),
    }),
    {
      name: "confirm-order",
      partialize: (state) => ({ activePage: state.activePage }),
    },
  ),
);

export default useConfirmOrder;
