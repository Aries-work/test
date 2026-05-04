import { ArrowRight, Linkedin } from 'lucide-react';
import { ProfileStatic, Project } from '@/lib/types';
import { extractIndustries } from '@/lib/utils';

interface CTASectionProps {
  profile: ProfileStatic;
  projects?: Project[];
}

export function CTASection({ profile, projects }: CTASectionProps) {
  const industries = projects ? extractIndustries(projects) : [];
  const industryText = industries.length > 0
    ? `across ${industries.slice(0, 3).join(', ')}${industries.length > 3 ? ', and beyond' : ''}`
    : 'across FinTech, Gaming, and beyond';

  return (
    <section id="contact" className="relative py-28 border-t border-border/30 overflow-hidden">
      {/* Accent glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-accent mb-5">
          Let&apos;s Connect
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-5">
          Let&apos;s Build Something
        </h2>
        <p className="text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
          Open to product leadership roles, consulting opportunities, and collaborations {industryText}.
        </p>

        {/* Email as monospace link */}
        <a
          href={`mailto:${profile.contact_email}`}
          className="inline-flex items-center gap-3 text-lg sm:text-xl font-mono font-medium text-accent hover:underline underline-offset-4 transition-all duration-200 group mb-6"
        >
          {profile.contact_email}
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>

        <div className="flex justify-center">
          <a
            href={`https://${profile.linkedin_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
