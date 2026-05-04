import { ArrowDown, ArrowRight } from 'lucide-react';
import { ProfileStatic, Project } from '@/lib/types';
import { parseBracketText, parseProfileStats, extractDomains } from '@/lib/utils';

interface HeroProps {
  profile: ProfileStatic;
  projects: Project[];
}

export function Hero({ profile, projects }: HeroProps) {
  const titles = profile.titles.split(',').map((t) => t.trim());
  const stats = parseProfileStats(profile.summary, projects);
  const domains = extractDomains(profile.summary, projects);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          {/* Left: Identity */}
          <div>
            {/* Role badges */}
            <div className="animate-fade-up mb-8 flex flex-wrap gap-2">
              {titles.map((title) => (
                <span
                  key={title}
                  className="inline-block px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase border border-accent/30 text-accent bg-accent/[0.06] rounded-full"
                >
                  {title}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-normal leading-[0.9] tracking-tight mb-6 animate-fade-up stagger-1">
              {profile.name}
            </h1>

            {/* Headline with bracket highlighting */}
            <p className="text-xl sm:text-2xl md:text-[28px] font-light leading-[1.3] text-foreground/80 mb-6 max-w-lg animate-fade-up stagger-2">
              {parseBracketText(profile.headline).map((seg, i) =>
                seg.highlighted ? (
                  <span key={i} className="gradient-text font-semibold">{seg.text}</span>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </p>

            {/* Summary */}
            <p className="text-[15px] leading-[1.8] text-muted-foreground mb-10 max-w-md animate-fade-up stagger-3">
              {profile.summary}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-up stagger-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.contact_email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200"
              >
                Contact Me
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Dashboard Panel */}
          <div className="animate-slide-in-right stagger-3">
            <div className="glass rounded-xl p-6 space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/[0.06] border border-accent/15 rounded-lg p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-serif gradient-text animate-count-up stagger-4">
                    {stats.yearsProduct}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                    Years Product
                  </p>
                </div>
                <div className="bg-accent/[0.06] border border-accent/15 rounded-lg p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-serif gradient-text animate-count-up stagger-5">
                    {stats.yearsLeadership}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                    Years Leadership
                  </p>
                </div>
                <div className="bg-accent/[0.06] border border-accent/15 rounded-lg p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-serif gradient-text animate-count-up stagger-6">
                    {stats.domainCount}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                    Domains
                  </p>
                </div>
                <div className="bg-accent/[0.06] border border-accent/15 rounded-lg p-4 text-center">
                  <p className="text-3xl sm:text-4xl font-serif gradient-text animate-count-up stagger-7">
                    {stats.industryCount}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                    Industries
                  </p>
                </div>
              </div>

              {/* Domains ticker */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                  Domains
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {domains.map((domain) => (
                    <span
                      key={domain}
                      className="px-2.5 py-1 text-[11px] font-medium border border-accent/25 text-accent bg-accent/[0.04] rounded-full"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact links */}
              <div className="flex items-center gap-4 pt-2 border-t border-border/40">
                <a
                  href={`mailto:${profile.contact_email}`}
                  className="text-[12px] text-muted-foreground hover:text-accent transition-colors duration-200 font-mono"
                >
                  {profile.contact_email}
                </a>
                <a
                  href={`https://${profile.linkedin_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
