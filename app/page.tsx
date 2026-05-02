import { fetchPortfolioData } from '@/lib/data';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { ProjectSection } from '@/components/project-section';
import { AboutSection } from '@/components/about-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default async function Home() {
  const data = await fetchPortfolioData();
  const profile = data.Static[0];
  const projects = data.Dynamic;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero profile={profile} />
        <ProjectSection projects={projects} />
        <AboutSection profile={profile} projects={projects} />
        <CTASection profile={profile} projects={projects} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
