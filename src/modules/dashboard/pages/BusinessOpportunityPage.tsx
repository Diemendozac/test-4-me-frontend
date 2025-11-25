// pages/BusinessOpportunityPage.tsx - Using generic components

import { Users, Target, TrendingUp, Lightbulb } from "lucide-react";
import { KPIGridView } from "@/shared/components/common/KPIGridView";
import { ChartView } from "@/shared/components/common/ChartView";
import { ListView } from "@/shared/components/common/ListView";
import {
  useGetOpportunityKPIsQuery,
  useGetAgeDistributionQuery,
  useGetMarketDataQuery,
  useGetOpportunityScoreQuery,
  useGetKeyInsightsQuery,
} from "../store/businessOpportunityApi";

export default function BusinessOpportunityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Análisis de Oportunidad de Negocio
        </h1>
        <p className="text-muted-foreground">
          Evaluación completa del mercado y viabilidad del proyecto
        </p>
      </div>

      {/* ========== RESUMEN EJECUTIVO ========== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <h2 className="text-xl font-bold">Resumen Ejecutivo</h2>
        </div>

        {/* KPIs - Pass the query hook, component handles the rest */}
        <KPIGridView queryHook={useGetOpportunityKPIsQuery} />

        {/* Age Distribution Chart */}
        <ChartView
          queryHook={useGetAgeDistributionQuery}
          type="bar"
          title="Distribución de Audiencia por Edad"
          subtitle="Usuarios por rango etario"
        />
      </div>

      {/* ========== ANÁLISIS DE MERCADO ========== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-bold">Análisis de Mercado</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Market Data List */}
          <ListView
            queryHook={useGetMarketDataQuery}
            title="Datos del Mercado"
            subtitle="métricas clave"
            renderIcon={(item) => (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <TrendingUp className="h-4 w-4" />
              </div>
            )}
          />

          {/* Opportunity Score */}
          <ChartView
            queryHook={useGetOpportunityScoreQuery}
            type="pie"
            title="Score de Oportunidad"
            subtitle="viabilidad del negocio"
          />
        </div>

        {/* Key Insights */}
        <ListView
          queryHook={useGetKeyInsightsQuery}
          title="Insights Clave"
          subtitle="recomendaciones estratégicas"
          renderIcon={(item) => (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <Lightbulb className="h-4 w-4" />
            </div>
          )}
        />
      </div>
    </div>
  );
}