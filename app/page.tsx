import { fetchPortfolioData } from '@/lib/data';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { ProjectSection } from '@/components/project-section';
import { AboutSection } from '@/components/about-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Profile, Project } from '@/lib/types';

// 強制啟用 ISR 快取，每小時更新一次資料
export const revalidate = 3600;

export default async function Home() {
  const data = await fetchPortfolioData();

  // 【修復點 1】：使用.at(0) 完美避開數字中括號被吃掉的問題
  const profile: Profile = (data && data.Static && data.Static.length > 0)
   ? data.Static.at(0)
    : {
        name: "Aries Liu",
        headline: "I Build the [Right] Thing, then [Scale It].",
        titles: "Product Owner, Project Lead, AI Builder",
        summary: "Product Leader (8 yrs Product, 4+ yrs Leadership) across FinTech (Payments/Crypto), Gaming, MarTech, and Healthcare. Combining design excellence with data-driven strategies to integrate complex SaaS, ERP, and Mobile.",
        contact_email: "ariesccliu@gmail.com",
        linkedin_url: "linkedin.com/in/ariesliu"
      };

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
