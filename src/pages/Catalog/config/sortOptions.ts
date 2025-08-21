import { TOption } from "../types";

const sortOptions: TOption[] = [
  { label: "rating ↓", param: "rating", mod: "desc" },
  { label: "rating ↑", param: "rating", mod: "asc" },
  { label: "price ↓", param: "price", mod: "desc" },
  { label: "price ↑", param: "price", mod: "asc" },
];

export default sortOptions;
