import { Product } from "types/ProductTypes";
import { LucideIcon } from "lucide-react";

export type TCharacter = {
  label: string;
  img: string | LucideIcon;
  value: string;
};

export type TTablet = {
  label: string;
  img: string;
  value: string;
};

export type TGallaryProps = {
  images: string[];
};

export interface CharacterConfig {
  key: keyof Product;
  label: string;
  img: string | LucideIcon;
  transform?: (v: unknown) => void;
}
