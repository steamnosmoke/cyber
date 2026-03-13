import { useParsedAIMessage } from "../hooks/useParsedAIMessage";
import { useFormattedMessage } from "../hooks/useFormattedMessage";
import ProductCard from "./ProductCard";
import { ChatProduct } from "../types/chatTypes";
import { useLayoutEffect, useRef } from "react";

interface MessageContenProps {
  content: string;
  isUser?: boolean;
}

function MessageContent({ content, isUser = false }: MessageContenProps) {
  const textColorClass = isUser ? "text-white" : "text-gray-800";

  const { text, products } = useParsedAIMessage(content);
  const formattedMessage = useFormattedMessage(text, textColorClass);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [content, products.length]);

  return (
    <div className="text-base leading-relaxed whitespace-pre-wrap">
      {formattedMessage}

      {products.length > 0 && (
        <div className="grid gap-x-10 gap-y-10 place-items-center justify-center content-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))] transition-all duration-300 my-10">
          {products.map((p: ChatProduct) => (
            <ProductCard key={p.objectId} objectId={p.objectId} />
          ))}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageContent;
