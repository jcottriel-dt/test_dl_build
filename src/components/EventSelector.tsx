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
  // Core Navigation & Page Events
  {
    name: "page_view",
    category: "page",
    description:
      "Automatically triggered when a user views a page or screen. The foundational event for tracking site/app usage.",
    example: "Homepage visit, product detail page view",
  },
  // User Engagement & Interaction
  {
    name: "click",
    category: "engagement",
    description:
      "Triggered when user clicks on tracked elements like buttons, links, or CTAs. Essential for interaction analysis.",
    example: "Header navigation click, CTA button click, external link click",
  },
  {
    name: "scroll",
    category: "engagement",
    description:
      "Triggered when user scrolls to specific page depths (25%, 50%, 75%, 100%). Measures content engagement.",
    example: "User scrolls to 75% of article, reaches bottom of product page",
  },
  {
    name: "file_download",
    category: "engagement",
    description:
      "Triggered when user downloads files like PDFs, documents, or media. Tracks content consumption.",
    example:
      "PDF brochure download, product catalog download, whitepaper download",
  },
  {
    name: "select_content",
    category: "engagement",
    description:
      "Triggered when user selects specific content or navigates to content sections. Tracks content preferences.",
    example: "Selecting blog post, choosing product category, picking video",
  },

  // Search & Discovery
  {
    name: "search",
    category: "search",
    description:
      "Triggered when user performs a search query. Essential for understanding user intent and content gaps.",
    example:
      "Site search for 'diabetes medication', product search for 'blood pressure monitor'",
  },
  {
    name: "view_search_results",
    category: "search",
    description:
      "Triggered when search results are displayed to user. Tracks search effectiveness and result relevance.",
    example:
      "Drug search returns 15 results, product search shows filtered results",
  },
  {
    name: "select_item",
    category: "search",
    description:
      "Triggered when user selects an item from search results or lists. Measures search success and item appeal.",
    example: "Clicking on search result, selecting from dropdown suggestions",
  },

  // Forms & Lead Generation
  {
    name: "form_start",
    category: "form",
    description:
      "Triggered when user begins filling out a form. Critical for conversion funnel analysis and form optimization.",
    example:
      "Starting contact form, beginning signup process, starting patient enrollment",
  },
  {
    name: "form_submit",
    category: "form",
    description:
      "Triggered when user successfully submits a form. Key conversion event for lead generation and completion tracking.",
    example:
      "Contact form submission, newsletter signup, patient information form completion",
  },
  {
    name: "generate_lead",
    category: "conversion",
    description:
      "Triggered when user action generates a qualified lead. High-value conversion event for business tracking.",
    example:
      "Requesting consultation, downloading gated content, requesting drug samples",
  },

  // User Account & Authentication
  {
    name: "login",
    category: "user",
    description:
      "Triggered when user successfully logs into their account. Tracks user engagement and retention.",
    example: "Healthcare provider portal login, patient account access",
  },
  {
    name: "sign_up",
    category: "user",
    description:
      "Triggered when user creates a new account. Critical conversion event for user acquisition tracking.",
    example:
      "Healthcare provider registration, patient portal signup, newsletter subscription",
  },
  {
    name: "join_group",
    category: "user",
    description:
      "Triggered when user joins a group, program, or community. Tracks program enrollment and community engagement.",
    example:
      "Joining patient support group, enrolling in savings program, subscribing to specialty updates",
  },

  // E-commerce & Shopping
  {
    name: "view_item",
    category: "ecommerce",
    description:
      "Triggered when user views a product or item detail page. Fundamental for product performance analysis.",
    example:
      "Viewing medication details, examining medical device specifications",
  },
  {
    name: "view_item_list",
    category: "ecommerce",
    description:
      "Triggered when user views a list of products or items. Tracks browsing behavior and category performance.",
    example:
      "Viewing search results, browsing product category, seeing related items",
  },
  {
    name: "add_to_cart",
    category: "ecommerce",
    description:
      "Triggered when user adds items to shopping cart. Key pre-purchase conversion indicator.",
    example:
      "Adding prescription to cart, selecting medical supplies, choosing insurance plan",
  },
  {
    name: "remove_from_cart",
    category: "ecommerce",
    description:
      "Triggered when user removes items from cart. Important for cart abandonment analysis and pricing optimization.",
    example: "Removing expensive medication, changing insurance selection",
  },
  {
    name: "view_cart",
    category: "ecommerce",
    description:
      "Triggered when user views their shopping cart contents. Tracks purchase intent and cart engagement.",
    example:
      "Reviewing selected medications, checking total costs, viewing insurance coverage",
  },
  {
    name: "add_to_wishlist",
    category: "ecommerce",
    description:
      "Triggered when user saves items for later purchase. Tracks product interest and future purchase intent.",
    example:
      "Saving medication for future reference, bookmarking medical device",
  },
  {
    name: "begin_checkout",
    category: "ecommerce",
    description:
      "Triggered when user starts the checkout process. Critical conversion funnel event for purchase analysis.",
    example:
      "Starting prescription order, beginning insurance enrollment, initiating payment process",
  },
  {
    name: "add_payment_info",
    category: "ecommerce",
    description:
      "Triggered when user adds payment information during checkout. Late-stage conversion indicator.",
    example:
      "Adding credit card details, selecting insurance payment method, entering bank information",
  },
  {
    name: "add_shipping_info",
    category: "ecommerce",
    description:
      "Triggered when user adds shipping/delivery information. Important step in fulfillment process tracking.",
    example:
      "Adding home delivery address, selecting pharmacy pickup location, choosing shipping method",
  },
  {
    name: "purchase",
    category: "ecommerce",
    description:
      "Triggered when user completes a purchase transaction. The ultimate conversion event for revenue tracking.",
    example:
      "Prescription purchase completion, insurance plan enrollment, medical device order",
  },
  {
    name: "refund",
    category: "ecommerce",
    description:
      "Triggered when a purchase refund is processed. Important for financial reconciliation and customer satisfaction.",
    example:
      "Medication return refund, insurance plan cancellation refund, service fee reversal",
  },

  // Promotions & Marketing
  {
    name: "view_promotion",
    category: "marketing",
    description:
      "Triggered when user views a promotional offer or advertisement. Tracks marketing campaign effectiveness.",
    example:
      "Viewing drug discount offer, seeing savings program banner, promotional popup display",
  },
  {
    name: "select_promotion",
    category: "marketing",
    description:
      "Triggered when user interacts with promotional content. Measures promotion engagement and conversion potential.",
    example:
      "Clicking savings program CTA, selecting discount offer, choosing promotional plan",
  },
  {
    name: "ad_impression",
    category: "marketing",
    description:
      "Triggered when an advertisement is displayed to user. Fundamental for ad campaign measurement and reach analysis.",
    example:
      "Drug advertisement display, banner ad impression, sponsored content view",
  },

  // Content & Media
  {
    name: "view_content",
    category: "content",
    description:
      "Triggered when user views specific content pieces. Tracks content performance and user interests.",
    example:
      "Reading drug information article, viewing patient education video, accessing treatment guidelines",
  },
  {
    name: "share",
    category: "content",
    description:
      "Triggered when user shares content via social media or other channels. Measures content virality and engagement.",
    example:
      "Sharing health article on Facebook, emailing drug information, forwarding patient resources",
  },

  // Educational & Onboarding
  {
    name: "tutorial_begin",
    category: "education",
    description:
      "Triggered when user starts a tutorial or educational sequence. Important for user onboarding and education tracking.",
    example:
      "Starting medication instruction tutorial, beginning insurance navigation guide, starting health assessment",
  },
  {
    name: "tutorial_complete",
    category: "education",
    description:
      "Triggered when user completes a tutorial or educational program. Measures educational effectiveness and completion rates.",
    example:
      "Completing injection training, finishing insurance enrollment tutorial, passing medication quiz",
  },

  // Technical & System Events
  {
    name: "error",
    category: "technical",
    description:
      "Triggered when system errors occur or user encounters technical issues. Critical for site reliability and UX monitoring.",
    example:
      "Form submission error, payment processing failure, page load timeout, API connection error",
  },
  {
    name: "set_data",
    category: "technical",
    description:
      "Triggered when data is set or updated in the system. Used for data management and system state tracking.",
    example:
      "User preference update, profile information change, system configuration update",
  },

  // Legacy Events (Maintained for compatibility)
  {
    name: "video_start",
    category: "media",
    description:
      "Triggered when user starts playing a video. Essential for video content engagement analysis.",
    example:
      "Starting patient education video, playing drug mechanism animation, beginning webinar",
  },
  {
    name: "video_progress",
    category: "media",
    description:
      "Triggered at video progress milestones (25%, 50%, 75%, 100%). Tracks video engagement depth.",
    example:
      "Reaching 50% of educational video, completing 75% of treatment explanation",
  },
  {
    name: "video_complete",
    category: "media",
    description:
      "Triggered when user completes watching a video. Measures full content consumption and engagement quality.",
    example:
      "Finishing medication instruction video, completing patient testimonial, watching full webinar",
  },
  {
    name: "custom_event",
    category: "custom",
    description:
      "Custom-defined event for specific business requirements. Flexible event for unique tracking needs.",
    example:
      "Drug interaction check, dosage calculator use, appointment scheduling, specialty program enrollment",
  },
];

const CATEGORY_COLORS = {
  page: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  engagement: "bg-green-500/10 text-green-600 border-green-500/20",
  search: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  form: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  conversion: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  user: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  ecommerce: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  marketing: "bg-red-500/10 text-red-600 border-red-500/20",
  content: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  education: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  technical: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  media: "bg-blue-700/10 text-blue-700 border-blue-700/20",
  custom: "bg-slate-500/10 text-slate-600 border-slate-500/20",
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
                  "group p-3 rounded-lg border-2 border-dashed border-transparent cursor-move transition-all duration-200 hover:border-brand-500/50 hover:bg-brand-500/5 overflow-hidden",
                  selectedEvent === event.name &&
                    "border-brand-500 bg-brand-500/10",
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <span className="font-mono text-sm font-medium truncate">
                    {event.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs whitespace-nowrap flex-shrink-0",
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
