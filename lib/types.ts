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
  date: string;
  phase?: string;
  short_description?: string;
  situation?: string;
  task?: string;
  actions?: string;
  impact?: string;
  result?: string;
  img1?: string;
  img2?: string;
  
  // Dynamic image schema
  img_situation?: string[];
  img_task?: string[];
  img_actions?: string[]; // <-- Added img_actions
  img_impact?: string[];
  img_result?: string[];
  img_project?: string[];
}

export interface PortfolioData {
  Static: ProfileStatic[];
  Dynamic: Project[];
}
