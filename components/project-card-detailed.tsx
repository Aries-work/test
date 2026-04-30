import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Building2, Tag, Target, Zap, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardDetailedProps {
  project: Project;
  slug: string;
}

const projectImages = [
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
  'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
];

export function ProjectCardDetailed({ project, slug }: ProjectCardDetailedProps) {
  const tags = project.Tags.split(',').map((t) => t.trim());
  const actions = project.actions.split(',').map((a) => a.trim()).filter(Boolean);
  const imageIndex = Math.abs(hashCode(project.project_name)) % projectImages.length;

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative rounded-xl overflow-hidden border border-border/40 bg-card/50 hover:border-accent/25 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5">
        {/* Cover image - fixed height */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <img
            src={projectImages[imageIndex]}
            alt={project.project_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Tags overlay */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-2 py-0.5 border-white/20 text-white dark:text-white dark:bg-black/30 bg-white/70 text-foreground backdrop-blur-sm font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 -mt-6 relative space-y-5">
          {/* Header */}
          <div>
            <h3 className="font-serif text-xl leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
              {project.project_name}
            </h3>

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
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.short_description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />

          {/* Detail sections */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-accent/70">
                <Target className="w-3.5 h-3.5" />
                Objective
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">
                {project.objective}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-accent/70">
                <Zap className="w-3.5 h-3.5" />
                Actions
              </div>
              <ul className="space-y-1.5">
                {actions.slice(0, 3).map((action, i) => (
                  <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/50 mt-2 shrink-0" />
                    <span className="line-clamp-1">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-accent/70">
                <TrendingUp className="w-3.5 h-3.5" />
                Impact
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/15">
                <span className="text-sm font-semibold text-accent">
                  {project.impact}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-accent/70">
                <Award className="w-3.5 h-3.5" />
                Result
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">
                {project.result}
              </p>
            </div>
          </div>

          {/* View project link */}
          <div className="flex items-center gap-1.5 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
            View full details
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
