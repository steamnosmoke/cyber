export type TProduct = {
  id: number;
  productId: number;
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
  reviews?: TReview[];
  screenSize?: string;
  specs?: TSpecs;
  objectId?: string;
  variantId?: string;
  variants?: TVariant[];
  variant?: TVariant;
};

export type TReview = {
  comment: string;
  date: string;
  rating: number;
  userId: string;
  productId: number;
  userName?: string;
};

export type TVariant = {
  price: number;
  stock: number;
  images: string[];
  color?: string;
  colorHex?: string;
  memory?: string;
  discount?: number;
};

export type TSpecs = {
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
