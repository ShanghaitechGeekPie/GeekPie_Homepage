import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDescription(
  content: string,
  summary?: string,
  maxLength: number = 150
): string {
  // Prioritize summary if available
  if (summary && summary.trim()) {
    const trimmed = summary.trim();
    return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength)}...` : trimmed;
  }

  // Generate from content
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links but keep text
    .replace(/#{{1,6}}\s/g, "") // Remove headings
    .replace(/>\s/g, "") // Remove blockquotes
    .replace(/`{{3}}[\s\S]*?`{{3}}/g, "") // Remove code blocks
    .replace(/`.*?`/g, "") // Remove inline code
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italic
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim();

  if (!plainText) return "";
  return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
}
