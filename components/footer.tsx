import { Mail, Linkedin } from 'lucide-react';
import { ProfileStatic } from '@/lib/types';

interface FooterProps {
  profile: ProfileStatic;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.contact_email}`}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-accent/40 hover:bg-accent/[0.04] transition-all duration-300 text-muted-foreground hover:text-accent"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`https://${profile.linkedin_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-accent/40 hover:bg-accent/[0.04] transition-all duration-300 text-muted-foreground hover:text-accent"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
