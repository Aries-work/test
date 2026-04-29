'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Project } from '@/lib/types';
import { ProjectCardCompact } from '@/components/project-card-compact';
import { ProjectCardDetailed } from '@/components/project-card-detailed';
import { LayoutGrid, AlignJustify } from 'lucide-react';

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
  const [detailed, setDetailed] = useState(false);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-3">
            Featured Work
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-4">
            Explore My Projects
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Showcasing commitment to crafting high-performance digital experiences and product solutions across industries.
          </p>
        </div>

        {/* Toggle control */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>

          <div className="flex items-center gap-3">
            <LayoutGrid className={`w-4 h-4 transition-colors duration-300 ${!detailed ? 'text-accent' : 'text-muted-foreground'}`} />
            <div className="flex items-center gap-2">
              <Switch
                id="view-toggle"
                checked={detailed}
                onCheckedChange={setDetailed}
                className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted-foreground/30"
              />
              <Label htmlFor="view-toggle" className="sr-only">
                Toggle detailed view
              </Label>
            </div>
            <AlignJustify className={`w-4 h-4 transition-colors duration-300 ${detailed ? 'text-accent' : 'text-muted-foreground'}`} />
          </div>
        </div>

        {/* Project cards grid */}
        <div className={`grid gap-6 ${detailed ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {projects.map((project, index) => {
            const slug = slugify(project.project_name);
            return (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {detailed ? (
                  <ProjectCardDetailed project={project} slug={slug} />
                ) : (
                  <ProjectCardCompact project={project} slug={slug} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
