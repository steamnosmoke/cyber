import { useEffect, useRef } from "react";

import { useChangeData } from "../store/useChageData";
import { useAddress } from "../store/useAddress";
import { useInitDefaultAddress } from "../hooks/useInitDefaultAddress";

import formatAddress from "../utils/formatAddress";

import NewAddress from "./NewAddress";
import AddressesList from "./AddressesList";

export default function Addresses() {
  useInitDefaultAddress();
  const defaultAddress = useChangeData((state) => state.defaultAddress);
  const isAddressesOpened = useAddress((state) => state.isAddressesOpened);
  const isNewAddressOpened = useAddress((state) => state.isNewAddressOpened);
  const setIsAddressesOpened = useAddress(
    (state) => state.setIsAddressesOpened
  );

  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsAddressesOpened(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setIsAddressesOpened]);

  return (
    <section
      className="addresses relative rounded-lg max-w-150 w-full "
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
          {defaultAddress ? formatAddress(defaultAddress) : "Add new address"}
        </p>
      </div>

      <AddressesList />
      {isNewAddressOpened && <NewAddress />}
    </section>
  );
}
