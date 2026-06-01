import { Product } from "types/ProductTypes";

import { CharacterConfig, TCharacter } from "../types";

import screen from "../images/screen.svg";
import cpu from "../images/cpu.svg";
import cores from "../images/cores.svg";
import camera from "../images/camera.svg";
import battery from "../images/battery.svg";
import front from "../images/front.svg";
import { BluetoothIcon, DatabaseIcon, MemoryStickIcon } from "lucide-react";

function getConfig(category: string): CharacterConfig[] {
  const CONFIG_MAP = {
    Phones: CHARACTER_CONFIG_PHONE,
    Smartwatches: CHARACTER_CONFIG_WATCHES,
    Headphones: CHARACTER_CONFIG_HEADPHONES,
    Computers: CHARACTER_CONFIG_COMPUTERS,
  };

  return CONFIG_MAP[category] || [];
}

const CHARACTER_CONFIG_PHONE = [
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

const CHARACTER_CONFIG_WATCHES = [
  { key: "screenSize", label: "Экран", img: screen },
  { key: "processor", label: "Процессор", img: cpu },
  {
    key: "cpuCores",
    label: "Количество ядер",
    img: cores,
  },
  { key: "storage", label: "Память", img: DatabaseIcon },
  { key: "ram", label: "RAM", img: MemoryStickIcon },
  { key: "batteryLife", label: "Время работы", img: battery },
];

const CHARACTER_CONFIG_HEADPHONES = [
  { key: "impedance", label: "Сопротивление", img: screen },
  { key: "batteryLife", label: "Время работы", img: battery },
  {
    key: "bluetoothVersion",
    label: "Блютуз",
    img: BluetoothIcon,
  },
];

const CHARACTER_CONFIG_COMPUTERS = [
  { key: "screenSize", label: "Экран", img: screen },
  { key: "processor", label: "Процессор", img: cpu },
  { key: "batteryLife", label: "Батарея", img: battery },
];

export default function getCharacters(
  product: Product | null | undefined,
): TCharacter[] {
  if (!product) return [];
  const CHARACTER_CONFIG = getConfig(product.category);
  return CHARACTER_CONFIG.map(({ key, label, img, transform }) => ({
    label,
    img,
    value: transform ? transform(product[key]) : product[key] || "-",
  }));
}
