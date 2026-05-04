'use client';

import { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';
import { groupProjectsByCompany } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface ProjectSectionProps {
  projects: Project[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const { ref, revealed } = useScrollReveal(0.1);
  const companyGroups = groupProjectsByCompany(projects);
  const entries = Array.from(companyGroups.entries());
  let globalIndex = 0;

  return (
    <section id="projects" className="py-24 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`scroll-reveal ${revealed ? 'revealed' : ''}`}
        >
          <div className="mb-14">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Featured Work
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Projects
            </h2>
          </div>

          <div className="space-y-16">
            {entries.map(([company, companyProjects]) => {
              const startIndex = globalIndex;
              globalIndex += companyProjects.length;

              return (
                <div key={company}>
                  {/* Company divider */}
                  {companyProjects.length > 1 && (
                    <div className="mb-6 flex items-center gap-4">
                      <p className="font-serif text-xl sm:text-2xl text-muted-foreground/40 whitespace-nowrap">
                        {company}
                      </p>
                      <div className="h-px flex-1 bg-border/40" />
                    </div>
                  )}

                  {/* Staggered 2-column grid */}
                  <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                    {companyProjects.map((project, i) => (
                      <div
                        key={`${company}-${i}`}
                        className={i % 2 === 1 ? 'lg:mt-6' : ''}
                      >
                        <ProjectCard project={project} index={startIndex + i} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
