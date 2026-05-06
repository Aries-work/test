import { DEFAULT_PROFILE, fetchPortfolioData } from '@/lib/data';
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
  getProjectTags,
  getProjectIndustries,
  getProjectPhases,
  slugify,
  getAdjacentProjects,
  isValidImageUrl,
} from '@/lib/utils';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await fetchPortfolioData();
  const project = data.Dynamic.find((item) => slugify(item.project_name) === params.slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

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
  })).filter(({ slug }) => slug);
}

function safeArray<T>(input?: T[]): T[] {
  return Array.isArray(input) ? input : [];
}

function getRenderableImages(images?: string[]) {
  return safeArray(images).filter((image) => isValidImageUrl(image));
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
  const segments = safeArray(parseLabeledText(text));

  return (
    <>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className="font-semibold">
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const data = await fetchPortfolioData();
  const projects = Array.isArray(data?.Dynamic) ? data.Dynamic : [];
  const profile = data?.Static?.[0] ?? DEFAULT_PROFILE;
  const project = projects.find((item) => slugify(item.project_name) === params.slug);

  if (!project) {
    notFound();
  }

  const currentProject = project as Project;
  const tags = safeArray(getProjectTags(currentProject));
  const industries = safeArray(getProjectIndustries(currentProject));
  const phases = safeArray(getProjectPhases(currentProject));
  const actions = safeArray(parseQuotedList(currentProject.actions));
  const impacts = safeArray(parseQuotedList(currentProject.impact));
  const results = safeArray(parseQuotedList(currentProject.result));
  const subtitle = getProjectSubtitle(currentProject);

  const imgProject = getRenderableImages(currentProject.img_project);
  const imgSituation = getRenderableImages(currentProject.img_situation);
  const imgTask = getRenderableImages(currentProject.img_task);
  const imgActions = getRenderableImages(currentProject.img_actions);
  const imgImpact = getRenderableImages(currentProject.img_impact);
  const imgResult = getRenderableImages(currentProject.img_result);

  const hasSituation = !isPlaceholder(currentProject.situation);
  const hasTask = !isPlaceholder(currentProject.task);
  const hasActions = actions.length > 0 && actions[0] !== '';
  const hasImpacts = impacts.length > 0 && impacts[0] !== '';
  const hasResult = !isPlaceholder(currentProject.result);
  const hasAnyContent = [hasSituation, hasTask, hasActions, hasImpacts, hasResult].some(Boolean);
  const { prev, next } = getAdjacentProjects(projects, params.slug);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-20 pb-16">
        <div className="border-b border-border/30">
          <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All projects
            </a>

            <div className="flex flex-wrap gap-2 mb-6">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="text-[10px] px-3 py-1 font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full"
                >
                  {industry}
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

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-5">
              {currentProject.project_name}
            </h1>

            <p className="text-[16px] leading-[1.7] text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="border-b border-border/30 bg-surface/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px]">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium">{currentProject.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Industry</span>
              <span className="font-medium">{currentProject.industry}</span>
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
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium">{currentProject.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{currentProject.date}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {imgProject.length > 0 ? (
            <SectionImages
              images={[imgProject[0]]}
              altPrefix={`${currentProject.project_name} cover`}
              variant="cover"
            />
          ) : (
            <div className="card-header-gradient rounded-xl mb-12 py-20 px-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative text-center">
                <p className="font-serif text-3xl sm:text-4xl text-foreground/15 mb-2">
                  {currentProject.project_name}
                </p>
                <p className="text-[13px] text-muted-foreground/40">
                  {currentProject.industry} &middot; {currentProject.role}
                </p>
              </div>
            </div>
          )}

          {hasAnyContent ? (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
              <div>
                {hasSituation && (
                  <section className="mb-10">
                    <SectionHeader number="01" label="Situation" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {currentProject.situation}
                    </p>
                    <SectionImages
                      images={imgSituation}
                      altPrefix={`${currentProject.project_name} situation`}
                    />
                  </section>
                )}

                {hasTask && (
                  <section className="mb-10">
                    <SectionHeader number="02" label="Task" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {currentProject.task}
                    </p>
                    <SectionImages
                      images={imgTask}
                      altPrefix={`${currentProject.project_name} task`}
                    />
                  </section>
                )}

                {hasActions && (
                  <section className="mb-10">
                    <SectionHeader number="03" label="Roles & Deliverables" />
                    <div className="space-y-4">
                      {actions.map((action, index) => (
                        <div key={`${action}-${index}`} className="flex items-start gap-4">
                          <span className="text-[12px] font-mono font-bold text-accent mt-0.5 w-6 shrink-0 text-right">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[15px] leading-[1.8] text-foreground/80">
                            <LabeledText text={action} />
                          </p>
                        </div>
                      ))}
                    </div>
                    <SectionImages
                      images={imgActions}
                      altPrefix={`${currentProject.project_name} action`}
                    />
                  </section>
                )}

                {hasResult && (
                  <section className="mb-10">
                    <SectionHeader number="04" label="Result" />
                    <div className="space-y-4">
                      {results.map((result, index) => (
                        <p key={`${result}-${index}`} className="text-[15px] leading-[1.8] text-foreground/80">
                          <LabeledText text={result} />
                        </p>
                      ))}
                    </div>
                    <SectionImages
                      images={imgResult}
                      altPrefix={`${currentProject.project_name} result`}
                    />
                  </section>
                )}
              </div>

              <aside className="space-y-6">
                {hasImpacts && (
                  <div className="glass rounded-xl p-5">
                    <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-accent mb-4">
                      Impact
                    </p>
                    <div className="space-y-3">
                      {impacts.map((impact, index) => (
                        <div
                          key={`${impact}-${index}`}
                          className="flex items-start gap-3 p-3 bg-accent/[0.06] border border-accent/15 rounded-lg"
                        >
                          <span className="flex items-center justify-center w-6 h-6 bg-accent text-accent-foreground text-[11px] font-mono font-bold shrink-0 rounded">
                            {index + 1}
                          </span>
                          <p className="text-[14px] leading-[1.7] text-accent">
                            <LabeledText text={impact} />
                          </p>
                        </div>
                      ))}
                    </div>
                    <SectionImages
                      images={imgImpact}
                      altPrefix={`${currentProject.project_name} impact`}
                      className="mt-5"
                    />
                  </div>
                )}

                <div className="glass rounded-xl p-5">
                  <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
                    Details
                  </p>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Company</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {currentProject.company}
                      </span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {currentProject.industry}
                      </span>
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
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {currentProject.role}
                      </span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {currentProject.date}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="text-[15px] text-muted-foreground">No content available</div>
          )}
        </div>

        <div className="border-t border-border/30">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between gap-4">
            {prev ? (
              <a
                href={`/projects/${slugify(prev.project_name)}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 group min-w-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
                <span className="max-w-[200px] truncate">{prev.project_name}</span>
              </a>
            ) : (
              <span />
            )}

            <a
              href="/#projects"
              className="text-[12px] text-muted-foreground hover:text-accent transition-colors duration-200 shrink-0"
            >
              All projects
            </a>

            {next ? (
              <a
                href={`/projects/${slugify(next.project_name)}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 group min-w-0"
              >
                <span className="max-w-[200px] truncate">{next.project_name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>

      <CTASection profile={profile} projects={projects} />
      <Footer profile={profile} />
    </div>
  );
}
