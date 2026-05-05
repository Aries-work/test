import { fetchPortfolioData } from '@/lib/data';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { ProjectSection } from '@/components/project-section';
import { AboutSection } from '@/components/about-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
// 建議從你的 types 檔案引入型別，若無則可省略
import { Profile, Project } from '@/lib/types'; 

// 【優化 1】強制啟用 ISR (Incremental Static Regeneration)
// 讓 Cloudflare Pages 每 3600 秒 (1 小時) 在背景重新驗證一次資料
export const revalidate = 3600;

export default async function Home() {
  // 獲取資料
  const data = await fetchPortfolioData();

  // 【優化 2】資料防呆機制 (Fallback)
  // 避免因為 API 延遲或資料庫為空，導致 data.Static 發生 undefined 錯誤讓網頁崩潰
  const profile: Profile = data?.Static?. |

| {
    name: "Aries Liu",
    headline: "Product Leader",
    summary: "I Build the Right Thing, then Scale It.",
  };

  const projects: Project = data?.Dynamic ||;

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
