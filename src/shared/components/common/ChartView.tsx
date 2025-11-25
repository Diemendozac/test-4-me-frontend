// components/ChartView.tsx

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  // 1. Componentes nuevos para Radar
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis, // Eje para los nombres/etiquetas
  PolarRadiusAxis, // Eje para los valores
} from "recharts";
import { useChartView } from "@/shared/hooks/useView";
import { ChartData, QueryHook } from "../../../shared/types";

interface ChartViewProps {
  // 2. 'radar' añadido al tipo
  queryHook: QueryHook<ChartData>;
  type: "line" | "bar" | "area" | "pie" | "radar";
  title?: string;
  subtitle?: string;
  className?: string;
  hideHeader?: boolean;
}

// Nueva paleta de azules (Blue Palette)
const bluePalette = ["#1a73e8", "#4285f4", "#77a9f8", "#a8c8fb", "#d8e6fe"];

export function ChartView({
  queryHook,
  type,
  title,
  subtitle,
  className = "",
  hideHeader = false,
}: ChartViewProps) {
  const { data, isLoading, isError, error, hasNoData } = useChartView(queryHook());

  // 🎨 Chart colors from CSS variables
  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    "var(--chart-8)",
    "var(--chart-9)",
    "var(--chart-10)",
  ];

  // Helper to get computed color value
  const getColor = (cssVar: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar.replace("var(", "").replace(")", ""))
        .trim();
    }
    return cssVar;
  };

  // 🌀 Loading state
  if (isLoading) {
    return hideHeader ? (
      <div className="h-full w-full flex items-center justify-center">
        <div
          className="h-8 w-8 rounded animate-pulse"
          style={{ backgroundColor: "var(--surface-container-high)" }}
        ></div>
      </div>
    ) : (
      <div
        className={`rounded-xl border p-4 ${className}`}
        style={{
          backgroundColor: "var(--surface-container-low)",
          borderColor: "var(--outline-variant)",
        }}
      >
        {title && (
          <div className="mb-2 flex items-center justify-between">
            <div
              className="h-5 rounded w-32 animate-pulse"
              style={{ backgroundColor: "var(--surface-container-high)" }}
            ></div>
            {subtitle && (
              <div
                className="h-3 rounded w-20 animate-pulse"
                style={{ backgroundColor: "var(--surface-container-high)" }}
              ></div>
            )}
          </div>
        )}
        <div
          className="h-64 rounded animate-pulse"
          style={{ backgroundColor: "var(--surface-container)" }}
        ></div>
      </div>
    );
  }

  // ❌ Error state
  if (isError) {
    return hideHeader ? (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-xs" style={{ color: "var(--error)" }}>
          Error
        </p>
      </div>
    ) : (
      <div
        className={`rounded-xl border p-4 ${className}`}
        style={{
          backgroundColor: "var(--surface-container-low)",
          borderColor: "var(--outline-variant)",
        }}
      >
        {title && (
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: "var(--on-surface)" }}>
              {title}
            </h3>
            {subtitle && (
              <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                {subtitle}
              </span>
            )}
          </div>
        )}
        <div className="h-64 flex items-center justify-center">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium" style={{ color: "var(--on-surface-variant)" }}>
              Error Loading Chart
            </p>
            <p className="text-xs" style={{ color: "var(--error)" }}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🚫 No data state
  if (hasNoData || !data) {
    return hideHeader ? (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
          No data
        </p>
      </div>
    ) : (
      <div
        className={`rounded-xl border p-4 ${className}`}
        style={{
          backgroundColor: "var(--surface-container-low)",
          borderColor: "var(--outline-variant)",
        }}
      >
        {title && (
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: "var(--on-surface)" }}>
              {title}
            </h3>
            {subtitle && (
              <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
                {subtitle}
              </span>
            )}
          </div>
        )}
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
            No data available
          </p>
        </div>
      </div>
    );
  }

  // ✅ Prepare chart data for Recharts
  const chartData = data.labels.map((label, index) => {
    const point: Record<string, any> = { name: label };
    data.datasets.forEach((dataset) => {
      point[dataset.label] = dataset.data[index];
    });
    return point;
  });

  // Render chart based on type
  return (
    <div className={`rounded-xl border bg-card p-4 ${className}`}>
      {title && (
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" && (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              {data.datasets.map((dataset, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={bluePalette[i % bluePalette.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          )}

          {type === "bar" && (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              {data.datasets.map((dataset, i) => (
                <Bar
                  key={i}
                  dataKey={dataset.label}
                  fill={bluePalette[i % bluePalette.length]}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          )}

          {type === "area" && (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="5%" stopColor={bluePalette[0]} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={bluePalette[0]} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              {data.datasets.map((dataset, i) => (
                <Area
                  key={i}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={bluePalette[i % bluePalette.length]}
                  fill="url(#blueFill)"
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          )}

          {type === "pie" && (
            <PieChart>
              <Tooltip />
              <Pie
                data={chartData}
                dataKey={data.datasets[0]?.label || "value"}
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={bluePalette[i % bluePalette.length]} />
                ))}
              </Pie>
            </PieChart>
          )}

          {/* 3. Lógica de renderizado para el gráfico de Radar */}
          {type === "radar" && (
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              {/* PolarRadiusAxis es opcional, pero ayuda a escalar */}
              <PolarRadiusAxis angle={90} domain={[0, 'auto']} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              {data.datasets.map((dataset, i) => (
                <Radar
                  key={i}
                  name={dataset.label}
                  dataKey={dataset.label}
                  stroke={bluePalette[i % bluePalette.length]}
                  fill={bluePalette[i % bluePalette.length]}
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}