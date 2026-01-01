import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import removeMd from "remove-markdown";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDescription(
  content: string,
  summary?: string,
  maxLength: number = 150,
): string {
  // Prioritize summary if available
  if (summary && summary.trim()) {
    const trimmed = summary.trim();
    return trimmed.length > maxLength
      ? `${trimmed.slice(0, maxLength)}...`
      : trimmed;
  }

  // Generate from content
  const plainText = removeMd(content, {
    gfm: true,
    useImgAltText: false,
    htmlTagsToSkip: ["h1", "pre"],
  }).trim();

  if (!plainText) return "";
  return plainText.length > maxLength
    ? `${plainText.slice(0, maxLength)}...`
    : plainText;
}
