import { fetchPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Briefcase, Calendar, Building2, Globe, Layers } from 'lucide-react';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import {
  parseQuotedList,
  isPlaceholder,
  getProjectSubtitle,
  isValidImageUrl,
  slugify,
  getProjectTags,
  getProjectIndustries,
  getProjectPhases,
  getAdjacentProjects,
} from '@/lib/utils';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await fetchPortfolioData();
  const project = data.Dynamic.find((p) => slugify(p.project_name) === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.project_name} | Aries Liu`,
    description: isPlaceholder(project.short_description)
      ? `${project.role} at ${project.company} - ${project.industry}`
      : project.short_description || `${project.role} at ${project.company}`,
  };
}

export async function generateStaticParams() {
  const data = await fetchPortfolioData();
  return data.Dynamic.map((project) => ({
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const data = await fetchPortfolioData();
  const project = data.Dynamic.find((p) => slugify(p.project_name) === params.slug);
  const profile = data.Static[0];

  if (!project) {
    notFound();
  }

  const tags = getProjectTags(project);
  const industries = getProjectIndustries(project);
  const phases = getProjectPhases(project);
  const actions = parseQuotedList(project.actions);
  const impacts = parseQuotedList(project.impact);
  const subtitle = getProjectSubtitle(project);
  const hasImg1 = isValidImageUrl(project.img1);
  const hasImg2 = isValidImageUrl(project.img2);
  const hasSituation = !isPlaceholder(project.situation);
  const hasTask = !isPlaceholder(project.task);
  const hasResult = !isPlaceholder(project.result);
  const hasActions = actions.length > 0 && actions[0] !== '';
  const hasImpacts = impacts.length > 0 && impacts[0] !== '';
  const hasAnyContent = hasSituation || hasTask || hasActions || hasImpacts || hasResult;
  const { prev, next } = getAdjacentProjects(data.Dynamic, params.slug);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-20 pb-16">
        {/* Full-width header */}
        <div className="border-b border-border/30">
          <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">
            {/* Back link */}
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All projects
            </a>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="text-[10px] px-3 py-1 font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full"
                >
                  {ind}
                </span>
              ))}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-3 py-1 font-medium tracking-wider uppercase bg-secondary text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-5">
              {project.project_name}
            </h1>

            <p className="text-[16px] leading-[1.7] text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="border-b border-border/30 bg-surface/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px]">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium">{project.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Industry</span>
              <span className="font-medium">{project.industry}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium">{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{project.date}</span>
            </div>
            {phases.length > 0 && (
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent/60" />
                <span className="text-muted-foreground">Phase</span>
                <div className="flex flex-wrap gap-1.5">
                  {phases.map((phase) => (
                    <span
                      key={phase}
                      className="text-[11px] px-2.5 py-0.5 font-semibold tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 rounded-full"
                    >
                      {phase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content area: main + sidebar */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Cover image or placeholder banner */}
          {!hasImg1 && !hasImg2 && (
            <div className="card-header-gradient rounded-xl mb-12 py-20 px-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative text-center">
                <p className="font-serif text-3xl sm:text-4xl text-foreground/15 mb-2">
                  {project.project_name}
                </p>
                <p className="text-[13px] text-muted-foreground/40">
                  {project.industry} &middot; {project.role}
                </p>
              </div>
            </div>
          )}

          {hasAnyContent && (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
              {/* Left: Main narrative */}
              <div>
                {hasSituation && (
                  <section className="mb-10">
                    <SectionHeader number="01" label="Situation" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {project.situation}
                    </p>
                  </section>
                )}

                {hasTask && (
                  <section className="mb-10">
                    <SectionHeader number="02" label="Task" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {project.task}
                    </p>
                  </section>
                )}

                {hasImg1 && (
                  <div className="overflow-hidden rounded-lg mb-10">
                    <img
                      src={project.img1}
                      alt={`${project.project_name} - 1`}
                      className="w-full h-56 sm:h-72 object-cover"
                    />
                  </div>
                )}

                {hasActions && (
                  <section className="mb-10">
                    <SectionHeader number="03" label="Roles & Deliverables" />
                    <div className="space-y-4">
                      {actions.map((action, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="text-[12px] font-mono font-bold text-accent mt-0.5 w-6 shrink-0 text-right">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[15px] leading-[1.8] text-foreground/80">
                            {action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {hasImg2 && (
                  <div className="overflow-hidden rounded-lg mb-10">
                    <img
                      src={project.img2}
                      alt={`${project.project_name} - 2`}
                      className="w-full h-56 sm:h-72 object-cover"
                    />
                  </div>
                )}

                {hasResult && (
                  <section className="mb-10">
                    <SectionHeader number="05" label="Result" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {project.result}
                    </p>
                  </section>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {/* Impact cards */}
                {hasImpacts && (
                  <div className="glass rounded-xl p-5">
                    <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-accent mb-4">
                      Impact
                    </p>
                    <div className="space-y-3">
                      {impacts.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-accent/[0.06] border border-accent/15 rounded-lg"
                        >
                          <span className="flex items-center justify-center w-6 h-6 bg-accent text-accent-foreground text-[11px] font-mono font-bold shrink-0 rounded">
                            {i + 1}
                          </span>
                          <p className="text-[14px] leading-[1.7] font-medium text-accent">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project info card */}
                <div className="glass rounded-xl p-5">
                  <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
                    Details
                  </p>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company</span>
                      <span className="font-medium text-right max-w-[60%]">{project.company}</span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium">{project.industry}</span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium">{project.role}</span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{project.date}</span>
                    </div>
                    {phases.length > 0 && (
                      <>
                        <div className="h-px bg-border/40" />
                        <div>
                          <span className="text-muted-foreground">Phase</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {phases.map((phase) => (
                              <span
                                key={phase}
                                className="text-[11px] px-2.5 py-0.5 font-semibold tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 rounded-full"
                              >
                                {phase}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Previous / Next navigation */}
        <div className="border-t border-border/30">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            {prev ? (
              <a
                href={`/projects/${slugify(prev.project_name)}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span className="max-w-[200px] truncate">{prev.project_name}</span>
              </a>
            ) : (
              <span />
            )}

            <a
              href="/#projects"
              className="text-[12px] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              All projects
            </a>

            {next ? (
              <a
                href={`/projects/${slugify(next.project_name)}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <span className="max-w-[200px] truncate">{next.project_name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>

      <CTASection profile={profile} projects={data.Dynamic} />
      <Footer profile={profile} />
    </div>
  );
}
