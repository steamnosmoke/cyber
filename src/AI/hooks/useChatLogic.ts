/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { sendChatMessage } from "../utils/sendChatMessage";
import useGetProducts from "./useGetProducts";
import { useChatStore } from "../store/chatStore";
import { TChatMessage } from "../types/chatTypes";
import { getLoadingMessages } from "../config/loadingMessages";
import useUpdateUserAIChat from "./user/useUpdateUSerAIChat";
import useGetAIChat from "./useGetAIChat";
import { v4 as uuid } from "uuid";
import welcomeMessage from "../config/welcomeMessage";

export const useChatLogic = (id: string) => {
  const input = useChatStore((state) => state.input);
  const setInput = useChatStore((state) => state.setInput);
  const setGuestHistory = useChatStore((state) => state.setHistory);
  const loadingMessages = getLoadingMessages();
  const { products } = useGetProducts();

  const { mutate: setUserHistory } = useUpdateUserAIChat(id);
  const { chatData } = useGetAIChat(id);
  const setHistory = id === "guest" ? setGuestHistory : setUserHistory;

  const history = chatData ? chatData : [welcomeMessage]

  const [loadingMessage, setLoadingMessage] = useState<TChatMessage | null>(null)

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: TChatMessage = {
      role: "user",
      content: input,
      id: uuid(),
      timestamp: new Date(),
    };

    const newHistory: TChatMessage[] = [...history, userMessage];
    setHistory(userMessage);
    setInput("");

    const loadingMessage: TChatMessage = {
      role: "assistant",
      content:
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
      id: "loading",
      timestamp: new Date(),
    };

    setLoadingMessage(loadingMessage)

    try {
      const compatibleHistory = newHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      }));

      const reply = await sendChatMessage(input, products, compatibleHistory);

      const assistantMessage: TChatMessage = {
        role: "assistant",
        content: reply,
        id: uuid(),
        timestamp: new Date(),
      };
      setHistory(assistantMessage);
      setLoadingMessage(null)
    } catch {
      setLoadingMessage({
        role: "assistant",
        content: "An error occurred while contacting AI.",
        id: "loading",
        timestamp: new Date(),
      });
    }
  }, [input, products, history]);

  return {history, setHistory, handleSend, loadingMessage};
};
