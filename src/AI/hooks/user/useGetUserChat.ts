import axios from "axios";
import DB_URL from "constants/DB_URL";
import { TChatMessage } from "../../types/chatTypes";
import { useQuery } from "@tanstack/react-query";
import welcomeMessage from "../../config/welcomeMessage";

export async function getUserChat(id: string): Promise<TChatMessage[]> {
  const { data } = await axios.get<Record<string, TChatMessage>>(
    `${DB_URL}/users/${id}/AIChat.json`,
  );
  const chatData: TChatMessage[] = data
    ? Object.entries(data).map((el) => {
        const [key, value] = el;
        return { ...value, id: key };
      })
    : [welcomeMessage];

  return chatData;
}

export default function useGetUserChat(id: string) {
  return useQuery<TChatMessage[]>({
    queryFn: () => getUserChat(id),
    queryKey: ["AIChat", id],
    enabled: !!id && id !== "guest",
  });
}
