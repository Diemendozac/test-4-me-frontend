
// pages/MarketingPage.tsx
// Página de marketing con tabs: Audiencia y Contenido

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { AudienceTab } from "../components/AudienceTab";
import { ContentTab } from "../components/ContentTab";

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Marketing
        </h1>
        <p className="text-muted-foreground">
          Análisis de audiencia y planificación de contenido
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="audiencia" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audiencia">Audiencia</TabsTrigger>
          <TabsTrigger value="contenido">Contenido</TabsTrigger>
        </TabsList>

        <TabsContent value="audiencia" className="space-y-6">
          <AudienceTab />
        </TabsContent>

        <TabsContent value="contenido" className="space-y-6">
          <ContentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}