'use client';

import { ProfileStatic, Project } from '@/lib/types';
import { parseQuotedList, extractDomains, isPlaceholder, parseProfileStats } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface AboutSectionProps {
  profile: ProfileStatic;
  projects: Project[];
}

export function AboutSection({ profile, projects }: AboutSectionProps) {
  const { ref, revealed } = useScrollReveal(0.1);
  const stats = parseProfileStats(profile.summary, projects);
  const domains = extractDomains(profile.summary, projects);

  const experiences = projects.map((p) => ({
    company: p.company,
    role: p.role,
    date: p.date,
    industry: p.industry,
    impact: p.impact,
  }));

  const uniqueExperiences = experiences.filter(
    (exp, i, arr) => arr.findIndex((e) => e.company === exp.company) === i
  );

  return (
    <section id="about" className="py-24 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`scroll-reveal ${revealed ? 'revealed' : ''}`}
        >
          <div className="mb-14">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              About
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              About Me
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            <div className="bg-accent/[0.06] border border-accent/15 rounded-xl p-5 text-center">
              <p className="text-3xl sm:text-4xl font-serif gradient-text">{stats.yearsProduct}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5 font-medium">
                Years Product
              </p>
            </div>
            <div className="bg-accent/[0.06] border border-accent/15 rounded-xl p-5 text-center">
              <p className="text-3xl sm:text-4xl font-serif gradient-text">{stats.yearsLeadership}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5 font-medium">
                Years Leadership
              </p>
            </div>
            <div className="bg-accent/[0.06] border border-accent/15 rounded-xl p-5 text-center">
              <p className="text-3xl sm:text-4xl font-serif gradient-text">{stats.domainCount}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5 font-medium">
                Domains
              </p>
            </div>
            <div className="bg-accent/[0.06] border border-accent/15 rounded-xl p-5 text-center">
              <p className="text-3xl sm:text-4xl font-serif gradient-text">{stats.industryCount}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5 font-medium">
                Industries
              </p>
            </div>
          </div>

          {/* Domains pills */}
          <div className="mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Domains
            </p>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="px-3 py-1.5 text-[12px] font-medium border border-accent/25 text-accent bg-accent/[0.04] rounded-full"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {/* Two-column: Summary + Timeline */}
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12">
            {/* Left: Summary */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Summary
              </p>
              <p className="text-[15px] leading-[1.8] text-muted-foreground">
                {profile.summary}
              </p>
            </div>

            {/* Right: Experience timeline */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Experience
              </p>
              <div className="space-y-0">
                {uniqueExperiences.map((exp, index) => {
                  const impactItems = parseQuotedList(exp.impact);
                  const hasImpact = impactItems.length > 0 && impactItems[0] !== '' && !isPlaceholder(impactItems[0]);

                  return (
                    <div
                      key={index}
                      className="relative pl-6 pb-6 last:pb-0"
                    >
                      {/* Timeline line */}
                      <div className="absolute left-0 top-3 bottom-0 w-px bg-gradient-to-b from-accent/40 to-border/20" />

                      {/* Timeline dot */}
                      <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full bg-accent shadow-sm shadow-accent/30" />

                      {/* Content */}
                      <div className="glass rounded-lg p-4">
                        <h4 className="font-serif text-[15px] leading-snug font-medium mb-1">
                          {exp.company}
                        </h4>
                        <p className="text-[12px] text-muted-foreground mb-2">
                          {exp.role}
                          <span className="mx-1.5 text-border">|</span>
                          {exp.date}
                          <span className="mx-1.5 text-border">|</span>
                          {exp.industry}
                        </p>
                        {hasImpact && (
                          <div className="space-y-1">
                            {impactItems.map((item, i) => (
                              <p key={i} className="text-[12px] text-accent font-medium">
                                {item}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
