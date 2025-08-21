export default function formatKey(key: string): string {
  return key.split(/(?=[A-Z])/).join(" ");
}
