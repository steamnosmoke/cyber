import { TProduct } from "types/ProductTypes";

import { TCharacter } from "../types";

import screen from "../images/screen.svg";
import cpu from "../images/cpu.svg";
import cores from "../images/cores.svg";
import camera from "../images/camera.svg";
import battery from "../images/battery.svg";
import front from "../images/front.svg";

const CHARACTER_CONFIG = [
  { key: "screenSize", label: "Screen size", img: screen },
  { key: "processor", label: "CPU", img: cpu },
  {
    key: "cpuCores",
    label: "Number of Cores",
    img: cores,
    transform: (v: any) => String(v),
  },
  { key: "camera", label: "Main camera", img: camera },
  { key: "frontCamera", label: "Front camera", img: front },
  { key: "battery", label: "Battery capacity", img: battery },
];

export default function getCharacters(product: TProduct): TCharacter[] {
  return CHARACTER_CONFIG.map(({ key, label, img, transform }) => ({
    label,
    img,
    value: transform ? transform(product[key]) : product[key] || "N/A",
  }));
}