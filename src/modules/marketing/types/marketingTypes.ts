// types/marketingTypes.ts
// Tipos genéricos para marketing - reutiliza tipos de @/shared/types

import type { KPIData, ChartData, ListData } from '@/shared/types';

// ========== Content Post Types (nuevo tipo genérico) ==========
export type ContentPostType = "reels" | "carrousel" | "post" | "story" | "igtv";

export interface ContentPostDetails {
  hook?: string;
  keyPoints?: string[];
  cta?: string;
  bestTime?: string;
  hashtags?: string[];
  notes?: string;
}

export interface ContentPost {
  id: string;
  type: ContentPostType;
  title: string;
  subtitle?: string;
  objective?: string;
  details: ContentPostDetails;
  status?: "draft" | "scheduled" | "published";
  scheduledDate?: string;
  views?: number;
  engagement?: number;
}

// ========== Weekly Content Plan ==========
export interface WeeklyContent {
  week: number;
  weekLabel: string;
  objective: string;
  posts: ContentPost[];
}

export interface ContentPlan {
  weeks: WeeklyContent[];
  currentWeek?: number;
}

// ========== Tab Structure ==========
export type MarketingTab = "audiencia" | "contenido";

// ========== Response Types para RTK Query ==========

// Audiencia Tab
export interface AudienceKPIsResponse {
  kpis: KPIData[];
}

export interface BehaviorProfileResponse extends ChartData {
  // Usa ChartData con type="radar"
  type: "radar";
}

export interface EngagementHoursResponse extends ChartData {
  // Usa ChartData con type="area" y múltiples datasets
  type: "area";
}

export interface DemographicDistributionResponse extends ChartData {
  // Usa ChartData con type="bar" y múltiples datasets
  type: "bar";
}

export interface DemographicKPIsResponse {
  kpis: KPIData[];
}

export interface AudienceInsightsResponse {
  insights: ListData;
}

// Contenido Tab
export interface ContentPlanResponse extends ContentPlan {}

export interface WeekOptionsResponse {
  options: Array<{ value: number; label: string }>;
}