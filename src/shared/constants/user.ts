import { useAuthStore } from "store/authStore";
import { TUser } from "types/AuthTypes";

const user: TUser = useAuthStore.getState().user

export default user;
