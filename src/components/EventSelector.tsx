import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Search, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventSelectorProps {
  selectedEvent: string | null;
  onEventSelect: (event: string) => void;
}

const GA4_EVENTS = [
  {
    name: "page_view",
    category: "page",
    description: "When a user views a page",
  },
  {
    name: "scroll",
    category: "engagement",
    description: "When a user scrolls to the bottom of a page",
  },
  {
    name: "click",
    category: "engagement",
    description: "When a user clicks on an element",
  },
  {
    name: "file_download",
    category: "engagement",
    description: "When a user downloads a file",
  },
  {
    name: "form_start",
    category: "form",
    description: "When a user begins to fill out a form",
  },
  {
    name: "form_submit",
    category: "form",
    description: "When a user submits a form",
  },
  { name: "login", category: "user", description: "When a user logs in" },
  {
    name: "sign_up",
    category: "user",
    description: "When a user creates an account",
  },
  {
    name: "purchase",
    category: "ecommerce",
    description: "When a user completes a purchase",
  },
  {
    name: "add_to_cart",
    category: "ecommerce",
    description: "When a user adds items to cart",
  },
  {
    name: "remove_from_cart",
    category: "ecommerce",
    description: "When a user removes items from cart",
  },
  {
    name: "view_item",
    category: "ecommerce",
    description: "When a user views an item",
  },
  {
    name: "begin_checkout",
    category: "ecommerce",
    description: "When a user begins checkout",
  },
  {
    name: "search",
    category: "engagement",
    description: "When a user searches",
  },
  {
    name: "share",
    category: "engagement",
    description: "When a user shares content",
  },
  {
    name: "video_start",
    category: "media",
    description: "When a user starts playing a video",
  },
  {
    name: "video_progress",
    category: "media",
    description: "When a user reaches video progress milestones",
  },
  {
    name: "video_complete",
    category: "media",
    description: "When a user completes watching a video",
  },
  {
    name: "custom_event",
    category: "custom",
    description: "Custom event for specific tracking needs",
  },
];

const CATEGORY_COLORS = {
  page: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  engagement: "bg-green-500/10 text-green-600 border-green-500/20",
  form: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  user: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  ecommerce: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  media: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  custom: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export default function EventSelector({
  selectedEvent,
  onEventSelect,
}: EventSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const filteredEvents = GA4_EVENTS.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDragStart = (e: React.DragEvent, eventName: string) => {
    e.dataTransfer.setData("text/plain", eventName);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "event", name: eventName }),
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="h-fit">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-brand-500" />
                GA4 Events
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CardTitle>
            {isOpen && (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.name}
                draggable
                onDragStart={(e) => handleDragStart(e, event.name)}
                onClick={() => onEventSelect(event.name)}
                className={cn(
                  "group p-3 rounded-lg border-2 border-dashed border-transparent cursor-move transition-all duration-200 hover:border-brand-500/50 hover:bg-brand-500/5",
                  selectedEvent === event.name &&
                    "border-brand-500 bg-brand-500/10",
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-sm font-medium">
                    {event.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      CATEGORY_COLORS[
                        event.category as keyof typeof CATEGORY_COLORS
                      ],
                    )}
                  >
                    {event.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
