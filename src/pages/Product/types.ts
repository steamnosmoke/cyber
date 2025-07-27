import { TProduct } from "@/src/app/types/ProductTypes";

export type TCharacter = {
  label: string;
  img: string;
  value: string;
};
export type TTablet = {
  label: string;
  img: string;
  value: string;
};

export type TProps = {
  product: TProduct;
};

export type TGallaryProps = {
  images: string[];
};

export type THeaderProps = {
  name: string;
};

export type TReviewStore = {
  comment: string;
  setComment: (comment: string) => void;
};

export type TArrowProps = {
    check: boolean;
}

export type TStarsProps = {
  rating: number;
}