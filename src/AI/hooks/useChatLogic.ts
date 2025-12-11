// hooks/useChatLogic.ts
import { useCallback, useRef } from "react";
import { sendChatMessage } from "../utils/sendChatMessage";
import useGetProducts from "hooks/useGetProducts";
import { useChatStore } from "../store/chatStore";
import { TChatMessage } from "../types/chatTypes";
import { getLoadingMessages } from "../config/loadingMessages";

export const useChatLogic = () => {
  const input = useChatStore((state) => state.input);
  const setInput = useChatStore((state) => state.setInput);
  const history = useChatStore((state) => state.history);
  const setHistory = useChatStore((state) => state.setHistory);

  const loadingRef = useRef<number | null>(null);

  const { products } = useGetProducts("");

  const loadingMessages = getLoadingMessages();

  const welcomeMessage: TChatMessage = {
    role: "assistant",
    content:
      "Hello! I'm your AI shopping assistant. I can help you:\n\n• Find products based on your needs\n• Compare different items\n• Provide product recommendations\n• Answer questions about brands and categories\n• Help you make informed purchasing decisions\n\nWhat would you like to know about our products?",
  };

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: TChatMessage = {
      role: "user",
      content: input,
    };

    // Добавляем сообщение пользователя
    const newHistory = [...history, userMessage];
    setHistory(userMessage);
    setInput("");

    // Показываем loading message
    const loadingMessage: TChatMessage = {
      role: "assistant",
      content:
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
    };

    loadingRef.current = newHistory.length;
    setHistory(loadingMessage);

    try {
      // Convert TChatMessage to compatible type for sendChatMessage
      const compatibleHistory = newHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      }));

      const reply = await sendChatMessage(input, products, compatibleHistory);

      const assistantMessage: TChatMessage = {
        role: "assistant",
        content: reply,
      };

      // Заменяем loading message на реальный ответ
      setHistory(assistantMessage, loadingRef.current);
      loadingRef.current = null;
    } catch (err) {
      const errorMessage: TChatMessage = {
        role: "assistant",
        content:
          "An error occurred while contacting AI. Please try again later.",
      };
      if (loadingRef.current !== null) {
        setHistory(errorMessage, loadingRef.current);
        loadingRef.current = null;
      }
    }
  }, [input, products, history, setHistory, setInput, loadingMessages]);

  return {
    input,
    setInput,
    history,
    handleSend,
    welcomeMessage,
  };
};
