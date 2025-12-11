// components/EnhancedChatAssistant.tsx
import React from "react";
import ChatAssistant from "../index";
import { useChatStore } from "../store/chatStore";

export function EnhancedChatAssistant() {
  const clearHistory = useChatStore((state) => state.clearHistory);
  const history = useChatStore((state) => state.history);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Cyber's AI Assistant</h2>
        {history.length > 1 && (
          <button onClick={clearHistory} className="clear-history-btn">
            Clear History
          </button>
        )}
      </div>
      <ChatAssistant />
    </div>
  );
}
