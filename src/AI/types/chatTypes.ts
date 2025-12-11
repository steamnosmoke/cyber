import { TProduct } from "types/ProductTypes";

export interface TChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  id?: string;
}

export interface TChatStore {
  input: string;
  history: TChatMessage[];
  setInput: (val: string) => void;
  setHistory: (message: TChatMessage, replaceIndex?: number) => void;
  initializeHistory: (initialHistory: TChatMessage[]) => void;
  clearHistory: () => void;
}

export type ChatRequest = {
  history: TChatMessage[];
  userMessage: string;
  products: TProduct[];
};