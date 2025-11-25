
// pages/tabs/AudienceTab.tsx
// Tab de Audiencia con análisis de comportamiento y demografía

import { Target, TrendingUp, Users, Lightbulb } from "lucide-react";
import { KPIGridView } from "@/shared/components/common/KPIGridView";
import { ChartView } from "@/shared/components/common/ChartView";
import { ListView } from "@/shared/components/common/ListView";
import {
  useGetAudienceKPIsQuery,
  useGetBehaviorProfileQuery,
  useGetEngagementHoursQuery,
  useGetDemographicDistributionQuery,
  useGetDemographicKPIsQuery,
  useGetAudienceInsightsQuery,
} from "../store/marketingApi";

export function AudienceTab() {
  return (
    <div className="space-y-6">
      {/* Análisis de Audiencia */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <h2 className="text-xl font-bold">Análisis de Audiencia</h2>
        </div>

        {/* Perfil de Comportamiento - Radar Chart */}
        <ChartView
          queryHook={useGetBehaviorProfileQuery}
          type="radar"
        />

        {/* KPIs Principales */}
        <KPIGridView 
          queryHook={useGetAudienceKPIsQuery}
          columns={2}
        />
      </div>

      {/* Horarios de Mayor Engagement - Area Chart */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <h2 className="text-xl font-bold">Horarios de Mayor Engagement</h2>
        </div>

        <ChartView
          queryHook={useGetEngagementHoursQuery}
          type="area"
        />
      </div>

      {/* Distribución Demográfica */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-bold">Distribución Demográfica Detallada</h2>
        </div>

        {/* Bar Chart agrupado */}
        <ChartView
          queryHook={useGetDemographicDistributionQuery}
          type="bar"
        />

        {/* KPIs por grupo de edad */}
        <KPIGridView 
          queryHook={useGetDemographicKPIsQuery}
          columns={5}
        />
      </div>

      {/* Insights de Audiencia */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <h2 className="text-xl font-bold">Insights de Audiencia</h2>
        </div>

        <ListView
          queryHook={useGetAudienceInsightsQuery}
          renderIcon={(item) => (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
              <Lightbulb className="h-4 w-4" />
            </div>
          )}
        />
      </div>
    </div>
  );
}