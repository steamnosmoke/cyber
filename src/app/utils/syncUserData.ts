import { useChangeData } from "pages/Profile/components/UserData/store/useChageData";
import { useAuthStore } from "store/authStore";

export function syncUserData() {
  const authUser = useAuthStore.getState().user;
  if (authUser) {
    useChangeData.getState().setUser(authUser);
  }
}
