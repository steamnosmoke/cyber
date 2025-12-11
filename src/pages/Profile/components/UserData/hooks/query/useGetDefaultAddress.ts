import { TAddress } from "types/AuthTypes";

import { getAddresses } from "./useGetAddresses";

export default async function getDefaultAddress(
  userId: string
): Promise<TAddress | undefined> {
  const addresses = await getAddresses(userId);
  return addresses ? addresses.find((address) => address.isDefault) : undefined;
}
