
// store/marketingApi.ts
// API de marketing usando los tipos de Warren

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { KPIData, ChartData, ListData } from '@/shared/types';
import type { 
  ContentPlan,
  } from '../types/marketingTypes';
import mockData from '../mocks/marketingMocks.json';

export const marketingApi = createApi({
  reducerPath: 'marketingApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    'AudienceKPIs',
    'BehaviorProfile',
    'EngagementHours',
    'DemographicDistribution',
    'DemographicKPIs',
    'AudienceInsights',
    'ContentPlan',
    'WeekOptions'
  ],
  endpoints: (builder) => ({
    // ========== Audiencia Tab Endpoints ==========
    
    // KPIs principales de audiencia
    getAudienceKPIs: builder.query<KPIData[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.audienceKPIs.kpis };
      },
      providesTags: ['AudienceKPIs'],
    }),
    
    // Perfil de comportamiento (radar chart)
    getBehaviorProfile: builder.query<ChartData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.behaviorProfile as ChartData };
      },
      providesTags: ['BehaviorProfile'],
    }),
    
    // Horarios de engagement (area chart)
    getEngagementHours: builder.query<ChartData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.engagementHours as ChartData };
      },
      providesTags: ['EngagementHours'],
    }),
    
    // Distribución demográfica (bar chart)
    getDemographicDistribution: builder.query<ChartData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.demographicDistribution as ChartData };
      },
      providesTags: ['DemographicDistribution'],
    }),
    
    // KPIs demográficos por edad
    getDemographicKPIs: builder.query<KPIData[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.demographicKPIs.kpis };
      },
      providesTags: ['DemographicKPIs'],
    }),
    
    // Insights de audiencia
    getAudienceInsights: builder.query<ListData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.audienceInsights.insights };
      },
      providesTags: ['AudienceInsights'],
    }),
    
    // ========== Contenido Tab Endpoints ==========
    
    // Plan de contenido completo
    getContentPlan: builder.query<ContentPlan, number | void>({
      queryFn: async (weekNumber) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Si se pasa un número de semana, filtrar por esa semana
        if (weekNumber) {
          const week = mockData.contentPlan.weeks.find(w => w.week === weekNumber);
          return { 
            data: {
              currentWeek: weekNumber,
              weeks: week ? [week] : []
            }
          };
        }
        
        // Devolver todo el plan
        return { data: mockData.contentPlan as ContentPlan };
      },
      providesTags: ['ContentPlan'],
    }),
    
    // Opciones de semanas para el dropdown
    getWeekOptions: builder.query<Array<{ value: number; label: string }>, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.weekOptions.options };
      },
      providesTags: ['WeekOptions'],
    }),
  }),
});

export const {
  useGetAudienceKPIsQuery,
  useGetBehaviorProfileQuery,
  useGetEngagementHoursQuery,
  useGetDemographicDistributionQuery,
  useGetDemographicKPIsQuery,
  useGetAudienceInsightsQuery,
  useGetContentPlanQuery,
  useGetWeekOptionsQuery,
} = marketingApi;