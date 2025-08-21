import { TAddress } from "types/AuthTypes";

export default function formatAddress(address: TAddress) {
    return `${address.country}, ${address.city}, ${address.street}, ${address.zip}`;
  };