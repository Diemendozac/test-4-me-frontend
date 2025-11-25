
// components/CampaignCard.tsx
// Tarjeta detallada de campaña con audiencia, creativo y resultados

import { Users, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import type { Campaign } from "../types/campaignsTypes";

interface CampaignCardProps {
  campaign: Campaign;
}

const objectiveColors = {
  awareness: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  traffic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  conversion: "bg-green-500/10 text-green-500 border-green-500/20",
  engagement: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  leads: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const objectiveLabels = {
  awareness: "Reconocimiento",
  traffic: "Tráfico",
  conversion: "Conversión",
  engagement: "Interacción",
  leads: "Generación de Leads",
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="space-y-2">
        <div>
          <CardTitle className="text-lg">{campaign.title}</CardTitle>
          {campaign.subtitle && (
            <p className="text-sm text-muted-foreground mt-1">
              {campaign.subtitle}
            </p>
          )}
        </div>
        
        {/* Budget */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {campaign.currency}{campaign.dailyBudget}
          </span>
          <span className="text-muted-foreground">por día</span>
        </div>
        <p className="text-sm text-green-500 font-medium">
          Total: {campaign.currency}{campaign.totalBudget}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Audiencia */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <h3 className="font-semibold">Audiencia</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            {campaign.audience.location && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ubicación:</span>
                <span className="font-medium">{campaign.audience.location}</span>
              </div>
            )}
            
            {campaign.audience.ageRange && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Edad:</span>
                <span className="font-medium">{campaign.audience.ageRange}</span>
              </div>
            )}
            
            {campaign.audience.badges && campaign.audience.badges.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-2">Intereses:</p>
                <div className="flex flex-wrap gap-2">
                  {campaign.audience.badges.map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {campaign.audience.location && campaign.audience.ageRange && (
              <div className="flex justify-between pt-2 border-t">
                <span className="text-muted-foreground">Validedupar centro</span>
                <span className="font-medium">{campaign.audience.ageRange}</span>
              </div>
            )}
          </div>
        </div>

        {/* Creativo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <h3 className="font-semibold">Creativo</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            {campaign.creative.format && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Formato:</span>
                <span className="font-medium">{campaign.creative.format}</span>
              </div>
            )}
            
            {campaign.creative.content && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contenido:</span>
                <span className="font-medium">{campaign.creative.content}</span>
              </div>
            )}
            
            {campaign.creative.video && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Video:</span>
                <span className="font-medium">{campaign.creative.video}</span>
              </div>
            )}
            
            {campaign.creative.images && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Imágenes:</span>
                <span className="font-medium">{campaign.creative.images}</span>
              </div>
            )}
            
            {campaign.creative.tone && (
              <div>
                <p className="text-muted-foreground mb-1">Tono:</p>
                <p className="font-medium">{campaign.creative.tone}</p>
              </div>
            )}
            
            {campaign.creative.cta && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">CTA:</span>
                <span className="text-green-500 font-medium">{campaign.creative.cta}</span>
              </div>
            )}
            
            {campaign.creative.additionalInfo && (
              <p className="text-muted-foreground italic pt-2 border-t">
                {campaign.creative.additionalInfo}
              </p>
            )}
          </div>
        </div>

        {/* Resultados Esperados */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <h3 className="font-semibold">Resultados Esperados</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {campaign.expectedResults.metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-green-500/10 rounded-lg p-3 space-y-1"
              >
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-sm font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}