import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Building2, Tag, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardCompactProps {
  project: Project;
  slug: string;
}

const projectImages = [
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
];

export function ProjectCardCompact({ project, slug }: ProjectCardCompactProps) {
  const tags = project.Tags.split(',').map((t) => t.trim());
  const imageIndex = Math.abs(hashCode(project.project_name)) % projectImages.length;

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative rounded-xl overflow-hidden border border-border/40 bg-card/50 hover:border-accent/25 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 h-full flex flex-col">
        {/* Cover image - fixed height */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <img
            src={projectImages[imageIndex]}
            alt={project.project_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* Tags overlay */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-2 py-0.5 border-white/20 text-white bg-black/30 backdrop-blur-sm font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content - flex-grow to fill remaining space */}
        <div className="p-5 -mt-6 relative flex flex-col flex-1">
          <h3 className="font-serif text-lg leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {project.project_name}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.short_description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-accent/60" />
              {project.company}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-accent/60" />
              {project.industry}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-accent/60" />
              {project.role}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent/60" />
              {project.duration}
            </span>
          </div>

          {/* Hover indicator */}
          <div className="mt-4 flex items-center gap-1.5 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View project
            <ArrowRight className="w-3 h-3" />
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
