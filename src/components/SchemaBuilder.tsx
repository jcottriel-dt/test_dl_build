import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, RotateCcw, Layers, Settings } from "lucide-react";
import ObjectBlock from "./ObjectBlock";
import SchemaPreview from "./SchemaPreview";
import MarkdownGenerator from "./MarkdownGenerator";
import { Parameter } from "./ParameterList";

interface SchemaBuilderProps {
  selectedEvent: string | null;
  onEventChange: (event: string | null) => void;
}

const OBJECT_BLOCKS = [
  {
    key: "user_data",
    title: "User Data",
    description: "Information about the current user",
  },
  {
    key: "page_data",
    title: "Page Data",
    description: "Information about the current page",
  },
  {
    key: "page_data_temp",
    title: "Page Data (Temporary)",
    description: "Temporary page-specific data",
  },
  {
    key: "event_data",
    title: "Event Data",
    description: "Specific data related to this event",
  },
];

export default function SchemaBuilder({
  selectedEvent,
  onEventChange,
}: SchemaBuilderProps) {
  const [objectBlocks, setObjectBlocks] = useState<{
    [key: string]: Parameter[];
  }>({
    user_data: [],
    page_data: [],
    page_data_temp: [],
    event_data: [],
  });

  const handleParameterAdd = (blockKey: string, parameter: Parameter) => {
    setObjectBlocks((prev) => ({
      ...prev,
      [blockKey]: [...prev[blockKey], parameter],
    }));
  };

  const handleParameterRemove = (blockKey: string, parameterName: string) => {
    setObjectBlocks((prev) => ({
      ...prev,
      [blockKey]: prev[blockKey].filter((p) => p.name !== parameterName),
    }));
  };

  const clearAllParameters = () => {
    setObjectBlocks({
      user_data: [],
      page_data: [],
      page_data_temp: [],
      event_data: [],
    });
  };

  const clearEvent = () => {
    onEventChange(null);
    clearAllParameters();
  };

  const totalParameters = Object.values(objectBlocks).reduce(
    (sum, params) => sum + params.length,
    0,
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    try {
      const data = e.dataTransfer.getData("application/json");
      const dragData = JSON.parse(data);

      if (dragData.type === "event") {
        onEventChange(dragData.name);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <div className="h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-6">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Layers className="h-6 w-6 text-brand-500" />
              Schema Builder
            </CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedEvent ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Event:
                    </span>
                    <Badge variant="default" className="font-mono">
                      {selectedEvent}
                    </Badge>
                    <Badge variant="outline">
                      {totalParameters} parameter
                      {totalParameters !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-2 p-4 border-2 border-dashed border-muted-foreground/50 rounded-lg bg-muted/20"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Drag an event here or select from the sidebar
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllParameters}
                  disabled={totalParameters === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Parameters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearEvent}
                  disabled={!selectedEvent}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content Area - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-32">
        {/* Object Blocks - Left Side */}
        <div className="lg:col-span-3">
          <div className="sticky top-32 grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            {OBJECT_BLOCKS.map((block) => (
              <ObjectBlock
                key={block.key}
                title={block.title}
                description={block.description}
                parameters={objectBlocks[block.key]}
                onParameterAdd={(parameter) =>
                  handleParameterAdd(block.key, parameter)
                }
                onParameterRemove={(parameterName) =>
                  handleParameterRemove(block.key, parameterName)
                }
              />
            ))}
          </div>
        </div>

        {/* Schema Preview and Markdown Export - Right Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto pb-20">
            <SchemaPreview
              eventName={selectedEvent}
              objectBlocks={objectBlocks}
            />
            <MarkdownGenerator
              eventName={selectedEvent}
              objectBlocks={objectBlocks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
