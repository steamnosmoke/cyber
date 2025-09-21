import { useEffect } from "react";
import { useChangeData } from "../store/useChageData";
import { useAuthStore } from "store/authStore";
import { getAddresses } from "../hooks/query/useGetAddresses";

export function useInitDefaultAddress() {
  const userId = useAuthStore((s) => s.user?.firebaseId);
  const setDefaultAddress = useChangeData((s) => s.setDefaultAddress);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const addresses = await getAddresses(userId);
      const def = addresses.find((a) => a.isDefault);
      if (def) setDefaultAddress(def);
    })();
  }, [userId, setDefaultAddress]);
}
