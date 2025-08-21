import { TFilter, TSortingParams } from "types/CategoryTypes";
import { TProduct } from "types/ProductTypes";

export type TFilterProps = {
  filter: TFilter;
};

export type TOption = TSortingParams & {
  label: string;
};

export type TStoreState = {
  filters: TFilter[];
  confirmedFilters: TFilter[];
  filteredProducts: TProduct[];
  isFilterOpened: boolean;
  sortingParams: TSortingParams;
  setFilters: (filter: { title: string; value: string }) => void;
  clearFilters: () => void;
  setConfirmedFilters: () => void;
  setFilterOpened: () => void;
  setFilteredProducts: (products: TProduct[]) => void;
  setSortingParams: (params: TSortingParams) => void;
};
