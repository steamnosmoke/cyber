import { Product } from "./ProductTypes";

export interface SearchStore {
  value: string;
  result: Product[];
  ariaOpened: boolean;
  setAriaOpened: (value: boolean) => void;
  setResult: (products: Product[]) => void;
  Searching: (value: string) => void;
  ClearValue: () => void;
}
