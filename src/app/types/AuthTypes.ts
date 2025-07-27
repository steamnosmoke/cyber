import { TCartItem } from "./CartTypes";
import { TOrder } from "./OrderTypes";
import { TProduct } from "./ProductTypes";

export type TUser = {
  email: string;
  passwordHash: string;
  name?: string;
  role?: string;
  wishlist?: TProduct[];
  cart?: TCartItem[];
  orders?: TOrder[];
  permissions?: string[];
  phone?: string;
  addresses?: TAdress[];
  firebaseId?: string;
  birthday?: string;
};

export type TAdress = {
  city: string;
  country: string;
  street: string;
  zip: string;
  isDefault: boolean;
}

export type TLogin = {
  email: string;
  password: string;
};


export type TAuthStore = {
  user: TUser | null;
  email: string;
  password: string;
  confirm: string;
  error: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirm: (confirm: string) => void;
  logOut: () => void;
  setUser: (user: TUser) => void;
  setError: (error: string) => void;
};