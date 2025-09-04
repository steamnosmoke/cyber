import { TProduct } from "types/ProductTypes";

export type TButton = {
  path: string;
  src: React.ReactNode;
  action: () => void;
};

export type TNavigate = {
  path: string;
  label: string;
};

export type TSearchStore = {
  value: string;
  result: TProduct[];
  ariaOpened: boolean;
  setAriaOpened: (value: boolean) => void;
  setResult: (products: TProduct[]) => void;
  Searching: (value: string) => void;
  ClearValue: () => void;
};
