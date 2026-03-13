import { Product } from "types/ProductTypes";

export interface Button {
  path: string;
  src: React.ReactNode;
  action: () => void;
}

export interface Navigate {
  path: string;
  label: string;
}

export interface SearchStore {
  value: string;
  result: Product[];
  ariaOpened: boolean;
  setAriaOpened: (value: boolean) => void;
  setResult: (products: Product[]) => void;
  Searching: (value: string) => void;
  ClearValue: () => void;
}
