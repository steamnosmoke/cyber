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
  setHistory: (message: TChatMessage, replaceId?: string) => void;
  clearHistory: () => void;
}

export type ChatRequest = {
  history: TChatMessage[];
  userMessage: string;
  products: TProduct[];
};

export type TChatProduct = {
  objectId: string;
  name: string;
  category: string;
  price: number;
  brand: string;
}