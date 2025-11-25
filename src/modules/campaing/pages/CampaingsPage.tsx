
// pages/CampaignsPage.tsx
// Página principal de análisis de campañas publicitarias

import { Megaphone } from "lucide-react";
import { KPIGridView } from "@/shared/components/common/KPIGridView";
import { CampaignCard } from "../components/CampaingCard";
import { ExecutionTimeline } from "../components/ExecutionTimeline";
import { ROIAnalysis } from "../components/ROIAnalysis";
import {
  useGetCampaignsKPIsQuery,
  useGetCampaignsQuery,
  useGetExecutionTimelineQuery,
  useGetROIAnalysisQuery,
} from "../store/campaingsApi";

export default function CampaignsPage() {
  const { data: campaigns, isLoading: isLoadingCampaigns } = useGetCampaignsQuery();
  const { data: timeline, isLoading: isLoadingTimeline } = useGetExecutionTimelineQuery();
  const { data: roiAnalysis, isLoading: isLoadingROI } = useGetROIAnalysisQuery();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Megaphone className="h-6 w-6" />
          <h1 className="text-2xl font-extrabold tracking-tight">
            Campañas Meta Ads
          </h1>
        </div>
        <p className="text-muted-foreground">
          Análisis completo de tus campañas publicitarias
        </p>
      </div>

      {/* KPIs Overview */}
      <KPIGridView 
        queryHook={useGetCampaignsKPIsQuery} 
        variant="colorful"
      />

      {/* Campañas Individuales */}
      <div className="space-y-4">
        {isLoadingCampaigns ? (
          <div className="text-center text-muted-foreground py-8">
            Cargando campañas...
          </div>
        ) : (
          campaigns?.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        )}
      </div>

      {/* Timeline de Ejecución */}
      {!isLoadingTimeline && timeline && (
        <ExecutionTimeline timeline={timeline} />
      )}

      {/* Análisis de ROI */}
      {!isLoadingROI && roiAnalysis && (
        <ROIAnalysis analysis={roiAnalysis} />
      )}
    </div>
  );
}