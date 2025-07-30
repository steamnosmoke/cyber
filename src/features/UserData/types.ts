import { TAddress, TUser } from "types/AuthTypes";

export type TUserData = {
  label: string;
  value: string;
  placeholder: string;
  func: (input: string) => void;
};

export type TDataStore = TUser & {
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setBirthday: (birthday: string) => void;
  setDefaultAddress: (defaultAddress: TAddress | undefined) => void;
  setAddresses: (address: TAddress) => void;
};



export type TAddressStore = TAddress & {
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setStreet: (street: string) => void;
  setZip: (zip: string) => void;
  clearAll: ()=> void
};
