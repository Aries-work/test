import { ProfileStatic, Project } from '@/lib/types';
import { Building2, Calendar, Briefcase } from 'lucide-react';

interface AboutSectionProps {
  profile: ProfileStatic;
  projects: Project[];
}

export function AboutSection({ profile, projects }: AboutSectionProps) {
  const experiences = projects.map((p) => ({
    company: p.company,
    role: p.role,
    duration: p.duration,
    industry: p.industry,
    impact: p.impact,
  }));

  const uniqueExperiences = experiences.filter(
    (exp, i, arr) => arr.findIndex((e) => e.company === exp.company) === i
  );

  return (
    <section id="about" className="py-24 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Left: About text */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-3">
              About
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-6">
              About Me
            </h2>
            <p className="text-base leading-[1.8] text-muted-foreground mb-6">
              {profile.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {['FinTech', 'Gaming', 'MarTech', 'Healthcare', 'SaaS', 'ERP', 'Mobile'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-[11px] font-medium tracking-wider uppercase rounded-full border border-border/60 text-muted-foreground bg-secondary/50"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: Experience timeline */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-6">
              Experience
            </p>
            <div className="space-y-0">
              {uniqueExperiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 last:pb-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border/60" />

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent/50 bg-background" />

                  {/* Content */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-base leading-snug">
                      {exp.company}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-accent/50" />
                        {exp.role}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-accent/50" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-accent/50" />
                        {exp.industry}
                      </span>
                    </div>
                    {exp.impact && (
                      <p className="text-sm text-accent/80 font-medium">
                        {exp.impact}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
