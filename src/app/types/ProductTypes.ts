import { Filter, SortingParams } from "./CategoryTypes";

export interface Product {
  id: string;
  productId: string;
  category: string;
  brand: string;
  name: string;
  images: string[];
  stock: number;
  color: string;
  price: number;
  discount: number;
  totalPrice: number;
  battery?: string;
  memory?: string;
  camera?: string;
  cpuCores?: number;
  os?: string;
  processor?: string;
  ram?: number;
  rating?: number;
  reviews?: Review[];
  screenSize?: string;
  specs?: Specs;
  objectId?: string;
  variantId?: string;
  variants?: Variant[];
  variant?: Variant;
  size?: string;
  storage?: string;
};

export interface Review {
  comment: string;
  date: string;
  rating: number;
  userId: string;
  productId: number;
  userName?: string;
};

export interface Variant {
  price: number;
  stock: number;
  images: string[];
  color?: string;
  colorHex?: string;
  memory?: string;
  discount?: number;
};

export interface Specs {
  description?: string;
  screen?: {
    diagonal?: string;
    resolution?: string;
    refreshRate?: string;
    pixelDensity?: string;
    type?: string;
    features?: string[];
  };
  cpu?: {
    name?: string;
    cores?: number;
  };
  gpu?: {
    model?: string;
    supportsRayTracing?: boolean;
  };
  memory?: {
    ram?: string;
    storageTypes?: string[];
  };
  battery?: {
    capacity?: string;
    charging?: {
      wired?: string;
      wireless?: string;
    };
    batteryLife?: string;
  };
  camera?: {
    main?: string;
    front?: string;
    features?: string[];
  };
  materials?: {
    frame?: string;
    back?: string;
  };
  dimensions?: {
    height?: string;
    width?: string;
    thickness?: string;
    weight?: string;
  };
  connectivity?: {
    wifi?: string;
    bluetooth?: string;
    nfc?: boolean;
    usb?: string;
  };
  sensors?: string[];
  resistance?: {
    water?: string;
    dust?: string;
  };
  os?: string;
  launchYear?: number;
  guarantee?: string;
};

export interface ProductStore {
  product?: Product | null;
  category?: string;
  filters?: Filter[];
  confirmedFilters?: Filter[];
  filteredProducts?: Product[];
  isFilterOpened?: boolean;
  comment?: string;
  sortingParams?: SortingParams;

  seProduct?: (product?: Product) => void;
  setComment?: (comment?: string) => void;
  seFilters?: (filter?: { title?: string; value?: string }) => void;
  clearFilters?: () => void;
  setConfirmedFilters?: () => void;
  seFilterOpened?: () => void;
  seCategory?: (category?: string) => void;
  seFilteredProducts?: (products?: Product[]) => void;
  seSortingParams?: (params?: SortingParams) => void;
};
