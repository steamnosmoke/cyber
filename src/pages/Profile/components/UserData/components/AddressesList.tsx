import { TAddress } from "types/AuthTypes";
import { useAuthStore } from "store/authStore";

import { useGetAddresses } from "../hooks/query/useGetAddresses";
import { useChangeDefaultAddress } from "../hooks/query/useChangeDefaultAddress";
import useRemoveAddress from "../hooks/query/useRemoveAddress";
import { useAddress } from "../store/useAddress";
import { useChangeData } from "../store/useChageData";
import formatAddress from "../utils/formatAddress";

import remove from "assets/images/clear.svg";

export default function AddressesList() {
  const userId = useAuthStore((state) => state.firebaseId);

  const { data: addresses } = useGetAddresses(userId);

  const { mutate: changeDefaultAddress } = useChangeDefaultAddress(userId);

  const { mutate: removeAddress } = useRemoveAddress(userId);

  const isAddressesOpened = useAddress((state) => state.isAddressesOpened);
  const setIsAddressesOpened = useAddress(
    (state) => state.setIsAddressesOpened
  );
  const setIsNewAddressOpened = useAddress(
    (state) => state.setIsNewAddressOpened
  );

  const removeStateAddress = useChangeData((state) => state.removeAddress);

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

  const onRemoveAddress = (address: TAddress) => {
    removeAddress(address);
    removeStateAddress(address);
    setIsAddressesOpened(false);
  };

  return (
    <ul
      role="listbox"
      className={`absolute left-0 max-w-150 w-full bg-white border border-stone-300 rounded-lg transition-all duration-200  overflow-hidden ${
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
            className="cursor-pointer px-4 py-2 hover:bg-stone-100 transition-colors duration-200 group flex items-center justify-between gap-1"
          >
            <p
              className="truncate w-full"
              onClick={() => onClickAddress(address)}
            >
              {formatAddress(address)}
            </p>
            <img
              src={remove}
              alt="remove address"
              className="w-0 z-10 transition-all duration-200 opacity-0 group-hover:opacity-60 group-hover:w-6 group-hover:p-1.5 hover:opacity-100"
              onClick={() => onRemoveAddress(address)}
            />
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
