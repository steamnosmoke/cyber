import axios from "axios";
import DB_URL from "constants/DB_URL";
import { ChatMessage } from "../../types/chatTypes";
import { useQuery } from "@tanstack/react-query";
import welcomeMessage from "../../config/welcomeMessage";

export async function geUserChat(id: string): Promise<ChatMessage[]> {
  const { data } = await axios.get<Record<string, ChatMessage>>(
    `${DB_URL}/users/${id}/AIChat.json`,
  );
  const chatData: ChatMessage[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: key };
      })
    : [welcomeMessage];

  return chatData;
}

export default function useGeUserChat(id: string) {
  return useQuery<ChatMessage[]>({
    queryFn: () => geUserChat(id),
    queryKey: ["AIChat", id],
    enabled: !!id && id !== "guest",
  });
}
