// types/businessOpportunityTypes.ts
// Tipos compatibles con los componentes genéricos de Warren

// ========== KPI Types (para KPIGridView) ==========
export interface KPIData {
  id: string;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: string;
  color?: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'red';
}

// ========== Chart Types (para ChartView) ==========
export interface ChartData {
  title?: string;
  subtitle?: string;
  data: Array<Record<string, any>>;
  chartConfig?: {
    xAxisKey?: string;
    yAxisKey?: string;
    dataKeys?: string[];
    colors?: string[];
  };
}

// ========== List Types (para ListView) ==========
export interface ListItem {
  id: string;
  label: string;
  value?: string | number;
  description?: string;
  highlight?: boolean;
  metadata?: Record<string, any>;
}

export interface ListData {
  title?: string;
  subtitle?: string;
  items: ListItem[];
}

// ========== Response Types para RTK Query ==========
export interface OpportunityKPIsResponse {
  kpis: KPIData[];
}

export interface AgeDistributionResponse extends ChartData {
  data: Array<{
    ageRange: string;
    hombres: number;
    mujeres: number;
  }>;
}

export interface MarketDataResponse extends ListData {
  items: ListItem[];
}

export interface OpportunityScoreResponse extends ChartData {
  data: Array<{
    name: string;
    value: number;
    fill?: string;
  }>;
}

export interface KeyInsightsResponse extends ListData {
  items: ListItem[];
}