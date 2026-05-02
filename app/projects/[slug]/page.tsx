import { fetchPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { parseQuotedList, isPlaceholder, getProjectSubtitle, isValidImageUrl, slugify } from '@/lib/utils';
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
      : project.short_description,
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
      <span className="text-[11px] font-mono font-semibold text-accent tracking-wider">{number}</span>
      <h3 className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
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

  const tags = project.Tags.split(',').map((t) => t.trim());
  const industries = project.industry.split('/').map((i) => i.trim());
  const actions = parseQuotedList(project.actions);
  const impacts = parseQuotedList(project.impact);
  const subtitle = getProjectSubtitle(project);
  const hasImg1 = isValidImageUrl(project.img1);
  const hasImg2 = isValidImageUrl(project.img2);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back link */}
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            All projects
          </a>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-5">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="text-[10px] px-2.5 py-1 font-semibold tracking-wider uppercase bg-accent/10 text-accent"
                >
                  {ind}
                </span>
              ))}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 font-medium tracking-wider uppercase bg-secondary text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-4">
              {project.project_name}
            </h1>

            <p className="text-[15px] leading-[1.8] text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Metadata row with dividers */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12 py-5 border-y border-border/60 text-[13px]">
            <div>
              <span className="text-muted-foreground">Company</span>
              <span className="ml-2 font-medium">{project.company}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60" />
            <div>
              <span className="text-muted-foreground">Industry</span>
              <span className="ml-2 font-medium">{project.industry}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60" />
            <div>
              <span className="text-muted-foreground">Role</span>
              <span className="ml-2 font-medium">{project.role}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60" />
            <div>
              <span className="text-muted-foreground">Duration</span>
              <span className="ml-2 font-medium">{project.duration}</span>
            </div>
          </div>

          {/* Cover image - only if valid URL exists */}
          {!hasImg1 && !hasImg2 && (
            <div className="card-header-gradient mb-16 py-16 px-8 flex items-center justify-center">
              <div className="text-center">
                <p className="font-serif text-2xl sm:text-3xl text-foreground/30 mb-2">
                  {project.project_name}
                </p>
                <p className="text-[13px] text-muted-foreground/50">
                  {project.industry} &middot; {project.role}
                </p>
              </div>
            </div>
          )}

          {/* 01 - Situation */}
          {!isPlaceholder(project.situation) && (
            <section className="mb-12">
              <SectionHeader number="01" label="Situation" />
              <p className="text-[15px] leading-[1.8] text-foreground/80 max-w-2xl">
                {project.situation}
              </p>
            </section>
          )}

          {!isPlaceholder(project.situation) && (
            <div className="h-px bg-border/40 mb-12" />
          )}

          {/* 02 - Task */}
          {!isPlaceholder(project.task) && (
            <section className="mb-12">
              <SectionHeader number="02" label="Task" />
              <p className="text-[15px] leading-[1.8] text-foreground/80 max-w-2xl">
                {project.task}
              </p>
            </section>
          )}

          {/* img1 */}
          {hasImg1 && (
            <div className="overflow-hidden mb-12">
              <img
                src={project.img1}
                alt={`${project.project_name} - 1`}
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>
          )}

          {!isPlaceholder(project.task) && (
            <div className="h-px bg-border/40 mb-12" />
          )}

          {/* 03 - Roles & Deliverables */}
          {actions.length > 0 && actions[0] !== '' && (
            <section className="mb-12">
              <SectionHeader number="03" label="Roles & Deliverables" />
              <div className="space-y-4">
                {actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-[12px] font-mono font-semibold text-accent mt-0.5 w-5 shrink-0 text-right">
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

          {actions.length > 0 && actions[0] !== '' && (
            <div className="h-px bg-border/40 mb-12" />
          )}

          {/* 04 - Impact */}
          {impacts.length > 0 && impacts[0] !== '' && (
            <section className="mb-12">
              <SectionHeader number="04" label="Impact" />
              <div className="space-y-3">
                {impacts.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-accent/[0.06] border border-accent/15">
                    <span className="flex items-center justify-center w-6 h-6 bg-accent text-accent-foreground text-[11px] font-mono font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-[15px] leading-[1.8] font-medium text-accent">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* img2 */}
          {hasImg2 && (
            <div className="overflow-hidden mb-12">
              <img
                src={project.img2}
                alt={`${project.project_name} - 2`}
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>
          )}

          {impacts.length > 0 && impacts[0] !== '' && (
            <div className="h-px bg-border/40 mb-12" />
          )}

          {/* 05 - Result */}
          {!isPlaceholder(project.result) && (
            <section className="mb-16">
              <SectionHeader number="05" label="Result" />
              <p className="text-base leading-[1.8] text-foreground/80 max-w-2xl">
                {project.result}
              </p>
            </section>
          )}

          {/* Navigation between projects */}
          <div className="pt-8 border-t border-border/40">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] text-accent font-medium hover:underline transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to all projects
            </a>
          </div>
        </div>
      </main>

      <CTASection profile={profile} projects={data.Dynamic} />
      <Footer profile={profile} />
    </div>
  );
}
