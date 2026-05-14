import All from "../images/components/All";
import Phones from "../images/components/Phones";
import Watches from "../images/components/Watches";
import Accessories from "../images/components/Accessories";
import Headphones from "../images/components/Headphones";
import Computers from "../images/components/Computers";
import Gaming from "../images/components/Gaming";
import { Category } from "../types";

const categories: Category[] = [
  {
    label: "Все",
    category: "",
    img: <All />,
  },
  { label: "Смартфоны", category: "Phones", img: <Phones /> },
  { label: "Смартчасы", category: "Smartwatches", img: <Watches /> },
  { label: "Акссесуары", category: "Accessories", img: <Accessories /> },
  { label: "Наушники", category: "Headphones", img: <Headphones /> },
  { label: "Компьютеры", category: "Computers", img: <Computers /> },
  {
    label: "Игры",
    category: "Gaming Consoles",
    img: <Gaming />,
  },
];

export default categories;
