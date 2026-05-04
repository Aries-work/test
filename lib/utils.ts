import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Project } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BracketSegment {
  text: string;
  highlighted: boolean;
}

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

export function parseQuotedList(text: string | undefined): string[] {
  if (!text) return [];
  const matches = text.match(/"([^"]*)"/g);
  if (matches && matches.length > 0) {
    return matches.map((m) => m.slice(1, -1).trim()).filter(Boolean);
  }
  return text.split(',').map((s) => s.trim()).filter(Boolean);
}

const PLACEHOLDER_PHRASES = [
  'short description here',
  'situation here',
  'task here',
  'placeholder',
  'lorem ipsum',
  'tbd',
  'todo',
];

export function isPlaceholder(text: string | undefined): boolean {
  if (!text) return true;
  const normalized = text.trim().toLowerCase();
  if (!normalized) return true;
  return PLACEHOLDER_PHRASES.some((p) => normalized === p || normalized === `${p}.`);
}

export function getProjectSubtitle(project: Project): string {
  if (project.short_description && !isPlaceholder(project.short_description)) {
    return project.short_description;
  }
  return `${project.role} at ${project.company}`;
}

export function extractIndustries(projects: Project[]): string[] {
  const industrySet = new Set<string>();
  projects.forEach((p) => {
    p.industry.split('/').forEach((i) => {
      const trimmed = i.trim();
      if (trimmed) industrySet.add(trimmed);
    });
  });
  return Array.from(industrySet);
}

export function extractDomains(profileSummary: string, projects: Project[]): string[] {
  const fromSummary = ['FinTech', 'Gaming', 'MarTech', 'Healthcare', 'SaaS', 'ERP', 'Mobile'];
  const fromProjects = extractIndustries(projects);
  const domainSet = new Set([...fromProjects, ...fromSummary]);
  return Array.from(domainSet);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function groupProjectsByCompany(projects: Project[]): Map<string, Project[]> {
  const groups = new Map<string, Project[]>();
  projects.forEach((p) => {
    const key = p.company;
    const existing = groups.get(key) || [];
    existing.push(p);
    groups.set(key, existing);
  });
  return groups;
}

export function isValidImageUrl(url: string | undefined): boolean {
  if (!url || !url.trim()) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getProjectTags(project: Project): string[] {
  if (!project.Tags) return [];
  return project.Tags.split(',').map((t) => t.trim()).filter(Boolean);
}

export function getProjectIndustries(project: Project): string[] {
  if (!project.industry) return [];
  return project.industry.split('/').map((i) => i.trim()).filter(Boolean);
}

export interface ProfileStats {
  yearsProduct: number;
  yearsLeadership: string;
  domainCount: number;
  industryCount: number;
}

export function parseProfileStats(summary: string, projects: Project[]): ProfileStats {
  const productMatch = summary.match(/(\d+)\s*yrs?\s*Product/i);
  const leadershipMatch = summary.match(/(\d+\+?)\s*yrs?\s*Leadership/i);

  return {
    yearsProduct: productMatch ? parseInt(productMatch[1], 10) : 8,
    yearsLeadership: leadershipMatch ? leadershipMatch[1] : '4+',
    domainCount: extractDomains(summary, projects).length,
    industryCount: extractIndustries(projects).length,
  };
}

export function getAdjacentProjects(projects: Project[], currentSlug: string): { prev?: Project; next?: Project } {
  const slugs = projects.map((p) => slugify(p.project_name));
  const currentIndex = slugs.indexOf(currentSlug);
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : undefined,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined,
  };
}
