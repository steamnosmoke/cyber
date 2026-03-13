import { useChatStore } from "../store/chatStore";
import useGetUserChat from "./user/useGetUserChat";

export default function useGetAIChat(id: string) {
  const { data: userHistory, status } = useGetUserChat(id);
  const guestHistory = useChatStore((state) => state.history);
  if (id === "guest") {
    return { chatData: guestHistory, status: "success" };
  }
  return { chatData: userHistory, status };
}
