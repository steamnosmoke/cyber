import { Option } from "../types";

const sorOptions: Option[] = [
  { label: "rating ↓", param: "rating", mod: "desc" },
  { label: "rating ↑", param: "rating", mod: "asc" },
  { label: "price ↓", param: "price", mod: "desc" },
  { label: "price ↑", param: "price", mod: "asc" },
];

export default sorOptions;
