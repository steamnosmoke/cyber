// utils/parseMarkdownTable.ts
export function parseMarkdownTable(lines: string[], startIndex: number) {
  const headers = lines[startIndex]
    .split("|")
    .slice(1, -1)
    .map((c) => c.trim());

  const rows: string[][] = [];
  let index = startIndex + 2; // skip separator

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line.startsWith("|") || !line.endsWith("|")) break;

    rows.push(
      line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim()),
    );

    index++;
  }

  return {
    headers,
    rows,
    endIndex: index - 1,
  };
}
