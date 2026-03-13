import { useEffect } from "react";
import { useChangeData } from "../store/useChageData";
import { useAuthStore } from "store/authStore";
import { geAddresses } from "../hooks/query/useGeAddresses";

export function useInitDefaulAddress() {
  const userId = useAuthStore((s) => s.firebaseId);
  const setDefaulAddress = useChangeData((s) => s.setDefaulAddress);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const addresses = await geAddresses(userId);
      const def = addresses.find((a) => a.isDefault);
      if (def) setDefaulAddress(def);
    })();
  }, [userId, setDefaulAddress]);
}
