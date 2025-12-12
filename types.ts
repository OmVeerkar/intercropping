
export enum Screen {
  Home = 'HOME',
  Wizard = 'WIZARD',
  Results = 'RESULTS',
  Plan = 'PLAN',
}

export type Language = 'en' | 'kn';

export interface FarmData {
  location: string;
  soilType: string;
  landSize: number;
  primaryCrop: string;
  irrigation: string;
  season: string;
  sunlight: string;
  goals: string[];
  labor: string;
  fertilizer: string;
  showLocalOnly: boolean;
  includeExperimental: boolean;
}

export interface PlanSection {
  title: string;
  details: string;
}

export interface DetailedPlan {
  soilPrep: PlanSection;
  sowing: PlanSection;
  fertilizationWatering: PlanSection;
  pestWeedControl: PlanSection;
  harvest: PlanSection;
  marketInsight: PlanSection;
  sustainabilityTips: PlanSection;
}

export interface Recommendation {
  companionCrop: string;
  compatibilityScore: number;
  expectedYieldIncrease: number;
  profitRange: {
    min: number;
    max: number;
  };
  synergyNotes: string;
  detailedPlan: DetailedPlan;
}

export interface AIResponse {
  recommendations: Recommendation[];
}