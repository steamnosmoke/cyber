import { Product } from "types/ProductTypes";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  id?: string;
}

export interface ChatStore {
  input: string;
  history: ChatMessage[];
  setInput: (val: string) => void;
  setHistory: (message: ChatMessage, replaceId?: string) => void;
  clearHistory: () => void;
}

export interface ChatRequest {
  history: ChatMessage[];
  userMessage: string;
  products: Product[];
};

export interface ChatProduct {
  objectId: string;
  name: string;
  category: string;
  price: number;
  brand: string;
}