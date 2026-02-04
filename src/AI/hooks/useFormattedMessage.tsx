// hooks/useFormattedMessage.ts
import React, { useMemo } from "react";
import { parseMarkdownTable } from "../utils/parseMarkdownTable";
import renderTable from "../utils/renderTable";

export function useFormattedMessage(
  text: string,
  textColorClass: string
) {
  return useMemo(() => {
    const lines = text.split("\n");
    const result: React.ReactNode[] = [];

    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      // Markdown table
      if (
        line.startsWith("|") &&
        line.endsWith("|") &&
        i + 1 < lines.length &&
        /^(\|\s*-+\s*)+\|$/.test(lines[i + 1].trim())
      ) {
        const { headers, rows, endIndex } =
          parseMarkdownTable(lines, i);

        result.push(
          <div key={`table-${i}`} className="my-4">
            {renderTable(headers, rows)}
          </div>
        );

        i = endIndex + 1;
        continue;
      }

      // Heading
      if (line.startsWith("####")) {
        result.push(
          <h4
            key={i}
            className={`font-bold text-lg mt-4 mb-2 ${textColorClass}`}
          >
            {line.replace("####", "").trim()}
          </h4>
        );
        i++;
        continue;
      }

      // Bold
      if (line.startsWith("**") && line.endsWith("**")) {
        result.push(
          <strong
            key={i}
            className={`block font-semibold mt-2 ${textColorClass}`}
          >
            {line.replace(/\*\*/g, "")}
          </strong>
        );
        i++;
        continue;
      }

      // List
      if (line.startsWith("- ")) {
        result.push(
          <li key={i} className={`ml-4 list-disc ${textColorClass}`}>
            {line.replace("- ", "")}
          </li>
        );
        i++;
        continue;
      }

      // Text
      result.push(
        <div key={i} className="mb-2">
          {line || <br />}
        </div>
      );

      i++;
    }

    return result;
  }, [text, textColorClass]);
}
