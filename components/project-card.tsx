import Link from 'next/link';
import { ArrowRight, Briefcase, Calendar } from 'lucide-react';
import { Project } from '@/lib/types';
import { slugify, getProjectSubtitle, getProjectTags, getProjectIndustries } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const slug = slugify(project.project_name);
  const subtitle = getProjectSubtitle(project);
  const tags = getProjectTags(project);
  const industries = getProjectIndustries(project);

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative bg-card border border-border/60 hover-lift h-full flex flex-col overflow-hidden">
        {/* Styled header area with industry + tags */}
        <div className="card-header-gradient px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-1.5">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent font-semibold tracking-wider uppercase"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-serif text-lg leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
            {project.project_name}
          </h3>

          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3 h-3 text-accent/60" />
              {project.role}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-accent/60" />
              {project.duration}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-accent font-medium">
            View details
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
