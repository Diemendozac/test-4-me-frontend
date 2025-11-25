
// store/campaignsApi.ts
// API de campañas usando los tipos de Warren

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { KPIData } from '@/shared/types';
import type { 
  Campaign,
  ExecutionTimeline,
  ROIAnalysis,
} from '../types/campaignsTypes';
import mockData from '../mocks/campainsMocks.json';

export const campaignsApi = createApi({
  reducerPath: 'campaignsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['CampaignsKPIs', 'Campaigns', 'ExecutionTimeline', 'ROIAnalysis'],
  endpoints: (builder) => ({
    // KPIs principales de campañas
    getCampaignsKPIs: builder.query<KPIData[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.campaignsKPIs.kpis };
      },
      providesTags: ['CampaignsKPIs'],
    }),
    
    // Lista de todas las campañas
    getCampaigns: builder.query<Campaign[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.campaigns as Campaign[] };
      },
      providesTags: ['Campaigns'],
    }),
    
    // Campaña individual por ID
    getCampaignById: builder.query<Campaign | undefined, string>({
      queryFn: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const campaign = mockData.campaigns.find(c => c.id === id);
        return { data: campaign as Campaign | undefined };
      },
      providesTags: (result, error, id) => [{ type: 'Campaigns', id }],
    }),
    
    // Timeline de ejecución
    getExecutionTimeline: builder.query<ExecutionTimeline, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.executionTimeline as ExecutionTimeline };
      },
      providesTags: ['ExecutionTimeline'],
    }),
    
    // Análisis de ROI
    getROIAnalysis: builder.query<ROIAnalysis, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.roiAnalysis as ROIAnalysis };
      },
      providesTags: ['ROIAnalysis'],
    }),
  }),
});

export const {
  useGetCampaignsKPIsQuery,
  useGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useGetExecutionTimelineQuery,
  useGetROIAnalysisQuery,
} = campaignsApi;