import { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';
import { groupProjectsByCompany } from '@/lib/utils';

interface ProjectSectionProps {
  projects: Project[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const companyGroups = groupProjectsByCompany(projects);
  const entries = Array.from(companyGroups.entries());

  return (
    <section id="projects" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[13px] font-medium tracking-[0.15em] uppercase text-accent mb-3">
            Featured Work
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight">
            Projects
          </h2>
        </div>

        <div className="space-y-12">
          {entries.map(([company, companyProjects]) => (
            <div key={company}>
              {/* Company header when multiple projects share the same company */}
              {companyProjects.length > 1 && (
                <div className="mb-4 pb-3 border-b border-border/40">
                  <p className="text-[13px] font-medium text-muted-foreground">
                    {company}
                  </p>
                </div>
              )}

              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {companyProjects.map((project, index) => (
                  <div
                    key={`${company}-${index}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
