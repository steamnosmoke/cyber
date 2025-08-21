import { useNewAddress } from "../store/useAddress";

export default function openAdding() {
  const setIsAddressesOpened = useNewAddress.getState().setIsAddressesOpened;
  const setIsNewAddressOpened = useNewAddress.getState().setIsNewAddressOpened;

  return () => {
    setIsNewAddressOpened(true);
    document.body.style.overflowY = "hidden";
    setIsAddressesOpened(false);
  };
}
