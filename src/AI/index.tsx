
import React, { useEffect } from "react";

import { useChatLogic } from "./hooks/useChatLogic";
import { useChatStore } from "./store/chatStore";

import ChatInput from "./components/ChatInput";
import MessageContent from "./components/MessageContent";

export default function ChatAssistant() {
  const { input, setInput, history, handleSend, welcomeMessage } =
    useChatLogic();
  const initializeHistory = useChatStore((state) => state.initializeHistory);

  useEffect(() => {
    if (history.length === 0) {
      initializeHistory([welcomeMessage]);
    }
  }, [history.length, initializeHistory, welcomeMessage]);

  return (
    <div className="container mx-auto my-8 border border-gray-200 rounded-xl p-6 flex flex-col h-[85vh] bg-white shadow-lg">

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">AI</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Cyber's AI Assistant
        </h2>
      </div>

      <div
        className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2
        scrollbar-thin
        scrollbar-thumb-gray-400
        scrollbar-track-gray-100
        scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full
        hover:scrollbar-thumb-gray-600
      "
      >
        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-br-none"
                  : "bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-none"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-semibold ${
                    msg.role === "user" ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </span>
              </div>
              <div
                className={
                  msg.role === "user"
                    ? "text-white"
                    : "text-gray-800"
                }
              >
                <MessageContent
                  content={msg.content}
                  isUser={msg.role === "user"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          placeholder="Ask me about products, recommendations, or anything else..."
        />
      </div>
    </div>
  );
}
