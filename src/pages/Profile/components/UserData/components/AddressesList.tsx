import { TAddress } from "types/AuthTypes";
import { useAuthStore } from "store/authStore";

import { useGetAddresses } from "../hooks/query/useGetAddresses";
import { useChangeDefaultAddress } from "../hooks/query/useChangeDefaultAddress";

import { useNewAddress } from "../store/useAddress";
import { useChangeData } from "../store/useChageData";

import formatAddress from "../utils/formatAddress";

export default function AddressesList() {
    const user = useAuthStore((state) => state.user);
  
  const { data: addresses } = useGetAddresses(user.firebaseId);

  const { mutate: changeDefaultAddress } = useChangeDefaultAddress();

  const isAddressesOpened = useNewAddress((state) => state.isAddressesOpened);
  const setIsAddressesOpened = useNewAddress(
    (state) => state.setIsAddressesOpened
  );
  const setIsNewAddressOpened = useNewAddress(
    (state) => state.setIsNewAddressOpened
  );

  const setDefaultAddress = useChangeData((state) => state.setDefaultAddress);

  const onClickAddress = (address: TAddress) => {
    changeDefaultAddress(address);
    setDefaultAddress(address);
    setIsAddressesOpened(false);
  };

  const openAdding = () => {
    setIsNewAddressOpened(true);
    document.body.style.overflowY = "hidden";
    setIsAddressesOpened(false);
  };

  return (
    <ul
      role="listbox"
      className={`absolute left-0 max-w-150 w-full bg-white border border-stone-300 rounded-lg transition-all duration-200 hover:border-black overflow-hidden ${
        isAddressesOpened
          ? "opacity-100 top-18 z-10"
          : "opacity-0 top-14 pointer-events-none z-[-1]"
      }`}
    >
      {addresses &&
        Object.values(addresses).map((address, i) => (
          <li
            key={i}
            role="option"
            onClick={() => onClickAddress(address)}
            className="cursor-pointer px-4 py-2 hover:bg-stone-100 transition-colors duration-200"
          >
            <p className="truncate">{formatAddress(address)}</p>
          </li>
        ))}
      <li className="cursor-pointer px-4 py-2 hover:bg-stone-100 transition-colors duration-200">
        <p className="w-full" onClick={openAdding}>
          + Add new address
        </p>
      </li>
    </ul>
  );
}
