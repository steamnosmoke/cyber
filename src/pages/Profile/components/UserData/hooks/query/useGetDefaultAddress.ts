import { TAddress } from "types/AuthTypes";
import { useAuthStore } from "store/authStore";

import { getAddresses } from "./useGetAddresses";

export default async function useGetDefaultAddress(): Promise<
  TAddress | undefined
> {
  const userId = useAuthStore.getState().user.firebaseId;
  const addresses = await getAddresses(userId);
  return addresses ? addresses.find((address) => address.isDefault) : undefined;
  // : { country: "", city: "", street: "", zip: "" };
}
