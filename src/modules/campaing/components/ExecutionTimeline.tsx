
// components/ExecutionTimeline.tsx
// Timeline de ejecución de campañas por fases

import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { ExecutionTimeline as ExecutionTimelineType } from "../types/campaignsTypes";

interface ExecutionTimelineProps {
  timeline: ExecutionTimelineType;
}

const phaseColors = {
  purple: "",
  blue: "",
  green: "",
};

export function ExecutionTimeline({ timeline }: ExecutionTimelineProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader >
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <CardTitle>Timeline de Ejecución Sugerido</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {timeline.phases.map((phase) => (
          <div
            key={phase.id}
            className={`p-6 border-b last:border-b-0 ${
              phaseColors[phase.color as keyof typeof phaseColors] || "bg-gray-500"
            } bg-opacity-10`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Phase Number */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                  {phase.phaseNumber}
                </div>
                
                {/* Phase Info */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              </div>
              
              {/* Budget */}
              <div className="text-right">
                <p className="text-2xl font-bold text-green-500">
                  ${phase.budget}
                </p>
                <p className="text-xs text-muted-foreground">presupuesto</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}