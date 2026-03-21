import { Address, User } from "types/AuthTypes";

export interface UserData {
  type: string;
  label: string;
  value: string;
  placeholder: string;
  func: (input: string) => void;
}

export interface AddressData {
  label: string;
  value: string;
  placeholder: string;
  func: (input: string) => void;
}

export interface DataStore {
  user: User;
  defaultAddress: Address | undefined;
  setUser: (user: User) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setBirthday: (birthday: string) => void;
  setDefaultAddress: (defaultAddress: Address | undefined) => void;
  clearData: () => void;
}

export interface AddressStore extends Address {
  isNewAddressOpened: boolean;
  isAddressesOpened: boolean;
  setIsNewAddressOpened: (isNewAddressOpened: boolean) => void;
  setIsAddressesOpened: (isAddressesOpened: boolean) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setStreet: (street: string) => void;
  setZip: (zip: string) => void;
  clearAll: () => void;
}
