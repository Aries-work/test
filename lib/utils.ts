import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Project } from "./types";

/* -----------------------------
   Core Utility
------------------------------ */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -----------------------------
   Text Parsing (UI formatting)
------------------------------ */

export interface BracketSegment {
  text: string;
  highlighted: boolean;
}

export function parseBracketText(text: string): BracketSegment[] {
  if (!text) return [];

  const segments: BracketSegment[] = [];
  const regex = /\[([^\]]+)\]/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        highlighted: false,
      });
    }

    segments.push({
      text: match[1],
      highlighted: true,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      highlighted: false,
    });
  }

  return segments;
}

export interface LabeledTextSegment {
  text: string;
  bold: boolean;
}

export function parseLabeledText(text: string): LabeledTextSegment[] {
  if (!text) return [];

  const segments: LabeledTextSegment[] = [];
  const regex = /\[([^\]]+)\]/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        bold: false,
      });
    }

    segments.push({
      text: match[1],
      bold: true,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      bold: false,
    });
  }

  return segments;
}

/* -----------------------------
   Safe Data Parsing (IMPORTANT)
------------------------------ */

export function parseQuotedList(text?: string): string[] {
  if (!text) return [];

  const matches = text.match(/"([^"]*)"/g);

  if (matches?.length) {
    return matches
      .map((m) => m.slice(1, -1).trim())
      .filter(Boolean);
  }

  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* -----------------------------
   Placeholder detection
------------------------------ */

const PLACEHOLDER_PHRASES = [
  "short description here",
  "situation here",
  "task here",
  "placeholder",
  "lorem ipsum",
  "tbd",
  "todo",
];

export function isPlaceholder(text?: string): boolean {
  if (!text) return true;

  const normalized = text.trim().toLowerCase();
  if (!normalized) return true;

  return PLACEHOLDER_PHRASES.some(
    (p) => normalized === p || normalized === `${p}.`
  );
}

/* -----------------------------
   Project helpers
------------------------------ */

export function getProjectSubtitle(project: Project): string {
  if (project?.short_description && !isPlaceholder(project.short_description)) {
    return project.short_description;
  }

  return `${project?.role ?? ""} at ${project?.company ?? ""}`;
}

export function getProjectTags(project: Project): string[] {
  return safeSplit(project?.Tags, ",");
}

export function getProjectIndustries(project: Project): string[] {
  return safeSplit(project?.industry, "/");
}

export function getProjectPhases(project: Project): string[] {
  return safeSplit(project?.phase, ",");
}

/* -----------------------------
   Shared helpers (SAFE LAYER)
------------------------------ */

function safeSplit(
  input: unknown,
  delimiter: string
): string[] {
  if (Array.isArray(input)) return input;

  if (typeof input === "string") {
    return input
      .split(delimiter)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}

/* -----------------------------
   Slug
------------------------------ */

export function slugify(name: string): string {
  if (!name) return "";

  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* -----------------------------
   Navigation helpers
------------------------------ */

export function getAdjacentProjects(
  projects: Project[],
  currentSlug: string
): { prev?: Project; next?: Project } {
  const slugs = projects.map((p) => slugify(p.project_name));
  const index = slugs.indexOf(currentSlug);

  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next:
      index >= 0 && index < projects.length - 1
        ? projects[index + 1]
        : undefined,
  };
}

/* -----------------------------
   Validation helpers
------------------------------ */

export function isValidImageUrl(url?: string): boolean {
  if (!url?.trim()) return false;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
