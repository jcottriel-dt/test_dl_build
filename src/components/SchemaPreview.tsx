import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Eye, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Parameter } from "./ParameterList";

interface SchemaPreviewProps {
  eventName: string | null;
  objectBlocks: {
    [key: string]: Parameter[];
  };
}

export default function SchemaPreview({
  eventName,
  objectBlocks,
}: SchemaPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const generateSchemaObject = () => {
    if (!eventName) return null;

    const schema: any = {
      event: eventName,
    };

    // Add object blocks that have parameters
    Object.entries(objectBlocks).forEach(([blockName, parameters]) => {
      if (parameters.length > 0) {
        schema[blockName] = {};
        parameters.forEach((param) => {
          schema[blockName][param.name] = getExampleValue(param);
        });
      }
    });

    return schema;
  };

  const getExampleValue = (param: Parameter) => {
    if (param.example) {
      try {
        // Try to parse as JSON for arrays/objects
        if (param.type === "array" || param.type === "object") {
          return JSON.parse(param.example);
        }
        // Handle boolean
        if (param.type === "boolean") {
          return param.example === "true";
        }
        // Handle number
        if (param.type === "number") {
          return parseFloat(param.example);
        }
        // Default to string
        return param.example;
      } catch {
        return param.example;
      }
    }

    // Fallback defaults by type
    switch (param.type) {
      case "string":
        return "string_value";
      case "number":
        return 123;
      case "boolean":
        return true;
      case "array":
        return ["item1", "item2"];
      case "object":
        return { key: "value" };
      default:
        return "value";
    }
  };

  const schema = generateSchemaObject();

  const copySchema = async () => {
    if (!schema) return;

    const schemaCode = `dataLayer.push(${JSON.stringify(schema, null, 2)});`;
    try {
      await navigator.clipboard.writeText(schemaCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy schema: ", err);
    }
  };

  if (!eventName) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="mb-4">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-brand-500" />
                  Schema Preview
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="text-center py-6">
                <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Select an event to preview the data layer schema
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  const totalParameters = Object.values(objectBlocks).reduce(
    (sum, params) => sum + params.length,
    0,
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="mb-4">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-brand-500" />
                Schema Preview
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="font-mono">
                  {eventName}
                </Badge>
                <Badge variant="outline">
                  {totalParameters} parameter{totalParameters !== 1 ? "s" : ""}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  copySchema();
                }}
                disabled={!schema}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto border">
                <code className="text-foreground">
                  <span className="text-blue-400">dataLayer</span>
                  <span className="text-muted-foreground">.</span>
                  <span className="text-yellow-400">push</span>
                  <span className="text-muted-foreground">(</span>
                  <span className="text-green-400">{"{"}</span>
                  {schema &&
                    Object.entries(schema).map(([key, value], index) => (
                      <div key={key} className="ml-4">
                        <span className="text-blue-300">"{key}"</span>
                        <span className="text-muted-foreground">: </span>
                        {typeof value === "string" ? (
                          <span className="text-green-300">"{value}"</span>
                        ) : typeof value === "number" ? (
                          <span className="text-orange-300">{value}</span>
                        ) : typeof value === "boolean" ? (
                          <span className="text-purple-300">
                            {value.toString()}
                          </span>
                        ) : Array.isArray(value) ? (
                          <span className="text-cyan-300">
                            [{value.map((v, i) => `"${v}"`).join(", ")}]
                          </span>
                        ) : typeof value === "object" && value !== null ? (
                          <div>
                            <span className="text-green-400">{"{"}</span>
                            {Object.entries(value).map(
                              ([subKey, subValue], subIndex) => (
                                <div key={subKey} className="ml-4">
                                  <span className="text-blue-300">
                                    "{subKey}"
                                  </span>
                                  <span className="text-muted-foreground">
                                    :{" "}
                                  </span>
                                  {typeof subValue === "string" ? (
                                    <span className="text-green-300">
                                      "{subValue}"
                                    </span>
                                  ) : typeof subValue === "number" ? (
                                    <span className="text-orange-300">
                                      {subValue}
                                    </span>
                                  ) : typeof subValue === "boolean" ? (
                                    <span className="text-purple-300">
                                      {subValue.toString()}
                                    </span>
                                  ) : Array.isArray(subValue) ? (
                                    <span className="text-cyan-300">
                                      [
                                      {subValue
                                        .map((v, i) => `"${v}"`)
                                        .join(", ")}
                                      ]
                                    </span>
                                  ) : (
                                    <span className="text-gray-300">
                                      {JSON.stringify(subValue)}
                                    </span>
                                  )}
                                  {subIndex <
                                    Object.entries(value).length - 1 && (
                                    <span className="text-muted-foreground">
                                      ,
                                    </span>
                                  )}
                                </div>
                              ),
                            )}
                            <div className="text-green-400">{"}"}</div>
                          </div>
                        ) : (
                          <span className="text-gray-300">
                            {JSON.stringify(value)}
                          </span>
                        )}
                        {index < Object.entries(schema).length - 1 && (
                          <span className="text-muted-foreground">,</span>
                        )}
                      </div>
                    ))}
                  <span className="text-green-400">{"}"}</span>
                  <span className="text-muted-foreground">);</span>
                </code>
              </pre>

              {totalParameters === 0 && (
                <div className="absolute inset-0 bg-muted/80 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Add parameters to see the schema structure
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg">
              <p className="text-xs text-brand-600 dark:text-brand-400">
                💡 This preview shows how your data layer push will look in the
                actual implementation.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
