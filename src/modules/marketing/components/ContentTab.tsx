
// pages/tabs/ContentTab.tsx
// Tab de Contenido con plan de contenido semanal

import { useState } from "react";
import { Calendar, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ContentPostCard } from "../components/ContentPostCard";
import {
  useGetContentPlanQuery,
  useGetWeekOptionsQuery,
} from "../store/marketingApi";

export function ContentTab() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  
  const { data: weekOptions } = useGetWeekOptionsQuery();
  const { data: contentPlan, isLoading } = useGetContentPlanQuery(selectedWeek);

  const currentWeekData = contentPlan?.weeks[0];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-muted-foreground">Cargando plan de contenido...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con selector de semana */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h2 className="text-xl font-bold">Plan de Contenido</h2>
        </div>

        <Select
          value={selectedWeek.toString()}
          onValueChange={(value) => setSelectedWeek(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona semana" />
          </SelectTrigger>
          <SelectContent>
            {weekOptions?.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Objetivo de la semana */}
      {currentWeekData && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <CardTitle>{currentWeekData.weekLabel}</CardTitle>
            </div>
            <CardDescription className="text-white/80">
              Objetivo: {currentWeekData.objective}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Posts de contenido */}
      {currentWeekData && (
        <div className="space-y-4">
          {currentWeekData.posts.map((post) => (
            <ContentPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {!currentWeekData && (
        <Card>
          <CardContent className="flex h-64 items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay contenido planificado para esta semana</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}