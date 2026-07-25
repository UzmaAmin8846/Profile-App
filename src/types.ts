/**
 * Core data model for the site. Keeping this separate from components
 * means the whole site can be re-skinned with a different person's data
 * by editing only `src/data/cvData.ts` (or swapping in a JSON payload
 * that matches these shapes — see loadCvData() in data/cvData.ts).
 */

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  links: SocialLink[];
  /** Optional URL to a hosted CV/resume file (PDF). If omitted, the
   * "Download CV" button falls back to generating a printable HTML resume. */
  cvFileUrl?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  /** icon key used by Header/Contact to pick a glyph — kept as a string
   * so new links don't require touching component code. */
  icon: 'linkedin' | 'behance' | 'github' | 'email' | 'phone' | 'website';
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  /** User-supplied URL for the profile photo. Validated at render time;
   * falls back to a generated placeholder if missing or broken. */
  photoUrl?: string;
  location: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  mode?: string; // e.g. "On-site", "Remote", "Hybrid"
  startDate: string; // e.g. "Apr 2026"
  endDate: string; // e.g. "Jun 2026" or "Present"
  highlights: string[];
}

export interface EducationItem {
  id: string;
  credential: string;
  institution: string;
  detail?: string; // CGPA, grade, board, etc.
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  category: string; // e.g. "Final Year Project", "Academic Project"
  period: string;
  description: string;
  highlights?: string[];
  stack?: string[];
  link?: string;
}

export interface SkillGroup {
  id: string;
  groupLabel: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  /** 1-5, optional — used only if you want to render proficiency bars. */
  level?: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  detail?: string;
}

export interface CvData {
  profile: Profile;
  contact: ContactInfo;
  experience: Experience[];
  education: EducationItem[];
  projects: Project[];
  skillGroups: SkillGroup[];
  certificates: Certificate[];
}
