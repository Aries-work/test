import { fetchPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Briefcase, Calendar, Building2, Globe, Layers } from 'lucide-react';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { SectionImages } from '@/components/section-images';
import {
  parseQuotedList,
  parseLabeledText,
  isPlaceholder,
  getProjectSubtitle,
  slugify,
  getProjectTags,
  getProjectIndustries,
  getProjectPhases,
  getAdjacentProjects,
} from '@/lib/utils';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPortfolioData();

  const project = Array.isArray(data?.Dynamic)
    ? data.Dynamic.find((p: any) => slugify(p.project_name) === slug)
    : null;

  if (!project) return { title: 'Project Not Found' };

  const desc =
    project.short_description ??
    `${project.role ?? ''} at ${project.company ?? ''}`;

  return {
    title: `${project.project_name ?? 'Project'} | Aries Liu`,
    description: isPlaceholder(project.short_description)
      ? `${project.role ?? ''} at ${project.company ?? ''} - ${project.industry ?? ''}`
      : desc,
  };
}

export async function generateStaticParams() {
  const data = await fetchPortfolioData();
  if (!Array.isArray(data?.Dynamic)) return [];

  return data.Dynamic.map((project: any) => ({
    slug: slugify(project.project_name),
  }));
}

function SectionHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[11px] font-mono font-bold text-accent tracking-wider bg-accent/10 px-2 py-0.5 rounded">
        {number}
      </span>
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </h3>
    </div>
  );
}

function LabeledText({ text }: { text: string }) {
  const segments = parseLabeledText(text);
  const safeSegments = Array.isArray(segments) ? segments : [];
  return (
    <>
      {safeSegments.map((seg: any, i: number) =>
        seg.bold ? (
          <strong key={i} className="font-semibold">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

const parseImages = (imgData: any) => {
  if (!imgData) return [];
  if (Array.isArray(imgData)) return imgData;
  if (typeof imgData === 'string') {
    return imgData.split(',').map((s: string) => s.trim()).filter(Boolean);
  }
  return [];
};

const safeArray = (data: any) => (Array.isArray(data) ? data : []);

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchPortfolioData();

  const project = Array.isArray(data?.Dynamic)
    ? data.Dynamic.find((p: any) => slugify(p.project_name) === slug)
    : null;

  const profile = data?.Static?.[0] ?? {};

  if (!project) {
    notFound();
  }

  const tags = safeArray(getProjectTags(project));
  const industries = safeArray(getProjectIndustries(project));
  const phases = safeArray(getProjectPhases(project));
  const actions = safeArray(parseQuotedList(project.actions));
  const impacts = safeArray(parseQuotedList(project.impact));
  const results = safeArray(parseQuotedList(project.result));
  const subtitle = getProjectSubtitle(project);

  const hasSituation = !isPlaceholder(project.situation);
  const hasTask = !isPlaceholder(project.task);
  const hasResult = !isPlaceholder(project.result);
  const hasActions = actions.length > 0 && actions[0] !== '';
  const hasImpacts = impacts.length > 0 && impacts[0] !== '';

  const hasAnyContent = [
    hasSituation,
    hasTask,
    hasActions,
    hasImpacts,
    hasResult,
  ].some(Boolean);

  const dynamicData = Array.isArray(data?.Dynamic) ? data.Dynamic : [];
  const { prev, next } = getAdjacentProjects(dynamicData, slug);

  const imgProject = parseImages(project.img_project);
  const imgSituation = parseImages(project.img_situation);
  const imgTask = parseImages(project.img_task);
  const imgActions = parseImages(project.img_actions);
  const imgResult = parseImages(project.img_result);

  const hasProjectCover = imgProject.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-20 pb-16">
        {/* 下面 UI 完全保持你原本的，不動 */}
