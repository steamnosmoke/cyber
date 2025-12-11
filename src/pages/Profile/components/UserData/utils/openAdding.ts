import { useAddress } from "../store/useAddress";

export default function openAdding() {
  const setIsAddressesOpened = useAddress.getState().setIsAddressesOpened;
  const setIsNewAddressOpened = useAddress.getState().setIsNewAddressOpened;

  return () => {
    setIsNewAddressOpened(true);
    document.body.style.overflowY = "hidden";
    setIsAddressesOpened(false);
  };
}
