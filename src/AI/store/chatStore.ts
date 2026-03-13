// store/chatStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TChatStore} from "../types/chatTypes";

export const useChatStore = create<TChatStore>()(
  persist(
    (set, get) => ({
      input: "",
      history: [],
      setInput: (val) => set({ input: val }),
      setHistory: (message, replaceId) => {
        const state = get();
        if (replaceId !== undefined) {
          const newHistory = [...state.history];
          const index = newHistory.findIndex((el) => el.id === replaceId);
          newHistory[index] = message;
          set({ history: newHistory });
        } else {
          set({ history: [...state.history, message] });
        }
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        history: state.history,
      }),
    },
  ),
);
