import { TAdress } from "@/src/app/types/AuthTypes";

export type TUserData = {
  label: string;
  value: string;
  placeholder: string;
  func: (input: string) => void;
};

export type TDataStore = {
  email: string;
  name: string;
  phone: string;
  birthday?: string;
  defaultAddress: string;
  addresses: TAdress[];
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setBirthday: (birthday: string) => void;
  setDefaultAddress: (defaultAddress: string) => void;
  setAddresses: (addresses: TAdress[]) => void;
};

export type TAddressStore = {
  city: string;
  country: string;
  zip: string;
  street: string;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setStreet: (street: string) => void;
  setZip: (zip: string) => void;
};
