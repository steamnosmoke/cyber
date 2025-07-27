import { TFilter, TSortingParams } from "types/CategoryTypes";
import { TProduct } from "./ProductTypes";

export type TProductStore = {
  product?: TProduct | null;
  category?: string;
  filters?: TFilter[];
  confirmedFilters?: TFilter[];
  filteredProducts?: TProduct[];
  isFilterOpened?: boolean;
  comment?: string;
  sortingParams?: TSortingParams;

  setProduct?: (product?: TProduct) => void;
  setComment?: (comment?: string) => void;
  setFilters?: (filter?: { title?: string; value?: string }) => void;
  clearFilters?: () => void;
  setConfirmedFilters?: () => void;
  setFilterOpened?: () => void;
  setCategory?: (category?: string) => void;
  setFilteredProducts?: (products?: TProduct[]) => void;
  setSortingParams?: (params?: TSortingParams) => void;
};

