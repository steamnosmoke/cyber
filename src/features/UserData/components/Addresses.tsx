import { useCallback, useEffect, useRef, useState } from "react";

import { TAddress } from "types/AuthTypes";

import { useChangeDefaultAddress, useGetAddresses } from "../hooks/useUserData";
import { useChangeData } from "../store/userData";

import NewAddress from "./NewAddress";

export default function Addresses() {
  const setDefaultAddress = useChangeData((state) => state.setDefaultAddress);
  const defaultAddress = useChangeData((state) => state.defaultAddress);
  const { data: addresses } = useGetAddresses();
  const { mutate: changeDefaultAddress } = useChangeDefaultAddress();

  const [isAddressesOpened, setIsAddressesOpened] = useState(false);
  const [isNewAddressOpened, setIsNewAddressOpened] = useState(false);
  const ref = useRef(null);

  const openAdding = useCallback(() => {
    setIsNewAddressOpened(true);
    document.body.style.overflowY = "hidden";
    setIsAddressesOpened(false);
  }, []);

  const onClickAddress = useCallback(
    (address: TAddress) => {
      changeDefaultAddress(address);
      setDefaultAddress(address);
      setIsAddressesOpened(false);
    },
    [
      setDefaultAddress,
      changeDefaultAddress,
    ]
  );


  const formatAddress = (address: TAddress) => {
    return `${address.country}, ${address.city}, ${address.street}, ${address.zip}`;
  };

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsAddressesOpened(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // useEffect(() => {
  // }, [defaultAddress, addresses]);

  return (
    <section
      className="addresses relative rounded-lg max-w-150 w-full"
      ref={ref}
    >
      <div
        className="label border-1 border-stone-300 rounded-lg  relative pt-8 px-4 pb-2 cursor-pointer transition-all duration-200 hover:border-black"
        onClick={() => setIsAddressesOpened(!isAddressesOpened)}
      >
        <p className="text-[14px] absolute left-4 top-2 capitalize">
          Default address
        </p>
        <p className={!defaultAddress ? "text-stone-500" : ""}>
          {defaultAddress
            ? formatAddress(defaultAddress)
            : "Add new address"}
        </p>
      </div>

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
              <p className="truncate">
                {formatAddress(address)}
              </p>
            </li>
          ))}
        <li className="cursor-pointer px-4 py-2 hover:bg-stone-100 transition-colors duration-200">
          <p className="w-full" onClick={openAdding}>
            + Add new address
          </p>
        </li>
      </ul>
      {isNewAddressOpened && <NewAddress setIsOpened={setIsNewAddressOpened} />}
    </section>
  );
}
