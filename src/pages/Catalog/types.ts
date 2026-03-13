import { Filter, SortingParams } from "types/CategoryTypes";
import { Product } from "types/ProductTypes";

export interface FilterProps {
  filter: Filter;
};

export interface Option extends SortingParams {
  label: string;
};

export interface FilterStore {
  filters: Filter[];
  confirmedFilters: Filter[];
  filteredProducts: Product[];
  isFilterOpened: boolean;
  sortingParams: SortingParams;
  seFilters: (filter: { title: string; value: string }) => void;
  clearFilters: () => void;
  setConfirmedFilters: () => void;
  seFilterOpened: () => void;
  seFilteredProducts: (products: Product[]) => void;
  seSortingParams: (params: SortingParams) => void;
};
