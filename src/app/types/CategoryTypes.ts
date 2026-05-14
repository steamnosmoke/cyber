export interface Category {
  id: number;
  description: string;
  name: string;
  filters: Filter[];
}

export interface Filter {
  title?: string;
  values?: string[];
}

export interface SortingParams {
  label?: string;
  param?: "price" | "rating";
  mod?: "asc" | "desc";
}

export interface FilterItem {
  title: string;
  value: string;
}
