// hooks/useParsedAIMessage.ts
import { useMemo } from "react";

export function useParsedAIMessage(content: string) {
  return useMemo(() => {
    const match = content.match(
      /===PRODUCTS_START===([\s\S]*?)===PRODUCTS_END===/,
    );

    if (!match) {
      return { text: content, products: [] };
    }

    const products = JSON.parse(match[1].trim());
    const text = content.replace(match[0], "").trim();
    return { text, products };
  }, [content]);
}
