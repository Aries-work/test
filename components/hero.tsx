import { ArrowDown, ArrowRight } from 'lucide-react';
import { ProfileStatic } from '@/lib/types';
import { parseBracketText } from '@/lib/utils';

interface HeroProps {
  profile: ProfileStatic;
}

export function Hero({ profile }: HeroProps) {
  const titles = profile.titles.split(',').map((t) => t.trim());

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Role badges */}
          <div className="animate-fade-in-up mb-8 flex flex-wrap gap-2">
            {titles.map((title) => (
              <span
                key={title}
                className="inline-block px-3 py-1.5 text-[11px] font-semibold tracking-widest uppercase border border-accent/25 text-accent bg-accent/[0.06]"
              >
                {title}
              </span>
            ))}
          </div>

          {/* Name */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight mb-6 animate-fade-in-up stagger-1">
            {profile.name}
          </h1>

          {/* Headline with bracket highlighting */}
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-foreground/80 mb-6 max-w-xl animate-fade-in-up stagger-2">
            {parseBracketText(profile.headline).map((seg, i) =>
              seg.highlighted ? (
                <span key={i} className="text-accent font-semibold">{seg.text}</span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>

          {/* Summary */}
          <p className="text-[15px] leading-[1.8] text-muted-foreground mb-10 max-w-lg animate-fade-in-up stagger-3">
            {profile.summary}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up stagger-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              View Projects
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${profile.contact_email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200"
            >
              Contact Me
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Contact links */}
          <div className="flex items-center gap-6 pt-12 animate-fade-in-up stagger-5">
            <a
              href={`https://${profile.linkedin_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.contact_email}`}
              className="text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {profile.contact_email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
