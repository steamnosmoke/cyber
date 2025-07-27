export type TCategory = {
  id: number;
  description: string;
  name: string;
  filters: TFilter[];
};

export type TFilter = {
  title?: string;
  values?: string[];
};

export type TSortingParams = {
  param?: "price" | "rating";
  mod?: "asc" | "desc";
};

export type TfilterItem = {
  title: string;
  value: string;
};