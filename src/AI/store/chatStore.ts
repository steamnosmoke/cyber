// store/chatStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TChatStore, TChatMessage } from "../types/chatTypes";

export const useChatStore = create<TChatStore>()(
  persist(
    (set, get) => ({
      input: "",
      history: [] as TChatMessage[],
      setInput: (val: string) => set({ input: val }),
      setHistory: (message: TChatMessage, replaceIndex?: number) => {
        const state = get();
        if (replaceIndex !== undefined && state.history[replaceIndex]) {
          const newHistory = [...state.history];
          newHistory[replaceIndex] = message;
          set({ history: newHistory });
        } else {
          set({ history: [...state.history, message] });
        }
      },
      initializeHistory: (initialHistory: TChatMessage[]) =>
        set({ history: initialHistory }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        history: state.history,
        // Don't persist input to avoid showing stale text on reload
      }),
    }
  )
);
