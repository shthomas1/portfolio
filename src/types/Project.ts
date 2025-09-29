import { CardData } from "../components/Card";

export interface Project extends CardData {
  subtitle?: string;
  client?: string;
  duration?: string;
  highlights?: string[];
  challenges?: string[];
  features?: { title: string; description: string }[];
  approach?: { step: string; title: string; description: string }[];
  roleDetails?: {
    scrumMaster?: string[];
    dataEngineer?: string[];
  };
  outcomes?: string[];
  team?: { name: string; role: string; linkedIn: string }[];
}
