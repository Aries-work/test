import { ProfileStatic } from '@/lib/types';

interface FooterProps {
  profile: ProfileStatic;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <span className="font-medium text-foreground">{profile.name}</span>
          <span className="font-mono">{profile.contact_email}</span>
          <span>&copy; {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
