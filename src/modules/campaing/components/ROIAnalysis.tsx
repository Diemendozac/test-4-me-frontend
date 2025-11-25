
// components/ROIAnalysis.tsx
// Análisis de retorno de inversión

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { ROIAnalysis as ROIAnalysisType } from "../types/campaignsTypes";

interface ROIAnalysisProps {
  analysis: ROIAnalysisType;
}

export function ROIAnalysis({ analysis }: ROIAnalysisProps) {
  return (
    <Card className="overflow-hidden border-green-500/20">
      <CardHeader className="bg-green-500/10">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Análisis de ROI
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {/* Inversión Publicitaria */}
        <div className="bg-green-500/5 p-6 border-b border-green-500/10">
          <p className="text-sm text-muted-foreground mb-2">
            Inversión Publicitaria
          </p>
          <p className="text-3xl font-bold">
            {analysis.currency}{analysis.investment}
          </p>
        </div>

        {/* Ingresos Estimados */}
        <div className="bg-green-500/10 p-6 border-b border-green-500/10">
          <p className="text-sm text-muted-foreground mb-2">
            Ingresos Estimados
          </p>
          <p className="text-3xl font-bold">
            {analysis.currency}{analysis.estimatedRevenue}
          </p>
        </div>

        {/* ROI */}
        <div className="bg-green-500/20 p-6 border-b border-green-500/10">
          <p className="text-sm text-muted-foreground mb-2">ROI</p>
          <p className="text-4xl font-bold text-green-600 dark:text-green-400">
            {analysis.roiPercentage}%
          </p>
        </div>

        {/* Return per Dollar */}
        <div className="bg-green-500/10 p-6">
          <p className="text-sm font-medium flex items-center gap-2">
            <span>Por cada {analysis.currency}1 invertido, recuperas</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {analysis.currency}{analysis.returnPerDollar}
            </span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}