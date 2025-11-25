// types/campaignsTypes.ts
// Tipos genéricos para campañas publicitarias - reutiliza tipos de @/shared/types

import type { KPIData } from '@/shared/types';

// ========== Campaign Types (genérico para cualquier tipo de campaña) ==========
export type CampaignObjective = 
  | "awareness"      // Reconocimiento
  | "traffic"        // Tráfico
  | "conversion"     // Conversión
  | "engagement"     // Interacción
  | "leads";         // Generación de leads

export interface AudienceTarget {
  location?: string;
  ageRange?: string;
  interests?: string[];
  badges?: string[];
}

export interface CreativeDetails {
  format?: string;
  content?: string;
  tone?: string;
  cta?: string;
  video?: string;
  images?: string;
  additionalInfo?: string;
}

export interface ExpectedResults {
  metrics: Array<{
    id: string;
    label: string;
    value: string;
    type?: "range" | "single";
  }>;
}

export interface Campaign {
  id: string;
  objective: CampaignObjective;
  title: string;
  subtitle?: string;
  dailyBudget: number;
  duration: number;
  totalBudget: number;
  currency?: string;
  audience: AudienceTarget;
  creative: CreativeDetails;
  expectedResults: ExpectedResults;
  status?: "draft" | "active" | "paused" | "completed";
}

// ========== Timeline Types ==========
export interface TimelinePhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  daysRange: string;
  budget: number;
  color?: string;
}

export interface ExecutionTimeline {
  phases: TimelinePhase[];
  totalDuration: number;
  totalBudget: number;
}

// ========== ROI Analysis Types ==========
export interface ROIAnalysis {
  investment: number;
  estimatedRevenue: number;
  roi: number;
  roiPercentage: number;
  returnPerDollar: number;
  currency?: string;
}

// ========== Response Types para RTK Query ==========

// Overview KPIs
export interface CampaignsKPIsResponse {
  kpis: KPIData[];
}

// Lista de campañas
export interface CampaignsListResponse {
  campaigns: Campaign[];
}

// Timeline de ejecución
export interface ExecutionTimelineResponse extends ExecutionTimeline {}

// Análisis de ROI
export interface ROIAnalysisResponse extends ROIAnalysis {}