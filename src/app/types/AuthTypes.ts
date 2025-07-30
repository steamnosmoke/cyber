import { TCartItem } from "./CartTypes";
import { TOrder } from "./OrderTypes";
import { TProduct } from "./ProductTypes";

export type TAddress = {
  id?: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  isDefault?: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUser = {
  email?: string;
  passwordHash?: string;
  name?: string;
  role?: string;
  wishlist?: TProduct[];
  cart?: TCartItem[];
  orders?: TOrder[];
  permissions?: string[];
  phone?: string;
  addresses?: TAddress[];
  firebaseId?: string;
  birthday?: string;
  defaultAddress?: TAddress;
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
