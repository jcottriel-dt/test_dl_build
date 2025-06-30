import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Search, Database, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParameterListProps {
  onParameterDrag?: (parameter: Parameter) => void;
}

export interface Parameter {
  name: string;
  type: string;
  category: string;
  description: string;
  required?: boolean;
  example?: string;
}

const PARAMETERS: Parameter[] = [
  // Page Data
  {
    name: "page_name",
    type: "string",
    category: "page",
    description: "The name of the page",
    example: "Homepage",
  },
  {
    name: "page_location",
    type: "string",
    category: "page",
    description: "The URL of the page",
    example: "https://example.com/page",
  },
  {
    name: "page_path",
    type: "string",
    category: "page",
    description: "The path portion of the URL",
    example: "/products/shoes",
  },
  {
    name: "page_query_string",
    type: "string",
    category: "page",
    description: "The query string of the URL",
    example: "?utm_source=google",
  },
  {
    name: "page_type",
    type: "string",
    category: "page",
    description: "The type of page",
    example: "product_detail",
  },
  {
    name: "page_title",
    type: "string",
    category: "page",
    description: "The title of the page",
    example: "Product Name - Company",
  },
  {
    name: "page_referrer",
    type: "string",
    category: "page",
    description: "The referring page URL",
    example: "https://google.com",
  },

  // Site Structure
  {
    name: "site_section",
    type: "string",
    category: "site",
    description: "The main section of the site",
    example: "products",
  },
  {
    name: "site_sub_section",
    type: "string",
    category: "site",
    description: "The sub-section of the site",
    example: "shoes",
  },
  {
    name: "site_variant",
    type: "string",
    category: "site",
    description: "A/B test variant identifier",
    example: "variant_a",
  },
  {
    name: "breadcrumb",
    type: "array",
    category: "site",
    description: "Navigation breadcrumb path",
    example: '["home", "products", "shoes"]',
  },

  // User Data
  {
    name: "user_id",
    type: "string",
    category: "user",
    description: "Unique user identifier",
    example: "user_12345",
  },
  {
    name: "customer_id",
    type: "string",
    category: "user",
    description: "Customer ID for logged in users",
    example: "cust_67890",
  },
  {
    name: "user_type",
    type: "string",
    category: "user",
    description: "Type of user",
    example: "registered",
  },
  {
    name: "login_state",
    type: "boolean",
    category: "user",
    description: "Whether user is logged in",
    example: "true",
  },
  {
    name: "user_segment",
    type: "string",
    category: "user",
    description: "User segment classification",
    example: "premium",
  },

  // Location & Locale
  {
    name: "country",
    type: "string",
    category: "locale",
    description: "User country code",
    example: "US",
  },
  {
    name: "language",
    type: "string",
    category: "locale",
    description: "User language preference",
    example: "en-US",
  },
  {
    name: "region",
    type: "string",
    category: "locale",
    description: "Geographic region",
    example: "North America",
  },
  {
    name: "timezone",
    type: "string",
    category: "locale",
    description: "User timezone",
    example: "America/New_York",
  },

  // Technical
  {
    name: "system_environment",
    type: "string",
    category: "technical",
    description: "Environment identifier",
    example: "production",
  },
  {
    name: "app_version",
    type: "string",
    category: "technical",
    description: "Application version",
    example: "2.1.0",
  },
  {
    name: "platform",
    type: "string",
    category: "technical",
    description: "Platform identifier",
    example: "web",
  },
  {
    name: "device_type",
    type: "string",
    category: "technical",
    description: "Type of device",
    example: "desktop",
  },
  {
    name: "browser",
    type: "string",
    category: "technical",
    description: "Browser name",
    example: "Chrome",
  },
  {
    name: "operating_system",
    type: "string",
    category: "technical",
    description: "Operating system",
    example: "Windows",
  },

  // Event Specific
  {
    name: "event_category",
    type: "string",
    category: "event",
    description: "Category of the event",
    example: "engagement",
  },
  {
    name: "event_action",
    type: "string",
    category: "event",
    description: "Action performed",
    example: "click",
  },
  {
    name: "event_label",
    type: "string",
    category: "event",
    description: "Event label for context",
    example: "header_nav",
  },
  {
    name: "value",
    type: "number",
    category: "event",
    description: "Numeric value associated with event",
    example: "10.99",
  },
  {
    name: "currency",
    type: "string",
    category: "event",
    description: "Currency code",
    example: "USD",
  },

  // Form Data
  {
    name: "form_id",
    type: "string",
    category: "form",
    description: "Unique form identifier",
    example: "contact_form",
  },
  {
    name: "form_name",
    type: "string",
    category: "form",
    description: "Human readable form name",
    example: "Contact Us",
  },
  {
    name: "form_step",
    type: "number",
    category: "form",
    description: "Current step in multi-step form",
    example: "2",
  },
  {
    name: "form_completion_time",
    type: "number",
    category: "form",
    description: "Time to complete form in seconds",
    example: "45",
  },

  // Content
  {
    name: "content_id",
    type: "string",
    category: "content",
    description: "Unique content identifier",
    example: "article_123",
  },
  {
    name: "content_type",
    type: "string",
    category: "content",
    description: "Type of content",
    example: "blog_post",
  },
  {
    name: "content_category",
    type: "string",
    category: "content",
    description: "Content category",
    example: "technology",
  },
  {
    name: "author",
    type: "string",
    category: "content",
    description: "Content author",
    example: "John Doe",
  },
  {
    name: "publish_date",
    type: "string",
    category: "content",
    description: "Content publish date",
    example: "2024-01-15",
  },
];

const CATEGORY_COLORS = {
  page: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  site: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  user: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  locale: "bg-green-500/10 text-green-600 border-green-500/20",
  technical: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  event: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  form: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  content: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
};

const TYPE_COLORS = {
  string: "bg-emerald-500/10 text-emerald-700",
  number: "bg-blue-500/10 text-blue-700",
  boolean: "bg-orange-500/10 text-orange-700",
  array: "bg-purple-500/10 text-purple-700",
  object: "bg-pink-500/10 text-pink-700",
};

export default function ParameterList({ onParameterDrag }: ParameterListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  const categories = Array.from(new Set(PARAMETERS.map((p) => p.category)));

  const filteredParameters = PARAMETERS.filter((param) => {
    const matchesSearch =
      param.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      param.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || param.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e: React.DragEvent, parameter: Parameter) => {
    e.dataTransfer.setData("text/plain", parameter.name);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "parameter", parameter }),
    );
    onParameterDrag?.(parameter);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="h-fit">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-brand-500" />
                Parameters
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardTitle>
            {isOpen && (
              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search parameters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant={selectedCategory === "" ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedCategory("")}
                  >
                    All
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      className="cursor-pointer text-xs"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredParameters.map((parameter) => (
              <div
                key={parameter.name}
                draggable
                onDragStart={(e) => handleDragStart(e, parameter)}
                className="group p-3 rounded-lg border-2 border-dashed border-transparent cursor-move transition-all duration-200 hover:border-brand-500/50 hover:bg-brand-500/5"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-sm font-medium">
                    {parameter.name}
                  </span>
                  <div className="flex gap-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        TYPE_COLORS[parameter.type as keyof typeof TYPE_COLORS],
                      )}
                    >
                      {parameter.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        CATEGORY_COLORS[
                          parameter.category as keyof typeof CATEGORY_COLORS
                        ],
                      )}
                    >
                      {parameter.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                  {parameter.description}
                </p>
                {parameter.example && (
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {parameter.example}
                  </code>
                )}
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
