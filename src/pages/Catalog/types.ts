import { TFilter, TSortingParams } from "types/CategoryTypes";
import { TProduct } from "@/src/app/types/ProductTypes";

export type TFilterProps = {
  filter: TFilter;
};

export type TSidebarProps = {
  category: string;
};

export type THeaderProps = {
  count: number;
  category: string;
};

export type TOption = TSortingParams & {
  label: string;
};

export type TStoreState = {
  filters?: TFilter[];
  confirmedFilters?: TFilter[];
  filteredProducts?: TProduct[];
  isFilterOpened?: boolean;
  sortingParams?: TSortingParams;
  setFilters?: (filter?: { title?: string; value?: string }) => void;
  clearFilters?: () => void;
  setConfirmedFilters?: () => void;
  setFilterOpened?: () => void;
  setFilteredProducts?: (products?: TProduct[]) => void;
  setSortingParams?: (params?: TSortingParams) => void;
};
