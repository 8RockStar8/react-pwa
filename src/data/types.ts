/** 'YYYY-MM', for example '2023-01' */
export type YearMonth = string;

export interface Job {
  company: string;
  role: string;
  stack: string[];
  start: YearMonth;
  /** null = current job */
  end: YearMonth | null;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export type SkillStatus = 'daily' | 'used' | 'learning';

export interface StackLayer {
  layer: string;
  status: SkillStatus;
  description: string;
  skills: string[];
}

export interface Teaching {
  title: string;
  description: string;
  url?: string;
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  status?: string;
  url?: string;
}

export interface Contacts {
  email: string;
  phone?: string;
  github?: string;
  youtube?: string;
  linkedin?: string;
  /** The public URL of this CV site; printed on the PDF / Word CV. */
  website?: string;
}

export interface CV {
  name: string;
  title: string;
  location: string;
  photo?: string;
  summary: string;
  story: string[];
  contacts: Contacts;
  experience: Job[];
  education: Education[];
  stack: StackLayer[];
  tools: string[];
  teaching: Teaching[];
  projects: Project[];
}
