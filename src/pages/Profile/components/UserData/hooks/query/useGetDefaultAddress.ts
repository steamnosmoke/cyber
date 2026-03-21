import { Address } from "types/AuthTypes";

import { geAddresses } from "./useGetAddresses";

export default async function getdefaultAddress(
  userId: string
): Promise<Address | undefined> {
  const addresses = await geAddresses(userId);
  return addresses ? addresses.find((address) => address.isDefault) : undefined;
}
