import All from "../images/components/All";
import Phones from "../images/components/Phones";
import Watches from "../images/components/Watches";
import Accessories from "../images/components/Accessories";
import Headphones from "../images/components/Headphones";
import Computers from "../images/components/Computers";
import Gaming from "../images/components/Gaming";
import { TCategory } from "../types";

const categories: TCategory[] = [
  {
    label: "All",
    category: "",
    img: <All />,
  },
  { label: "Phones", category: "Phones", img: <Phones /> },
  { label: "Smartwatches", category: "Smartwatches", img: <Watches /> },
  { label: "Accessories", category: "Accessories", img: <Accessories /> },
  { label: "Headphones", category: "Headphones", img: <Headphones /> },
  { label: "Computers", category: "Computers", img: <Computers /> },
  {
    label: "Gaming",
    category: "Gaming Consoles",
    img: <Gaming />,
  },
];

export default categories;
