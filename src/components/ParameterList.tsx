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
  // Healthcare/Pharmaceutical - Drug Information
  {
    name: "drugName",
    type: "string",
    category: "drug",
    description: "Full name of the pharmaceutical drug",
    example: "Metformin Hydrochloride",
  },
  {
    name: "drug_name",
    type: "string",
    category: "drug",
    description: "Alternative drug name parameter",
    example: "Lisinopril",
  },
  {
    name: "drugBrand",
    type: "string",
    category: "drug",
    description: "Brand name of the drug",
    example: "Lipitor",
  },
  {
    name: "drug_type",
    type: "string",
    category: "drug",
    description: "Classification type of the drug",
    example: "prescription",
  },
  {
    name: "drug_classes",
    type: "array",
    category: "drug",
    description: "Array of drug classification categories",
    example: '["ACE Inhibitor", "Cardiovascular"]',
  },
  {
    name: "drug_speciality",
    type: "string",
    category: "drug",
    description: "Medical specialty associated with drug",
    example: "cardiology",
  },
  {
    name: "drug_specialties",
    type: "array",
    category: "drug",
    description: "Multiple medical specialties for the drug",
    example: '["cardiology", "internal_medicine"]',
  },
  {
    name: "drug_specialty",
    type: "string",
    category: "drug",
    description: "Primary medical specialty for drug",
    example: "oncology",
  },
  {
    name: "dosage",
    type: "string",
    category: "drug",
    description: "Dosage amount and unit for the drug",
    example: "10mg",
  },
  {
    name: "indication",
    type: "string",
    category: "drug",
    description: "Primary medical indication for drug use",
    example: "hypertension",
  },
  {
    name: "indications",
    type: "array",
    category: "drug",
    description: "Array of medical indications for drug use",
    example: '["diabetes", "weight_management"]',
  },
  {
    name: "enhanced_drug",
    type: "boolean",
    category: "drug",
    description: "Whether drug has enhanced features or information",
    example: "true",
  },
  {
    name: "qty",
    type: "number",
    category: "drug",
    description: "Quantity of drug units",
    example: "30",
  },

  // Healthcare Provider Information
  {
    name: "healthcare_provider_id",
    type: "string",
    category: "hcp",
    description: "Unique identifier for healthcare provider",
    example: "hcp_12345",
  },
  {
    name: "hcp_status",
    type: "string",
    category: "hcp",
    description: "Status or verification level of healthcare provider",
    example: "verified",
  },
  {
    name: "alreadyHadNPI",
    type: "boolean",
    category: "hcp",
    description: "Whether healthcare provider already has NPI number",
    example: "true",
  },
  {
    name: "npiNetNew",
    type: "boolean",
    category: "hcp",
    description: "Whether this is a new NPI registration",
    example: "false",
  },

  // Insurance & Coverage
  {
    name: "insurance_name",
    type: "string",
    category: "insurance",
    description: "Name of the insurance provider",
    example: "Blue Cross Blue Shield",
  },
  {
    name: "insurance_state",
    type: "string",
    category: "insurance",
    description: "State where insurance coverage applies",
    example: "CA",
  },
  {
    name: "payer",
    type: "string",
    category: "insurance",
    description: "Insurance payer organization",
    example: "Aetna",
  },
  {
    name: "mco",
    type: "string",
    category: "insurance",
    description: "Managed Care Organization identifier",
    example: "Kaiser Permanente",
  },
  {
    name: "mcoQuery",
    type: "string",
    category: "insurance",
    description: "Query term used to search for MCO",
    example: "kaiser",
  },
  {
    name: "planType",
    type: "string",
    category: "insurance",
    description: "Type of insurance plan",
    example: "HMO",
  },
  {
    name: "coverageRestrictions",
    type: "array",
    category: "insurance",
    description: "Array of coverage restrictions or limitations",
    example: '["prior_auth_required", "step_therapy"]',
  },
  {
    name: "pa_approved",
    type: "boolean",
    category: "insurance",
    description: "Whether prior authorization is approved",
    example: "true",
  },
  {
    name: "stepTherapies",
    type: "array",
    category: "insurance",
    description: "Required step therapy medications",
    example: '["metformin", "sulfonylurea"]',
  },
  {
    name: "tier",
    type: "number",
    category: "insurance",
    description: "Formulary tier level of the drug",
    example: "2",
  },

  // User & Session Information
  {
    name: "user_already_exists",
    type: "boolean",
    category: "user",
    description: "Whether user account already exists",
    example: "false",
  },
  {
    name: "user_key",
    type: "string",
    category: "user",
    description: "Unique user identification key",
    example: "usr_abc123",
  },
  {
    name: "user_role",
    type: "string",
    category: "user",
    description: "Role or type of user in the system",
    example: "healthcare_provider",
  },
  {
    name: "aim_session_id",
    type: "string",
    category: "user",
    description: "Session identifier for analytics tracking",
    example: "sess_xyz789",
  },

  // Employer & Professional Information
  {
    name: "employerName",
    type: "string",
    category: "professional",
    description: "Name of the healthcare provider's employer",
    example: "Mayo Clinic",
  },
  {
    name: "employerQuery",
    type: "string",
    category: "professional",
    description: "Search query used to find employer",
    example: "mayo clinic minnesota",
  },

  // Interaction & Engagement
  {
    name: "action",
    type: "string",
    category: "interaction",
    description: "Specific action taken by user",
    example: "drug_search",
  },
  {
    name: "button_text",
    type: "string",
    category: "interaction",
    description: "Text content of clicked button",
    example: "Find Coverage Options",
  },
  {
    name: "cta_button_name",
    type: "string",
    category: "interaction",
    description: "Name identifier of call-to-action button",
    example: "request_samples",
  },
  {
    name: "cta_type",
    type: "string",
    category: "interaction",
    description: "Type of call-to-action interaction",
    example: "primary_cta",
  },
  {
    name: "link_text",
    type: "string",
    category: "interaction",
    description: "Text content of clicked link",
    example: "Learn More About Side Effects",
  },
  {
    name: "link_url",
    type: "string",
    category: "interaction",
    description: "URL destination of clicked link",
    example: "https://example.com/drug-info",
  },
  {
    name: "drop_down_text",
    type: "string",
    category: "interaction",
    description: "Selected text from dropdown menu",
    example: "Cardiology",
  },
  {
    name: "clipboard_text",
    type: "string",
    category: "interaction",
    description: "Text copied to clipboard",
    example: "Drug Name: Lipitor 20mg",
  },
  {
    name: "has_interaction",
    type: "boolean",
    category: "interaction",
    description: "Whether user had any interaction on page",
    example: "true",
  },
  {
    name: "scroll_depth",
    type: "number",
    category: "interaction",
    description: "Percentage of page scrolled by user",
    example: "75",
  },

  // Content & Resources
  {
    name: "resource_name",
    type: "string",
    category: "content",
    description: "Name of the accessed resource",
    example: "Patient Education Brochure",
  },
  {
    name: "resource_parent",
    type: "string",
    category: "content",
    description: "Parent category of the resource",
    example: "Educational Materials",
  },
  {
    name: "resource_parent_section",
    type: "string",
    category: "content",
    description: "Parent section containing the resource",
    example: "Patient Resources",
  },
  {
    name: "resource_section",
    type: "string",
    category: "content",
    description: "Specific section of the resource",
    example: "Side Effects",
  },
  {
    name: "pdf_link",
    type: "string",
    category: "content",
    description: "URL link to PDF document",
    example: "https://example.com/drug-guide.pdf",
  },

  // Search & Discovery
  {
    name: "search_term",
    type: "string",
    category: "search",
    description: "Search query entered by user",
    example: "blood pressure medication",
  },
  {
    name: "resultsCount",
    type: "number",
    category: "search",
    description: "Number of search results returned",
    example: "42",
  },
  {
    name: "check_drugs",
    type: "boolean",
    category: "search",
    description: "Whether user checked drug interactions",
    example: "true",
  },

  // Form & Application Data
  {
    name: "question_1",
    type: "string",
    category: "form",
    description: "Answer to first form question",
    example: "Yes, I have diabetes",
  },
  {
    name: "question_2",
    type: "string",
    category: "form",
    description: "Answer to second form question",
    example: "Type 2 diabetes",
  },
  {
    name: "application_link",
    type: "string",
    category: "form",
    description: "Link to application or enrollment form",
    example: "https://example.com/apply",
  },

  // Program & Treatment Information
  {
    name: "program_name",
    type: "string",
    category: "program",
    description: "Name of patient assistance or treatment program",
    example: "Patient Savings Program",
  },
  {
    name: "treatment",
    type: "string",
    category: "program",
    description: "Treatment or therapy being discussed",
    example: "insulin_therapy",
  },
  {
    name: "pharma_company",
    type: "string",
    category: "program",
    description: "Pharmaceutical company name",
    example: "Pfizer Inc.",
  },

  // Testing & Experimentation
  {
    name: "experiment_name",
    type: "string",
    category: "testing",
    description: "Name of A/B test or experiment",
    example: "homepage_redesign_v2",
  },
  {
    name: "experiment_treatment",
    type: "string",
    category: "testing",
    description: "Treatment group in A/B test",
    example: "variant_b",
  },

  // Technical & System
  {
    name: "artificial_gclid",
    type: "string",
    category: "technical",
    description: "Artificially generated Google Click ID",
    example: "art_gclid_123456",
  },
  {
    name: "email_domain",
    type: "string",
    category: "technical",
    description: "Domain of user's email address",
    example: "gmail.com",
  },
  {
    name: "phone_number",
    type: "string",
    category: "technical",
    description: "User's phone number (hashed for privacy)",
    example: "+1-555-0123",
  },
  {
    name: "url_fragment",
    type: "string",
    category: "technical",
    description: "Fragment identifier in URL",
    example: "#section-dosage",
  },

  // Business & Commerce
  {
    name: "cards_amount",
    type: "number",
    category: "commerce",
    description: "Number of cards or items in collection",
    example: "3",
  },
  {
    name: "product_id",
    type: "string",
    category: "commerce",
    description: "Unique product identifier",
    example: "prod_drug_001",
  },
  {
    name: "transaction_id",
    type: "string",
    category: "commerce",
    description: "Unique transaction identifier",
    example: "txn_abc123",
  },
  {
    name: "currency",
    type: "string",
    category: "commerce",
    description: "Currency code for monetary values",
    example: "USD",
  },
  {
    name: "value",
    type: "number",
    category: "commerce",
    description: "Monetary value of transaction or event",
    example: "25.99",
  },

  // Communication & Support
  {
    name: "case_id",
    type: "string",
    category: "support",
    description: "Support case or ticket identifier",
    example: "case_98765",
  },
  {
    name: "chat_id",
    type: "string",
    category: "support",
    description: "Chat session identifier",
    example: "chat_session_456",
  },
  {
    name: "channel",
    type: "string",
    category: "support",
    description: "Communication channel used",
    example: "live_chat",
  },

  // Navigation & Structure
  {
    name: "page",
    type: "string",
    category: "page",
    description: "Current page identifier",
    example: "drug_detail",
  },
  {
    name: "page_section",
    type: "string",
    category: "page",
    description: "Section of the current page",
    example: "dosage_information",
  },
  {
    name: "slug",
    type: "string",
    category: "page",
    description: "URL slug identifier for the page",
    example: "lipitor-atorvastatin",
  },
  {
    name: "id",
    type: "string",
    category: "page",
    description: "Generic identifier for page or element",
    example: "element_123",
  },
  {
    name: "label",
    type: "string",
    category: "page",
    description: "Label or title for UI element",
    example: "Dosage Calculator",
  },
  {
    name: "order",
    type: "number",
    category: "page",
    description: "Order or sequence number",
    example: "1",
  },
  {
    name: "set_id",
    type: "string",
    category: "page",
    description: "Identifier for a set or group of items",
    example: "drug_set_cardio",
  },
  {
    name: "method",
    type: "string",
    category: "page",
    description: "Method or approach used",
    example: "api_lookup",
  },

  // List & Item Management
  {
    name: "item_list_id",
    type: "string",
    category: "list",
    description: "Identifier for item list",
    example: "search_results_drugs",
  },
  {
    name: "item_list_name",
    type: "string",
    category: "list",
    description: "Name of the item list",
    example: "Drug Search Results",
  },
  {
    name: "items",
    type: "array",
    category: "list",
    description: "Array of items in the list",
    example: '[{"name": "Lipitor", "id": "drug_001"}]',
  },

  // Standard GA4 Event Parameters
  {
    name: "event_action",
    type: "string",
    category: "event",
    description: "Specific action that triggered the event",
    example: "drug_lookup",
  },
  {
    name: "event_category",
    type: "string",
    category: "event",
    description: "Category classification for the event",
    example: "drug_interaction",
  },
  {
    name: "event_label",
    type: "string",
    category: "event",
    description: "Additional label for event context",
    example: "dosage_calculator",
  },

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
  drug: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  hcp: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  insurance: "bg-blue-700/10 text-blue-700 border-blue-700/20",
  professional: "bg-indigo-700/10 text-indigo-700 border-indigo-700/20",
  interaction: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  search: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  program: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  testing: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  commerce: "bg-green-700/10 text-green-700 border-green-700/20",
  support: "bg-red-500/10 text-red-600 border-red-500/20",
  list: "bg-purple-700/10 text-purple-700 border-purple-700/20",
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
