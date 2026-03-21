import { Address } from "types/AuthTypes";

export default function formatAddress(address: Address) {
    return `${address.country}, ${address.city}, ${address.street}, ${address.zip}`;
  };