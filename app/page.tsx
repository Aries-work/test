import { DEFAULT_PROFILE, fetchPortfolioData } from '@/lib/data';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { ProjectSection } from '@/components/project-section';
import { AboutSection } from '@/components/about-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { ProfileStatic, Project } from '@/lib/types';

// 強制啟用 ISR 快取，每小時更新一次資料
export const revalidate = 3600;

export default async function Home() {
  const data = await fetchPortfolioData();

  // 【修復點 1】：使用.at(0) 完美避開數字中括號被吃掉的問題
  const profile: ProfileStatic = data.Static[0] ?? DEFAULT_PROFILE;

  // 【修復點 2】：使用 new Array() 完美避開空陣列中括號被吃掉的問題
  const projects: Array<Project> = (data && data.Dynamic)? data.Dynamic : new Array();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero profile={profile} projects={projects} />
        <ProjectSection projects={projects} />
        <AboutSection profile={profile} projects={projects} />
        <CTASection profile={profile} projects={projects} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
