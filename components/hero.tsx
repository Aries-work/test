import { ArrowDown, Mail, Linkedin } from 'lucide-react';
import { ProfileStatic } from '@/lib/types';
import { parseBracketText } from '@/lib/utils';

interface HeroProps {
  profile: ProfileStatic;
}

export function Hero({ profile }: HeroProps) {
  const titles = profile.titles.split(',').map((t) => t.trim());

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[100px] animate-subtle-pulse" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            {/* Title badges */}
            <div className="animate-fade-in-up">
              <div className="flex flex-wrap gap-2">
                {titles.map((title) => (
                  <span
                    key={title}
                    className="inline-block px-3 py-1.5 text-[11px] font-medium tracking-widest uppercase rounded-full border border-accent/25 text-accent bg-accent/[0.06]"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>

            {/* Name */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.02] tracking-tight animate-fade-in-up stagger-1">
              {profile.name}
            </h1>

            {/* Accent line */}
            <div className="animate-accent-line h-[3px] rounded-full bg-gradient-to-r from-accent to-accent/20" />

            {/* Headline */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-foreground/80 max-w-xl animate-fade-in-up stagger-2">
              {parseBracketText(profile.headline).map((seg, i) =>
                seg.highlighted ? (
                  <span key={i} className="text-accent font-bold">{seg.text}</span>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </p>

            {/* Summary */}
            <p className="text-base leading-[1.8] text-muted-foreground max-w-lg animate-fade-in-up stagger-3">
              {profile.summary}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2 animate-fade-in-up stagger-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                View My Work
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.contact_email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:border-accent/40 hover:bg-accent/[0.04] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right: Portrait image */}
          <div className="hidden lg:block animate-fade-in stagger-3">
            <div className="relative">
              <div className="w-[320px] h-[400px] rounded-2xl overflow-hidden border border-border/40 shadow-2xl shadow-accent/5">
                <img
                  src="https://images.pexels.com/photos/7749093/pexels-photo-7749093.jpeg?auto=compress&cs=tinysrgb&w=640&h=800&fit=crop"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent corner */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-accent/20 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border border-accent/10 rounded-xl -z-10" />
            </div>
          </div>
        </div>

        {/* Contact links row */}
        <div className="flex items-center gap-5 pt-12 animate-fade-in-up stagger-5">
          <a
            href={`https://${profile.linkedin_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-accent/40 group-hover:bg-accent/[0.04] transition-all duration-300">
              <Linkedin className="w-4 h-4" />
            </span>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href={`mailto:${profile.contact_email}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-accent/40 group-hover:bg-accent/[0.04] transition-all duration-300">
              <Mail className="w-4 h-4" />
            </span>
            <span className="hidden sm:inline">{profile.contact_email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
