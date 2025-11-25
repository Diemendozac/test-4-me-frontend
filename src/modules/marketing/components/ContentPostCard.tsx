// components/ContentPostCard.tsx
// Tarjeta expandible para posts de contenido

import { useState } from "react";
import { ChevronDown, ChevronUp, Video, Image, FileText, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import type { ContentPost } from "../types/marketingTypes";

interface ContentPostCardProps {
  post: ContentPost;
}

const postTypeIcons = {
  reels: Video,
  carrousel: Image,
  post: FileText,
  story: Play,
  igtv: Video,
};

// Se ajustó la opacidad del fondo de 10 a 20 para un color más visible
const postTypeColors = {
  reels: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
  carrousel: "bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30",
  post: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
  story: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  igtv: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
};

export function ContentPostCard({ post }: ContentPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = postTypeIcons[post.type];

  return (
    <Card className="overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors py-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4"> {/* Aumentado el gap a 4 */}
            {/* Nuevo estilo para el icono: cuadrado redondeado con anillo (ring) */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg border p-1 ${postTypeColors[post.type]}`}
            >
              <Icon className="h-6 w-6" /> {/* Icono un poco más grande */}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold">{post.title}</CardTitle> {/* Título más grande y bold */}
                {/* Badge con estilo primary/default para mejor visibilidad */}
                <Badge 
                    variant="default" 
                    className="text-xs bg-primary/80 hover:bg-primary"
                >
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </Badge>
              </div>
              {post.subtitle && (
                <p className="text-sm text-muted-foreground mt-0.5">{post.subtitle}</p>
              )}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-primary transition-transform" /> // Icono de expansión más grande y usa color primario
          ) : (
            <ChevronDown className="h-6 w-6 text-primary transition-transform" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6 pt-4 pb-4 border-t bg-muted/10"> {/* Espaciado y fondo sutil */}
          
          {/* Hook */}
          {post.details.hook && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1 border-b border-muted-foreground/30 pb-0.5">
                🎣 Hook
              </h4>
              <p className="text-sm">{post.details.hook}</p>
            </div>
          )}

          {/* Key Points */}
          {post.details.keyPoints && post.details.keyPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-2 border-b border-muted-foreground/30 pb-0.5">
                📋 Puntos Clave
              </h4>
              <ul className="space-y-1 pl-4">
                {post.details.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-sm list-disc"> {/* Usando list-disc nativo de HTML */}
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          {post.details.cta && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1 border-b border-muted-foreground/30 pb-0.5">
                📢 CTA (Llamada a la Acción)
              </h4>
              <p className="text-sm">{post.details.cta}</p>
            </div>
          )}

          {/* Best Time */}
          {post.details.bestTime && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1 border-b border-muted-foreground/30 pb-0.5">
                ⏰ Mejor Horario
              </h4>
              <p className="text-sm">{post.details.bestTime}</p>
            </div>
          )}

          {/* Hashtags */}
          {post.details.hashtags && post.details.hashtags.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-foreground mb-2 border-b border-muted-foreground/30 pb-0.5">
                🏷️ Hashtags
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.details.hashtags.map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="text-xs border border-primary/50 text-primary hover:bg-secondary/80" // Mejor borde para los hashtags
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notes - Separación y estilo más destacado */}
          {post.details.notes && (
            <div className="p-3 bg-secondary/50 rounded-lg border border-border"> 
              <h4 className="text-sm font-bold text-primary mb-1">
                📝 Notas Adicionales
              </h4>
              <p className="text-sm text-foreground italic">
                {post.details.notes}
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}