import { TAddress, TUser } from "types/AuthTypes";

export type TUserData = {
  type: string;
  label: string;
  value: string;
  placeholder: string;
  func: (input: string) => void;
};

export type TAddressData = {
  label: string;
  value: string;
  placeholder: string;
  func: (input: string) => void;
};

export type TDataStore = {
  user: TUser;
  defaultAddress: TAddress | undefined;
  setUser: (user: TUser) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setBirthday: (birthday: string) => void;
  setDefaultAddress: (defaultAddress: TAddress | undefined) => void;
  setAddresses: (address: TAddress) => void;
  clearData: () => void;
};

export type TAddressStore = TAddress & {
  isNewAddressOpened: boolean;
  isAddressesOpened: boolean;
  setIsNewAddressOpened: (isNewAddressOpened: boolean) => void;
  setIsAddressesOpened: (isAddressesOpened: boolean) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setStreet: (street: string) => void;
  setZip: (zip: string) => void;
  clearAll: () => void;
};
