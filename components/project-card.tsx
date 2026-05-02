import Link from 'next/link';
import { Building2, Calendar, Briefcase, Tag, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  slug: string;
}

const projectImages = [
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
];

export function ProjectCard({ project, slug }: ProjectCardProps) {
  const tags = project.Tags.split(',').map((t) => t.trim());
  const imageIndex = Math.abs(hashCode(project.project_name)) % projectImages.length;

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative bg-card border border-border/60 hover-lift h-full flex flex-col overflow-hidden">
        {/* Top accent line */}
        <div className="h-[2px] bg-accent w-0 group-hover:w-full transition-all duration-500" />

        {/* Cover image */}
        <div className="relative h-40 overflow-hidden shrink-0">
          <img
            src={projectImages[imageIndex]}
            alt={project.project_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 bg-background/80 backdrop-blur-sm font-medium text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-serif text-lg leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
            {project.project_name}
          </h3>

          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.short_description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-accent/60" />
              {project.company}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-accent/60" />
              {project.industry}
            </span>
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
            View project
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}
