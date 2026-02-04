// utils/sendChatMessage.ts
import axios from "axios";
import { TChatProduct } from "../types/chatTypes";

export async function sendChatMessage(
  message: string,
  products: TChatProduct[],
  history: { role: "user" | "assistant"; content: string }[]
) {

  
  const response = await axios.post("http://localhost:4000/api/chat", {
    userMessage: message,
    history,
    products,
  });

  return response.data.reply;
}
