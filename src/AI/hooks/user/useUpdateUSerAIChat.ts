import DB_URL from "constants/DB_URL";
import axios from "axios";
import { ChatMessage } from "../../types/chatTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserAIChat = async (
  message: ChatMessage,
  id: string,
): Promise<ChatMessage> => {
  const { data } = await axios.post<{ name: string }>(
    `${DB_URL}/users/${id}/AIChat.json`,
    message,
  );
  return { id: data.name, ...message };
};

export default function useUpdateUserAIChat(id: string) {
  const queryClient = useQueryClient();

  return useMutation<ChatMessage, Error, ChatMessage>({
    mutationFn: (message) => updateUserAIChat(message, id),

    mutationKey: ["AIChat", id],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AIChat", id] });
    },
  });
}
