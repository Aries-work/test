import { ProfileStatic } from '@/lib/types';

interface FooterProps {
  profile: ProfileStatic;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-medium text-foreground">
            {profile.name}
          </p>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${profile.contact_email}`}
              className="text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              Email
            </a>
            <a
              href={`https://${profile.linkedin_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-[12px] text-muted-foreground">
            &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
