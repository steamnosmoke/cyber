import { useChatStore } from "../store/chatStore";
import useGeUserChat from "./user/useGeUserChat";

export default function useGetAIChat(id: string) {
  const { data: userHistory, status } = useGeUserChat(id);
  const guestHistory = useChatStore((state) => state.history);
  if (id === "guest") {
    return { chatData: guestHistory, status: "success" };
  }
  return { chatData: userHistory, status };
}
