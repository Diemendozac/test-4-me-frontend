// constants/businessOpportunityEndpoints.ts

export const BUSINESS_OPPORTUNITY_BASE_URL =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/business-opportunity`
    : "http://localhost:8006/api/business-opportunity";

export const BUSINESS_OPPORTUNITY_ENDPOINTS = {
  // Dashboard - Resumen Ejecutivo
  OPPORTUNITY_KPIS: `${BUSINESS_OPPORTUNITY_BASE_URL}/kpis/`,
  AGE_DISTRIBUTION: `${BUSINESS_OPPORTUNITY_BASE_URL}/age-distribution/`,
  
  // Investigación - Análisis de Mercado
  MARKET_DATA: `${BUSINESS_OPPORTUNITY_BASE_URL}/market-data/`,
  OPPORTUNITY_SCORE: `${BUSINESS_OPPORTUNITY_BASE_URL}/opportunity-score/`,
  KEY_INSIGHTS: `${BUSINESS_OPPORTUNITY_BASE_URL}/key-insights/`,
} as const;

export type BusinessOpportunityEndpointKey = keyof typeof BUSINESS_OPPORTUNITY_ENDPOINTS;