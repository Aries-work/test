import Link from 'next/link';
import { ArrowRight, Briefcase, Calendar } from 'lucide-react';
import { Project } from '@/lib/types';
import { slugify, getProjectSubtitle, getProjectTags, getProjectIndustries } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const slug = slugify(project.project_name);
  const subtitle = getProjectSubtitle(project);
  const tags = getProjectTags(project);
  const industries = getProjectIndustries(project);

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative bg-card border border-border/50 rounded-xl hover-lift h-full flex flex-col sm:flex-row overflow-hidden accent-border-left">
        {/* Left: Visual block with industry watermark */}
        <div className="relative sm:w-44 md:w-52 shrink-0 card-header-gradient p-5 flex flex-col justify-between min-h-[120px] sm:min-h-0">
          {/* Industry watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
            <span className="font-serif text-5xl sm:text-6xl text-foreground whitespace-nowrap rotate-[-8deg]">
              {industries[0] || ''}
            </span>
          </div>

          {/* Industry + tag chips */}
          <div className="relative z-10 space-y-2">
            <div className="flex flex-wrap gap-1">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="text-[9px] px-2 py-0.5 bg-accent/15 text-accent font-bold tracking-wider uppercase rounded-full"
                >
                  {ind}
                </span>
              ))}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] px-2 py-0.5 bg-secondary text-muted-foreground font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Index number */}
          <p className="relative z-10 text-[10px] font-mono text-muted-foreground/50 mt-2 sm:mt-0">
            {String(index + 1).padStart(2, '0')}
          </p>
        </div>

        {/* Right: Content */}
        <div className="p-5 flex flex-col flex-1 min-w-0">
          <h3 className="font-serif text-lg leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
            {project.project_name}
          </h3>

          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3 h-3 text-accent/50" />
              {project.role}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-accent/50" />
              {project.date}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-accent font-semibold">
            Explore
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
