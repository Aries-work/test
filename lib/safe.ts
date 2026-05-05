export function safeArray(input: any): string[] {
  if (Array.isArray(input)) return input;

  if (typeof input === "string") {
    return input.split(",").map(s => s.trim()).filter(Boolean);
  }

  return [];
}

export function safeString(input: any, fallback = ""): string {
  if (typeof input === "string") return input;
  return fallback;
}
