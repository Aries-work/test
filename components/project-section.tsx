import { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';

interface ProjectSectionProps {
  projects: Project[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ProjectSection({ projects }: ProjectSectionProps) {
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

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const slug = slugify(project.project_name);
            return (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProjectCard project={project} slug={slug} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
