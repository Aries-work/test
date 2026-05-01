import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BracketSegment {
  text: string;
  highlighted: boolean;
}

/**
 * Parses text with [bracket] notation.
 * Text within [] is marked as highlighted.
 */
export function parseBracketText(text: string): BracketSegment[] {
  const segments: BracketSegment[] = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), highlighted: false });
    }
    segments.push({ text: match[1], highlighted: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), highlighted: false });
  }

  return segments;
}

/**
 * Parses a quoted-string list like `"item1", "item2"` into an array of strings.
 * Falls back to comma-split if no quotes are found.
 */
export function parseQuotedList(text: string): string[] {
  const matches = text.match(/"([^"]*)"/g);
  if (matches && matches.length > 0) {
    return matches.map((m) => m.slice(1, -1).trim()).filter(Boolean);
  }
  return text.split(',').map((s) => s.trim()).filter(Boolean);
}
