import { ArrowRight, Mail } from 'lucide-react';
import { ProfileStatic } from '@/lib/types';

interface CTASectionProps {
  profile: ProfileStatic;
}

export function CTASection({ profile }: CTASectionProps) {
  return (
    <section id="contact" className="py-24 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/[0.08] blur-[80px]" />

          <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/70 mb-4">
              Let&apos;s Connect
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight mb-6">
              Let&apos;s Talk!
            </h2>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
              Open to product leadership roles, consulting opportunities, and collaborations across FinTech, Gaming, and beyond.
            </p>

            <a
              href={`mailto:${profile.contact_email}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 group"
            >
              <Mail className="w-4 h-4" />
              {profile.contact_email}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
