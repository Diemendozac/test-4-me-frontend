// store/businessOpportunityApi.ts
// API usando los tipos exactos de Warren

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { KPIData, ChartData, ListData } from '@/shared/types';
import mockData from '../mocks/businessOpportunityMocks.json';

export const businessOpportunityApi = createApi({
  reducerPath: 'businessOpportunityApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['OpportunityKPIs', 'AgeDistribution', 'MarketData', 'OpportunityScore', 'KeyInsights'],
  endpoints: (builder) => ({
    // KPIs - Returns KPIData[]
    getOpportunityKPIs: builder.query<KPIData[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.kpis };
      },
      providesTags: ['OpportunityKPIs'],
    }),
    
    // Age Distribution - Returns ChartData
    getAgeDistribution: builder.query<ChartData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.ageDistribution };
      },
      providesTags: ['AgeDistribution'],
    }),
    
    // Market Data - Returns ListData
    getMarketData: builder.query<ListData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.marketData };
      },
      providesTags: ['MarketData'],
    }),
    
    // Opportunity Score - Returns ChartData (pie chart)
    getOpportunityScore: builder.query<ChartData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.opportunityScore };
      },
      providesTags: ['OpportunityScore'],
    }),
    
    // Key Insights - Returns ListData
    getKeyInsights: builder.query<ListData, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockData.keyInsights };
      },
      providesTags: ['KeyInsights'],
    }),
  }),
});

export const {
  useGetOpportunityKPIsQuery,
  useGetAgeDistributionQuery,
  useGetMarketDataQuery,
  useGetOpportunityScoreQuery,
  useGetKeyInsightsQuery,
} = businessOpportunityApi;