// components/shared/MessageContent.tsx
import React from "react";

interface MessageContentProps {
  content: string;
  isUser?: boolean;
}

function MessageContent({ content, isUser = false }: MessageContentProps) {
  const textColorClass = isUser ? "text-white" : "text-gray-800";

  const formatContent = (text: string) => {
    const lines = text.split("\n");
    let inTable = false;
    let tableRows: string[][] = [];

    const formattedLines = lines
      .map((line, index) => {
        const trimmedLine = line.trim();

        // Определяем, является ли строка частью таблицы
        if (trimmedLine.includes("|") && trimmedLine.includes("-")) {
          inTable = true;
          return null; // Пропускаем разделители таблицы
        }

        if (trimmedLine.includes("|") && inTable) {
          // Извлекаем ячейки таблицы
          const cells = trimmedLine
            .split("|")
            .map((cell) => cell.trim())
            .filter((cell) => cell.length > 0);

          tableRows.push(cells);
          return null;
        } else {
          inTable = false;
          // Если у нас есть накопленные строки таблицы, рендерим её
          if (tableRows.length > 0) {
            const table = renderTable(tableRows);
            tableRows = [];
            return (
              <div key={`table-${index}`} className="my-3">
                {table}
              </div>
            );
          }

          // Обычный текст
          if (trimmedLine.startsWith("####")) {
            return (
              <h4
                key={index}
                className={`font-bold text-lg mt-4 mb-2 ${textColorClass}`}
              >
                {trimmedLine.replace("####", "").trim()}
              </h4>
            );
          }

          if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
            return (
              <strong
                key={index}
                className={`font-bold block mt-2 ${textColorClass}`}
              >
                {trimmedLine.replace(/\*\*/g, "").trim()}
              </strong>
            );
          }

          if (trimmedLine.startsWith("- ")) {
            return (
              <li key={index} className={`ml-4 list-disc ${textColorClass}`}>
                {trimmedLine.replace("- ", "").trim()}
              </li>
            );
          }

          return (
            <div key={index} className="mb-2 last:mb-0">
              {trimmedLine || <br />}
            </div>
          );
        }
      })
      .filter(Boolean);

    // Если таблица была в конце сообщения
    if (tableRows.length > 0) {
      formattedLines.push(
        <div key="table-end" className="my-3">
          {renderTable(tableRows)}
        </div>
      );
    }

    return formattedLines;
  };

  const renderTable = (rows: string[][]) => {
    if (rows.length === 0) return null;

    return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {rows[0]?.map((header, cellIndex) => (
                <th
                  key={cellIndex}
                  className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-gray-700 border-b border-gray-100 last:border-b-0"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      className={`whitespace-pre-wrap text-sm leading-relaxed ${textColorClass}`}
    >
      {formatContent(content)}
    </div>
  );
}

export default MessageContent;
