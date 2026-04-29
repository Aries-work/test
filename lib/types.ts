export interface ProfileStatic {
  name: string;
  headline: string;
  titles: string;
  summary: string;
  contact_email: string;
  linkedin_url: string;
}

export interface Project {
  project_name: string;
  Tags: string;
  company: string;
  industry: string;
  role: string;
  duration: string;
  short_description: string;
  objective: string;
  actions: string;
  impact: string;
  result: string;
}

export interface PortfolioData {
  Static: ProfileStatic[];
  Dynamic: Project[];
}
