import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Copy,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Parameter } from "./ParameterList";

interface MarkdownGeneratorProps {
  eventName: string | null;
  objectBlocks: {
    [key: string]: Parameter[];
  };
}

export default function MarkdownGenerator({
  eventName,
  objectBlocks,
}: MarkdownGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateMarkdown = () => {
    if (!eventName) return "";

    const allParameters = Object.values(objectBlocks).flat();
    const hasParameters = allParameters.length > 0;

    let markdown = `# ${eventName}

## Definition

This event is triggered when ${getEventDefinition(eventName)}.

## Data Layer Structure

\`\`\`javascript
dataLayer.push({
  event: '${eventName}'`;

    // Add object blocks if they have parameters
    Object.entries(objectBlocks).forEach(([blockName, parameters]) => {
      if (parameters.length > 0) {
        markdown += `,
  ${blockName}: {`;
        parameters.forEach((param, index) => {
          const comma = index < parameters.length - 1 ? "," : "";
          const example = param.example ? ` // Example: ${param.example}` : "";
          markdown += `
    ${param.name}: ${getTypeExample(param.type)}${comma}${example}`;
        });
        markdown += `
  }`;
      }
    });

    markdown += `
});
\`\`\`

## Parameters

${hasParameters ? generateParameterTable(allParameters) : "No parameters defined for this event."}
`;

    return markdown;
  };

  const getEventDefinition = (event: string) => {
    const definitions: { [key: string]: string } = {
      page_view: "a user views a page on the website",
      click: "a user clicks on an interactive element",
      scroll: "a user scrolls to a significant point on the page",
      file_download: "a user downloads a file from the website",
      form_start: "a user begins filling out a form",
      form_submit: "a user successfully submits a form",
      login: "a user logs into their account",
      sign_up: "a user creates a new account",
      purchase: "a user completes a purchase transaction",
      add_to_cart: "a user adds items to their shopping cart",
      remove_from_cart: "a user removes items from their shopping cart",
      view_item: "a user views a specific product or item",
      begin_checkout: "a user starts the checkout process",
      search: "a user performs a search on the website",
      share: "a user shares content from the website",
      video_start: "a user starts playing a video",
      video_progress: "a user reaches specific progress milestones in a video",
      video_complete: "a user finishes watching a video",
      custom_event: "a custom business-specific action occurs",
    };
    return definitions[event] || `the "${event}" action occurs`;
  };

  const getTypeExample = (type: string) => {
    switch (type) {
      case "string":
        return "'string_value'";
      case "number":
        return "123";
      case "boolean":
        return "true";
      case "array":
        return "['item1', 'item2']";
      case "object":
        return '{ key: "value" }';
      default:
        return "'value'";
    }
  };

  const generateParameterTable = (parameters: Parameter[]) => {
    let table = `| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
`;

    parameters.forEach((param) => {
      const example =
        param.example || getTypeExample(param.type).replace(/'/g, "");
      table += `| \`${param.name}\` | ${param.type} | ${param.description} | \`${example}\` |
`;
    });

    return table;
  };

  const markdown = generateMarkdown();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadMarkdown = () => {
    if (!eventName) return;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!eventName) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="h-fit">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-500" />
                  Markdown Export
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
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select an event to generate markdown documentation
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="h-fit">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-500" />
                Markdown Export
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardTitle>
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Badge variant="outline">{eventName}</Badge>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!markdown}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadMarkdown}
                  disabled={!markdown}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <Textarea
              value={markdown}
              readOnly
              className="font-mono text-sm min-h-[400px] resize-none"
              placeholder="Generated markdown will appear here..."
            />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
