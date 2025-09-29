export interface BioSkill {
  name: string;
  color: string;
}

export interface BioExperience {
  title: string;
  period: string;
  description: string;
}

export interface BioEducation {
  degree: string;
  period: string;
  description: string;
}

export interface BioContact {
  type: string;
  url?: string;
  display?: string;
}

export interface BioData {
  name: string;
  title: string;
  profileImage: string;
  about?: string[];
  skills?: BioSkill[];
  experience?: BioExperience[];
  technicalSkills?: string[];
  militarySkills?: string[];
  certificates?: string[];
  education?: BioEducation[];
  contact?: BioContact[];
}
