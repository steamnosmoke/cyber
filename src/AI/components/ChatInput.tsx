// components/shared/ChatInput.tsx
import React, { useState, useRef, useEffect } from "react";
import send from "assets/images/send.png";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = "Write your message...",
  disabled = false,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Автоматическое изменение высоты textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  }, [value]);

  const isSendDisabled = disabled || !value.trim();

  return (
    <div
      className={`
        relative 
        flex 
        flex-col 
        border 
        rounded-lg 
        transition-all 
        duration-200
        bg-white
        ${
          isFocused
            ? "border-gray-800 ring-2 ring-gray-300 shadow-sm"
            : "border-gray-400 hover:border-gray-600"
        }
        ${isSendDisabled ? "opacity-70" : ""}
      `}
    >
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className="
            w-full 
            min-h-[60px]
            max-h-[200px]
            py-4
            px-4 
            pr-12
            resize-none
            bg-transparent
            border-none
            outline-none
            text-gray-900
            placeholder-gray-500
            disabled:cursor-not-allowed
            overflow-y-auto
            
            /* Кастомный скроллбар */
            scrollbar-thin
            scrollbar-thumb-gray-400
            scrollbar-track-gray-100
            scrollbar-thumb-rounded-full
            scrollbar-track-rounded-full
            
            hover:scrollbar-thumb-gray-600
          "
          rows={1}
          style={{ height: "auto" }}
        />

        {/* Character counter */}
        {value.length > 200 && (
          <div className="absolute bottom-2 right-4 text-xs text-gray-500">
            {value.length}/500
          </div>
        )}
      </div>

      {/* Send button at bottom right */}
      <div className="flex justify-end p-3 border-trounded-b-lg">
        <button
          onClick={onSend}
          disabled={isSendDisabled}
          className={`
            flex 
            items-center 
            justify-center 
            w-10 
            h-10 
            rounded-lg 
            transition-all 
            duration-200
            ${
              isSendDisabled
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-gray-800 hover:bg-gray-900 active:scale-95 shadow-sm"
            }
          `}
        >
          <img
            src={send}
            alt="Send message"
            className={`w-5 h-5 ${
              isSendDisabled ? "opacity-50" : "filter brightness-0 invert"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
