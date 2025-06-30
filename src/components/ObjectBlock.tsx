import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Parameter } from "./ParameterList";

interface ObjectBlockProps {
  title: string;
  description: string;
  parameters: Parameter[];
  onParameterAdd: (parameter: Parameter) => void;
  onParameterRemove: (parameterName: string) => void;
  className?: string;
}

const OBJECT_BLOCK_COLORS = {
  user_data: "border-orange-500/50 bg-orange-500/5",
  page_data: "border-blue-500/50 bg-blue-500/5",
  page_data_temp: "border-cyan-500/50 bg-cyan-500/5",
  event_data: "border-purple-500/50 bg-purple-500/5",
};

export default function ObjectBlock({
  title,
  description,
  parameters,
  onParameterAdd,
  onParameterRemove,
  className,
}: ObjectBlockProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = e.dataTransfer.getData("application/json");
      const dragData = JSON.parse(data);

      if (dragData.type === "parameter") {
        // Check if parameter already exists
        const exists = parameters.some(
          (p) => p.name === dragData.parameter.name,
        );
        if (!exists) {
          onParameterAdd(dragData.parameter);
        }
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  const blockColorClass =
    OBJECT_BLOCK_COLORS[
      title
        .toLowerCase()
        .replace(/\s+/g, "_") as keyof typeof OBJECT_BLOCK_COLORS
    ] || "border-gray-500/50 bg-gray-500/5";

  return (
    <Card
      className={cn(
        "transition-all duration-200 h-fit min-h-[200px]",
        blockColorClass,
        isDragOver && "border-brand-500 bg-brand-500/10 scale-105",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {parameters.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
            <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag parameters here to add them to {title}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {parameters.map((parameter) => (
              <div
                key={parameter.name}
                className="group flex items-center justify-between p-3 bg-card rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-medium">
                      {parameter.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {parameter.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {parameter.description}
                  </p>
                  {parameter.example && (
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono mt-1 inline-block">
                      {parameter.example}
                    </code>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onParameterRemove(parameter.name)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
