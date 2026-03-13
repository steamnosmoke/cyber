import DB_URL from "constants/DB_URL";
import axios from "axios";
import { TChatMessage } from "../../types/chatTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserAIChat = async (
  message: TChatMessage,
  id: string,
): Promise<TChatMessage> => {
  const { data } = await axios.post<{ name: string }>(
    `${DB_URL}/users/${id}/AIChat.json`,
    message,
  );
  return { id: data.name, ...message };
};

export default function useUpdateUserAIChat(id: string) {
  const queryClient = useQueryClient();

  return useMutation<TChatMessage, Error, TChatMessage>({
    mutationFn: (message) => updateUserAIChat(message, id),

    mutationKey: ["AIChat", id],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AIChat", id] });
    },
  });
}
