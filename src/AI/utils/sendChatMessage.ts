// utils/sendChatMessage.ts
import axios from "axios";
import { ChatProduct } from "../types/chatTypes";

export async function sendChatMessage(
  message: string,
  products: ChatProduct[],
  history: { role: "user" | "assistant"; content: string }[],
) {
  const response = await axios.post(
    "https://cyber-4ara.onrender.com/api/chat",
    {
      userMessage: message,
      history,
      products,
    },
  );

  return response.data.reply;
}
