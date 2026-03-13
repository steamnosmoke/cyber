import { Address } from "types/AuthTypes";

import { geAddresses } from "./useGeAddresses";

export default async function getDefaulAddress(
  userId: string
): Promise<Address | undefined> {
  const addresses = await geAddresses(userId);
  return addresses ? addresses.find((address) => address.isDefault) : undefined;
}
