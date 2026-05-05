import { fetchPortfolioData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Briefcase, Calendar, Building2, Globe, Layers } from 'lucide-react';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { SectionImages } from '@/components/section-images';
import {
  parseQuotedList,
  parseLabeledText,
  isPlaceholder,
  getProjectSubtitle,
  slugify,
  getProjectTags,
  getProjectIndustries,
  getProjectPhases,
  getAdjacentProjects,
} from '@/lib/utils';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await fetchPortfolioData();
  const project = data?.Dynamic?.find((p: any) => slugify(p.project_name) === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.project_name} | Aries Liu`,
    description: isPlaceholder(project.short_description)
     ? `${project.role} at ${project.company} - ${project.industry}`
      : project.short_description |

| `${project.role} at ${project.company}`,
  };
}

export async function generateStaticParams() {
  const data = await fetchPortfolioData();
  // 防呆：確保 Dynamic 有資料，否則回傳空陣列避免.map 報錯
  if (!data?.Dynamic ||!Array.isArray(data.Dynamic)) return;
  
  return data.Dynamic.map((project: any) => ({
    slug: slugify(project.project_name),
  }));
}

function SectionHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[11px] font-mono font-bold text-accent tracking-wider bg-accent/10 px-2 py-0.5 rounded">
        {number}
      </span>
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </h3>
    </div>
  );
}

function LabeledText({ text }: { text: string }) {
  const segments = parseLabeledText(text);
  // 防呆：確保 segments 絕對是陣列
  const safeSegments = Array.isArray(segments)? segments :;
  return (
    <>
      {safeSegments.map((seg: any, i: number) =>
        seg.bold? (
          <strong key={i} className="font-semibold">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

// 【修復核心 1】輔助函數：將從 Google Sheets 來的圖片字串安全轉換為陣列
const parseImages = (imgData: any) => {
  if (!imgData) return;
  if (Array.isArray(imgData)) return imgData;
  if (typeof imgData === 'string') return imgData.split(',').map(s => s.trim()).filter(Boolean);
  return;
};

// 【修復核心 2】輔助函數：保證回傳的一定是陣列
const safeArray = (data: any) => (Array.isArray(data)? data :);

export default async function ProjectDetailPage({ params }: PageProps) {
  const data = await fetchPortfolioData();
  const project = data?.Dynamic?.find((p: any) => slugify(p.project_name) === params.slug);
  const profile = data?.Static?. |

| {};

  if (!project) {
    notFound();
  }

  // 安全解析所有陣列，避免 undefined 引發.map 錯誤
  const tags = safeArray(getProjectTags(project));
  const industries = safeArray(getProjectIndustries(project));
  const phases = safeArray(getProjectPhases(project));
  const actions = safeArray(parseQuotedList(project.actions));
  const impacts = safeArray(parseQuotedList(project.impact));
  const results = safeArray(parseQuotedList(project.result));
  const subtitle = getProjectSubtitle(project);
  
  const hasSituation =!isPlaceholder(project.situation);
  const hasTask =!isPlaceholder(project.task);
  const hasResult =!isPlaceholder(project.result);
  const hasActions = actions.length > 0 && actions!== '';
  const hasImpacts = impacts.length > 0 && impacts!== '';
  const hasAnyContent = hasSituation |

| hasTask |
| hasActions |
| hasImpacts |
| hasResult;
  
  const { prev, next } = getAdjacentProjects(data.Dynamic ||, params.slug);

  // 統一處理圖片欄位，從字串轉為陣列
  const imgProject = parseImages(project.img_project);
  const imgSituation = parseImages(project.img_situation);
  const imgTask = parseImages(project.img_task);
  const imgActions = parseImages(project.img_actions);
  const imgResult = parseImages(project.img_result);
  const imgImpact = parseImages(project.img_impact);

  const hasProjectCover = imgProject.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-20 pb-16">
        {/* Full-width header */}
        <div className="border-b border-border/30">
          <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All projects
            </a>

            <div className="flex flex-wrap gap-2 mb-6">
              {industries.map((ind: string) => (
                <span
                  key={ind}
                  className="text-[10px] px-3 py-1 font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full"
                >
                  {ind}
                </span>
              ))}
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] px-3 py-1 font-medium tracking-wider uppercase bg-secondary text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-5">
              {project.project_name}
            </h1>

            <p className="text-[16px] leading-[1.7] text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="border-b border-border/30 bg-surface/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px]">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium">{project.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Industry</span>
              <span className="font-medium">{project.industry}</span>
            </div>
            {phases.length > 0 && (
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent/60" />
                <span className="text-muted-foreground">Phase</span>
                <div className="flex flex-wrap gap-1.5">
                  {phases.map((phase: string) => (
                    <span
                      key={phase}
                      className="text-[11px] px-2.5 py-0.5 font-semibold tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 rounded-full"
                    >
                      {phase}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium">{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-accent/60" />
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{project.date}</span>
            </div>
          </div>
        </div>

        {/* Content area: main + sidebar */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          
          {hasProjectCover? (
            <div className="mb-12 rounded-xl overflow-hidden bg-surface/10 flex items-center justify-center border border-border/20">
              <img
                src={imgProject}
                alt={`${project.project_name} cover`}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>
          ) : (
            <div className="card-header-gradient rounded-xl mb-12 py-20 px-8 flex items-center justify-center relative overflow-hidden border border-border/20">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative text-center">
                <p className="font-serif text-3xl sm:text-4xl text-foreground/15 mb-2">
                  {project.project_name}
                </p>
                <p className="text-[13px] text-muted-foreground/40">
                  {project.industry} &middot; {project.role}
                </p>
              </div>
            </div>
          )}

          {hasAnyContent && (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
              {/* Left: Main narrative */}
              <div>
                {hasSituation && (
                  <section className="mb-10">
                    <SectionHeader number="01" label="Situation" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {project.situation}
                    </p>
                    <SectionImages 
                      images={imgSituation} 
                      altPrefix={`${project.project_name} Situation`} 
                    />
                  </section>
                )}

                {hasTask && (
                  <section className="mb-10">
                    <SectionHeader number="02" label="Task" />
                    <p className="text-[15px] leading-[1.8] text-foreground/80">
                      {project.task}
                    </p>
                    <SectionImages 
                      images={imgTask} 
                      altPrefix={`${project.project_name} Task`} 
                    />
                  </section>
                )}

                {hasActions && (
                  <section className="mb-10">
                    <SectionHeader number="03" label="Roles & Deliverables" />
                    <div className="space-y-4">
                      {actions.map((action: string, i: number) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="text-[12px] font-mono font-bold text-accent mt-0.5 w-6 shrink-0 text-right">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[15px] leading-[1.8] text-foreground/80">
                            <LabeledText text={action} />
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Render dynamic Actions images */}
                    <SectionImages 
                      images={imgActions} 
                      altPrefix={`${project.project_name} Actions`} 
                    />
                  </section>
                )}

                {hasResult && (
                  <section className="mb-10">
                    <SectionHeader number="04" label="Result" />
                    <div className="space-y-4">
                      {results.map((para: string, i: number) => (
                        <p key={i} className="text-[15px] leading-[1.8] text-foreground/80">
                          <LabeledText text={para} />
                        </p>
                      ))}
                    </div>
                    <SectionImages 
                      images={imgResult} 
                      altPrefix={`${project.project_name} Result`} 
                    />
                  </section>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">
                {hasImpacts && (
                  <div className="glass rounded-xl p-5">
                    <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-accent mb-4">
                      Impact
                    </p>
                    <div className="space-y-3">
                      {impacts.map((item: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-accent/[0.06] border border-accent/15 rounded-lg"
                        >
                          <span className="flex items-center justify-center w-6 h-6 bg-accent text-accent-foreground text-[11px] font-mono font-bold shrink-0 rounded">
                            {i + 1}
                          </span>
                          <p className="text-[14px] leading-[1.7] text-accent">
                            <LabeledText text={item} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="glass rounded-xl p-5">
                  <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
                    Details
                  </p>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company</span>
                      <span className="font-medium text-right max-w-[60%]">{project.company}</span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium">{project.industry}</span>
                    </div>
                    {phases.length > 0 && (
                      <>
                        <div className="h-px bg-border/40" />
                        <div>
                          <span className="text-muted-foreground">Phase</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {phases.map((phase: string) => (
                              <span
                                key={phase}
                                className="text-[11px] px-2.5 py-0.5 font-semibold tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 rounded-full"
                              >
                                {phase}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium">{project.role}</span>
                    </div>
                    <div className="h-px bg-border/40" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{project.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Previous / Next navigation */}
        <div className="border-t border-border/30">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            {prev? (
              <a
                href={`/projects/${slugify(prev.project_name)}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span className="max-w-[200px] truncate">{prev.project_name}</span>
              </a>
            ) : (
              <span />
            )}

            <a
              href="/#projects"
              className="text-[12px] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              All projects
            </a>

            {next? (
              <a
                href={`/projects/${slugify(next.project_name)}`}
                className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <span className="max-w-[200px] truncate">{next.project_name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>

      <CTASection profile={profile} projects={data?.Dynamic ||} />
      <Footer profile={profile} />
    </div>
  );
}
