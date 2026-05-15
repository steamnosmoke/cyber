import { Product } from "types/ProductTypes";

import { TCharacter } from "../types";

import screen from "../images/screen.svg";
import cpu from "../images/cpu.svg";
import cores from "../images/cores.svg";
import camera from "../images/camera.svg";
import battery from "../images/battery.svg";
import front from "../images/front.svg";

const CHARACTER_CONFIG = [
  { key: "screenSize", label: "Экран", img: screen },
  { key: "processor", label: "Процессор", img: cpu },
  {
    key: "cpuCores",
    label: "Количество ядер",
    img: cores,
    transform: (v: any) => String(v),
  },
  { key: "camera", label: "Камера", img: camera },
  { key: "frontCamera", label: "Фронт. камера", img: front },
  { key: "battery", label: "Батарея", img: battery },
];

export default function getCharacters(product: Product): TCharacter[] {
  return CHARACTER_CONFIG.map(({ key, label, img, transform }) => ({
    label,
    img,
    value: transform ? transform(product[key]) : product[key] || "-",
  }));
}