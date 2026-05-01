import { fetchPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Building2, Calendar, Briefcase, Tag, Crosshair, ListChecks, Zap, TrendingUp, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { parseQuotedList } from '@/lib/utils';
import type { Metadata } from 'next';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await fetchPortfolioData();
  const project = data.Dynamic.find((p) => slugify(p.project_name) === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.project_name} | Aries Liu`,
    description: project.short_description,
  };
}

export async function generateStaticParams() {
  const data = await fetchPortfolioData();
  return data.Dynamic.map((project) => ({
    slug: slugify(project.project_name),
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const data = await fetchPortfolioData();
  const project = data.Dynamic.find((p) => slugify(p.project_name) === params.slug);
  const profile = data.Static[0];

  if (!project) {
    notFound();
  }

  const tags = project.Tags.split(',').map((t) => t.trim());
  const actions = parseQuotedList(project.actions);
  const impacts = parseQuotedList(project.impact);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300 mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all projects
          </a>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-[11px] font-medium tracking-widest uppercase rounded-full border border-accent/25 text-accent bg-accent/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-4">
              {project.project_name}
            </h1>
          </div>

          {/* Description */}
          <p className="text-base leading-[1.8] text-foreground/80 mb-10 max-w-2xl">
            {project.short_description}
          </p>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 p-6 rounded-xl border border-border/40 bg-card/50">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
                Company
              </p>
              <p className="text-sm font-medium">{project.company}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
                Industry
              </p>
              <p className="text-sm font-medium">{project.industry}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
                Role
              </p>
              <p className="text-sm font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
                Duration
              </p>
              <p className="text-sm font-medium">{project.duration}</p>
            </div>
          </div>

          {/* Cover image */}
          <div className="rounded-xl overflow-hidden mb-16 border border-border/30">
            <img
              src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
              alt={project.project_name}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>

          {/* Situation */}
          <section className="mb-16">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
              <Crosshair className="w-4 h-4" />
              Situation
            </div>
            <p className="text-base leading-[1.8] text-foreground/80 max-w-2xl">
              {project.situation}
            </p>
          </section>

          {/* Task */}
          <section className="mb-16">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
              <ListChecks className="w-4 h-4" />
              Task
            </div>
            <p className="text-base leading-[1.8] text-foreground/80 max-w-2xl">
              {project.task}
            </p>
          </section>

          {/* img1 */}
          {project.img1 && (
            <div className="rounded-xl overflow-hidden mb-16 border border-border/30">
              <img
                src={project.img1}
                alt={`${project.project_name} - 1`}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          )}

          {/* Roles & Deliverables / Actions */}
          <section className="mb-16">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-6">
              <Zap className="w-4 h-4" />
              Roles & Deliverables
            </div>
            <div className="space-y-6">
              {actions.map((action, i) => (
                <div key={i} className="pl-6 border-l-2 border-accent/20">
                  <p className="text-base leading-[1.8] text-foreground/80">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section className="mb-16">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-6">
              <TrendingUp className="w-4 h-4" />
              Impact
            </div>
            <div className="space-y-4">
              {impacts.map((item, i) => (
                <div key={i} className="pl-6 border-l-2 border-accent/30">
                  <p className="text-base leading-[1.8] text-foreground/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* img2 */}
          {project.img2 && (
            <div className="rounded-xl overflow-hidden mb-16 border border-border/30">
              <img
                src={project.img2}
                alt={`${project.project_name} - 2`}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          )}

          {/* Result */}
          <section className="mb-16">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
              <Award className="w-4 h-4" />
              Result
            </div>
            <p className="text-base leading-[1.8] text-foreground/80 max-w-2xl">
              {project.result}
            </p>
          </section>
        </div>
      </main>

      <CTASection profile={profile} />
      <Footer profile={profile} />
    </div>
  );
}
