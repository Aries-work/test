import { ProfileStatic, Project } from '@/lib/types';
import { parseQuotedList, extractDomains } from '@/lib/utils';

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

  const domains = extractDomains(profile.summary, projects);

  return (
    <section id="about" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Left: About text */}
          <div>
            <p className="text-[13px] font-medium tracking-[0.15em] uppercase text-accent mb-3">
              About
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6">
              About Me
            </h2>
            <p className="text-[15px] leading-[1.8] text-muted-foreground mb-8">
              {profile.summary}
            </p>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
                Domains
              </p>
              <p className="text-[14px] text-foreground/80">
                {domains.map((domain, i) => (
                  <span key={domain}>
                    <span className="text-accent font-medium">{domain}</span>
                    {i < domains.length - 1 && (
                      <span className="text-muted-foreground mx-1.5">&middot;</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Right: Experience timeline */}
          <div className="bg-card/50 border border-border/40 p-6">
            <p className="text-[13px] font-medium tracking-[0.15em] uppercase text-accent mb-6">
              Experience
            </p>
            <div className="space-y-0">
              {uniqueExperiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 pb-6 last:pb-0"
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 top-2 bottom-0 w-px bg-border/60" />

                  {/* Timeline dot */}
                  <div className="absolute left-[-3px] top-1.5 w-[7px] h-[7px] rounded-full bg-accent" />

                  {/* Content */}
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-[15px] leading-snug font-medium">
                      {exp.company}
                    </h4>
                    <p className="text-[12px] text-muted-foreground">
                      {exp.role}
                      <span className="mx-1.5 text-border">|</span>
                      {exp.duration}
                      <span className="mx-1.5 text-border">|</span>
                      {exp.industry}
                    </p>
                    {exp.impact && (
                      <div className="mt-2 space-y-1">
                        {parseQuotedList(exp.impact).map((item, i) => (
                          <p key={i} className="text-[13px] text-accent font-medium">
                            {item}
                          </p>
                        ))}
                      </div>
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
