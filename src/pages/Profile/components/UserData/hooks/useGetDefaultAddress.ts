import { TAddress } from "types/AuthTypes";
import { getAddresses } from "./useGetAddresses";

export default async function useGetDefaultAddress(): Promise<TAddress> {
  const addresses = await getAddresses();
  return addresses
    ? addresses.find((address) => address.isDefault)
    : { country: "", city: "", street: "", zip: "" };
}
