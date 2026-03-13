import { Address } from "types/AuthTypes";

export default function formaAddress(address: Address) {
    return `${address.country}, ${address.city}, ${address.street}, ${address.zip}`;
  };