import { fetchPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Building2,
  Globe,
  Layers,
} from 'lucide-react';
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

// -------------------------
// Metadata
// -------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPortfolioData();

  const projects = Array.isArray(data?.Dynamic) ? data.Dynamic : [];

  const project = projects.find(
    (p: any) => slugify(p?.project_name ?? '') === slug
  );

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

// -------------------------
// Static params
// -------------------------
export async function generateStaticParams() {
  const data = await fetchPortfolioData();
  const projects = Array.isArray(data?.Dynamic) ? data.Dynamic : [];

  return projects.map((p: any) => ({
    slug: slugify(p?.project_name ?? ''),
  }));
}

// -------------------------
// Helpers
// -------------------------
function safeArray(input: any): any[] {
  return Array.isArray(input) ? input : [];
}

const parseImages = (img: any): string[] => {
  if (!img) return [];
  if (Array.isArray(img)) return img;
  if (typeof img === 'string') {
    return img
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

// -------------------------
// UI Components
// -------------------------
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
  const segments = safeArray(parseLabeledText(text));

  return (
    <>
      {segments.map((seg: any, i: number) =>
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

// -------------------------
// Page
// -------------------------
export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const data = await fetchPortfolioData();

  const projects = Array.isArray(data?.Dynamic) ? data.Dynamic : [];
  const profile = data?.Static?.[0] ?? {};

  const project = projects.find(
    (p: any) => slugify(p?.project_name ?? '') === slug
  );

  if (!project) notFound();

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

  const { prev, next } = getAdjacentProjects(projects, slug);

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
        {/* ================= HEADER ================= */}
        <div className="border-b border-border/30">
          <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All projects
            </a>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-6 mb-4">
              {project.project_name}
            </h1>

            <p className="text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {!hasProjectCover ? (
            <div className="p-10 text-center border rounded-xl opacity-60">
              No image available
            </div>
          ) : (
            <img
              src={imgProject[0]}
              className="rounded-xl mb-12"
              alt="cover"
            />
          )}

          {!hasAnyContent ? (
            <div className="text-muted-foreground">
              No content available
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
              <div>
                {hasSituation && (
                  <section>
                    <SectionHeader number="01" label="Situation" />
                    <p>{project.situation}</p>
                    <SectionImages images={imgSituation} />
                  </section>
                )}

                {hasTask && (
                  <section>
                    <SectionHeader number="02" label="Task" />
                    <p>{project.task}</p>
                    <SectionImages images={imgTask} />
                  </section>
                )}

                {hasActions && (
                  <section>
                    <SectionHeader number="03" label="Actions" />
                    {actions.map((a, i) => (
                      <p key={i}>
                        <LabeledText text={a} />
                      </p>
                    ))}
                    <SectionImages images={imgActions} />
                  </section>
                )}

                {hasResult && (
                  <section>
                    <SectionHeader number="04" label="Result" />
                    {results.map((r, i) => (
                      <p key={i}>
                        <LabeledText text={r} />
                      </p>
                    ))}
                    <SectionImages images={imgResult} />
                  </section>
                )}
              </div>

              <aside className="space-y-6">
                {hasImpacts && (
                  <div>
                    <h3>Impact</h3>
                    {impacts.map((i, idx) => (
                      <div key={idx}>{i}</div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>

        {/* ================= NAV ================= */}
        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between">
          {prev ? (
            <a href={`/projects/${slugify(prev.project_name)}`}>
              ← {prev.project_name}
            </a>
          ) : (
            <span />
          )}

          <a href="/#projects">All</a>

          {next ? (
            <a href={`/projects/${slugify(next.project_name)}`}>
              {next.project_name} →
            </a>
          ) : (
            <span />
          )}
        </div>
      </main>

      <CTASection profile={profile} projects={projects} />
      <Footer profile={profile} />
    </div>
  );
}
