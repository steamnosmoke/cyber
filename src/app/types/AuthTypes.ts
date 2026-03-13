import { ChatMessage } from "src/AI/types/chatTypes";
import { CartItem } from "./CartTypes";
import { Order } from "./OrderTypes";
import { Product } from "./ProductTypes";

export interface Address {
  id?: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  isDefault?: boolean;
};

export interface Login {
  email: string;
  password: string;
  confirm?: string;
};

export interface User {
  email?: string;
  passwordHash?: string;
  name?: string;
  role?: string;
  wishlist?: Product[];
  cart?: CartItem[];
  orders?: Order[];
  permissions?: string[];
  phone?: string;
  addresses?: Address[];
  firebaseId?: string;
  birthday?: string;
  defaulAddress?: Address;
  AIchatHistory?: ChatMessage[];
};

export interface AuthStore {
  firebaseId: string;
  email: string;
  password: string;
  confirm: string;
  error: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirm: (confirm: string) => void;
  logOut: () => void;
  setFirebaseId: (firebaseI: string) => void;
  setError: (error: string) => void;
};
