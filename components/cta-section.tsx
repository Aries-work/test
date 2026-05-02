import { ArrowRight, Mail } from 'lucide-react';
import { ProfileStatic } from '@/lib/types';

interface CTASectionProps {
  profile: ProfileStatic;
}

export function CTASection({ profile }: CTASectionProps) {
  return (
    <section id="contact" className="py-24 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[13px] font-medium tracking-[0.15em] uppercase text-accent mb-4">
          Let&apos;s Connect
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-4">
          Get in Touch
        </h2>
        <p className="text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
          Open to product leadership roles, consulting opportunities, and collaborations across FinTech, Gaming, and beyond.
        </p>

        <a
          href={`mailto:${profile.contact_email}`}
          className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors duration-200 group"
        >
          <Mail className="w-4 h-4" />
          {profile.contact_email}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
