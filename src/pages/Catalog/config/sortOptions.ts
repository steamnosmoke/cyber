import { Option } from "../types";

const sortOptions: Option[] = [
  { label: "рейтингу ↓", param: "rating", mod: "desc" },
  { label: "рейтингу ↑", param: "rating", mod: "asc" },
  { label: "цене ↓", param: "price", mod: "desc" },
  { label: "цене ↑", param: "price", mod: "asc" },
];

export default sortOptions;
