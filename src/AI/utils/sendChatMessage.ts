// utils/sendChatMessage.ts
import axios from "axios";
import { TProduct } from "types/ProductTypes";

export async function sendChatMessage(
  message: string,
  products: TProduct[],
  history: { role: "user" | "assistant"; content: string }[]
) {
  // Отправляем только минимальную информацию
  const minimizedProducts = products.map((p) => ({
    name: p.name,
    brand: p.brand,
    category: p.category,
  }));

  const response = await axios.post("http://localhost:4000/api/chat", {
    userMessage: message,
    history,
    products: minimizedProducts,
  });

  return response.data.reply;
}
