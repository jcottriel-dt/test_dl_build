import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventSelector from "@/components/EventSelector";
import ParameterList from "@/components/ParameterList";
import SchemaBuilder from "@/components/SchemaBuilder";
import { Menu, Database, Zap, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const downloadStandaloneHTML = async () => {
    try {
      console.log('🔄 Creating fully functional standalone DataLayer Builder...');

      // Inline the comprehensive standalone HTML directly
      const standaloneHTML = await fetch('/standalone-comprehensive.html')
        .then(response => response.text())
        .catch(() => {
          // Fallback: create comprehensive HTML inline if file not found
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DataLayer Builder v3.0 - GA4 Schema Generator</title>
    <meta name="description" content="Healthcare & Pharmaceutical GA4 DataLayer Schema Builder">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            min-height: 100vh;
        }
        .container { max-width: 1400px; margin: 0 auto; padding: 1rem; }
        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 1.5rem 2rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .title {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(45deg, #22c55e, #16a34a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle { opacity: 0.8; margin-top: 0.5rem; }
        .grid { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; }
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .card h3 { color: #22c55e; margin-bottom: 1rem; }
        .param-list { max-height: 400px; overflow-y: auto; }
        .param-item {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .param-item:hover {
            background: rgba(34, 197, 94, 0.1);
            border-color: rgba(34, 197, 94, 0.3);
        }
        .param-name { font-weight: bold; color: #22c55e; }
        .param-desc { font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem; }
        .schema-output {
            background: #1e293b;
            border-radius: 8px;
            padding: 1rem;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn {
            background: #22c55e;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            margin: 0.5rem 0.5rem 0.5rem 0;
        }
        .btn:hover { background: #16a34a; }
        .btn-secondary { background: #3b82f6; }
        .btn-secondary:hover { background: #2563eb; }
        .selected-params {
            min-height: 200px;
            background: rgba(59, 130, 246, 0.1);
            border: 2px dashed rgba(59, 130, 246, 0.3);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
        }
        .selected-param {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.4);
            border-radius: 6px;
            padding: 0.5rem;
            margin: 0.25rem;
            display: inline-block;
            cursor: pointer;
        }
        .badge {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }
        @media (max-width: 768px) {
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title">DataLayer Builder v3.0</h1>
            <p class="subtitle">Healthcare & Pharmaceutical GA4 Schema Generator - Standalone Version</p>
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;">
                Generated: ${new Date().toLocaleString()} | 20+ Parameters | 11+ Events | Full Functionality
            </p>
        </header>

        <div class="grid">
            <div>
                <div class="card">
                    <h3>📊 GA4 Events</h3>
                    <select id="eventSelect" style="width: 100%; padding: 0.5rem; border-radius: 6px; border: 1px solid #ccc; margin-bottom: 1rem; color: #333;">
                        <option value="">Select an event...</option>
                        <option value="page_view">page_view</option>
                        <option value="click">click</option>
                        <option value="form_start">form_start</option>
                        <option value="form_submit">form_submit</option>
                        <option value="search">search</option>
                        <option value="view_item">view_item</option>
                        <option value="add_to_cart">add_to_cart</option>
                        <option value="purchase">purchase</option>
                        <option value="generate_lead">generate_lead</option>
                        <option value="login">login</option>
                        <option value="sign_up">sign_up</option>
                    </select>

                    <h3>🏥 Healthcare Parameters</h3>
                    <div class="param-list" id="paramList">
                        <!-- Parameters will be loaded here -->
                    </div>
                </div>
            </div>

            <div>
                <div class="card">
                    <h3>🔧 Schema Builder</h3>
                    <div>
                        <strong>Selected Event:</strong> <span id="selectedEvent">None</span>
                    </div>
                    <div class="selected-params" id="selectedParams">
                        <p style="opacity: 0.7; text-align: center;">Click parameters on the left to add them here</p>
                    </div>

                    <button class="btn" onclick="generateSchema()">Generate Schema</button>
                    <button class="btn btn-secondary" onclick="exportMarkdown()">Export Markdown</button>
                    <button class="btn btn-secondary" onclick="clearAll()">Clear All</button>

                    <h3 style="margin-top: 2rem;">📄 Generated Code</h3>
                    <div class="schema-output" id="schemaOutput">// Select an event and add parameters to generate code</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Healthcare/Pharmaceutical GA4 Parameters Database
        const PARAMETERS = [
            { name: 'drug_name', type: 'string', desc: 'Generic or full name of the pharmaceutical drug', example: 'Metformin Hydrochloride' },
            { name: 'drug_brand', type: 'string', desc: 'Brand name of the drug', example: 'Lipitor' },
            { name: 'dosage', type: 'string', desc: 'Dosage amount and unit for the drug', example: '10mg' },
            { name: 'indication', type: 'string', desc: 'Primary medical indication for drug use', example: 'hypertension' },
            { name: 'healthcare_provider_id', type: 'string', desc: 'Unique identifier for healthcare provider', example: 'hcp_12345' },
            { name: 'hcp_status', type: 'string', desc: 'Status or verification level of healthcare provider', example: 'verified' },
            { name: 'insurance_name', type: 'string', desc: 'Name of the insurance provider', example: 'Blue Cross Blue Shield' },
            { name: 'payer', type: 'string', desc: 'Insurance payer organization', example: 'Aetna' },
            { name: 'tier', type: 'number', desc: 'Formulary tier level of the drug', example: '2' },
            { name: 'user_role', type: 'string', desc: 'Role or type of user in the system', example: 'healthcare_provider' },
            { name: 'search_term', type: 'string', desc: 'Search query entered by user', example: 'blood pressure medication' },
            { name: 'program_name', type: 'string', desc: 'Name of patient assistance or treatment program', example: 'Patient Savings Program' },
            { name: 'page_section', type: 'string', desc: 'Section of the current page', example: 'dosage_information' },
            { name: 'button_text', type: 'string', desc: 'Text content of clicked button', example: 'Find Coverage Options' },
            { name: 'form_id', type: 'string', desc: 'Unique form identifier', example: 'contact_form' },
            { name: 'event_category', type: 'string', desc: 'Category classification for the event', example: 'drug_interaction' },
            { name: 'event_action', type: 'string', desc: 'Specific action that triggered the event', example: 'drug_lookup' },
            { name: 'event_label', type: 'string', desc: 'Additional label for event context', example: 'dosage_calculator' },
            { name: 'value', type: 'number', desc: 'Monetary value of transaction or event', example: '25.99' },
            { name: 'currency', type: 'string', desc: 'Currency code for monetary values', example: 'USD' }
        ];

        let selectedEvent = '';
        let selectedParams = [];

        // Initialize the application
        function init() {
            loadParameters();
            document.getElementById('eventSelect').addEventListener('change', function(e) {
                selectedEvent = e.target.value;
                document.getElementById('selectedEvent').textContent = selectedEvent || 'None';
                generateSchema();
            });
        }

        function loadParameters() {
            const container = document.getElementById('paramList');
            container.innerHTML = '';

            PARAMETERS.forEach(param => {
                const div = document.createElement('div');
                div.className = 'param-item';
                div.onclick = () => addParameter(param);
                div.innerHTML = \`
                    <div class="param-name">\${param.name}<span class="badge">\${param.type}</span></div>
                    <div class="param-desc">\${param.desc}</div>
                    <div style="font-size: 0.8rem; color: #22c55e; margin-top: 0.25rem;">Example: \${param.example}</div>
                \`;
                container.appendChild(div);
            });
        }

        function addParameter(param) {
            if (!selectedParams.find(p => p.name === param.name)) {
                selectedParams.push(param);
                updateSelectedParams();
                generateSchema();
            }
        }

        function removeParameter(paramName) {
            selectedParams = selectedParams.filter(p => p.name !== paramName);
            updateSelectedParams();
            generateSchema();
        }

        function updateSelectedParams() {
            const container = document.getElementById('selectedParams');
            if (selectedParams.length === 0) {
                container.innerHTML = '<p style="opacity: 0.7; text-align: center;">Click parameters on the left to add them here</p>';
                return;
            }

            container.innerHTML = '';
            selectedParams.forEach(param => {
                const div = document.createElement('div');
                div.className = 'selected-param';
                div.onclick = () => removeParameter(param.name);
                div.title = 'Click to remove';
                div.innerHTML = \`\${param.name} <span class="badge">\${param.type}</span>\`;
                container.appendChild(div);
            });
        }

        function generateSchema() {
            const output = document.getElementById('schemaOutput');

            if (!selectedEvent) {
                output.textContent = '// Select an event to generate code';
                return;
            }

            let schema = \`// GA4 DataLayer Event: \${selectedEvent}
dataLayer.push({
  event: '\${selectedEvent}'\`;

            selectedParams.forEach(param => {
                const value = param.type === 'string' ? \`'\${param.example}'\` : param.example;
                schema += \`,
  \${param.name}: \${value}\`;
            });

            schema += \`
});

// JavaScript Implementation
gtag('event', '\${selectedEvent}', {\`;

            selectedParams.forEach((param, index) => {
                const value = param.type === 'string' ? \`'\${param.example}'\` : param.example;
                const comma = index < selectedParams.length - 1 ? ',' : '';
                schema += \`
  \${param.name}: \${value}\${comma}\`;
            });

            schema += \`
});\`;

            output.textContent = schema;
        }

        function exportMarkdown() {
            if (!selectedEvent) {
                alert('Please select an event first');
                return;
            }

            let markdown = \`# \${selectedEvent}

## Event Description
This event is triggered for \${selectedEvent} interactions in the healthcare/pharmaceutical application.

## Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
\`;

            selectedParams.forEach(param => {
                markdown += \`| \${param.name} | \${param.type} | \${param.desc} | \${param.example} |
\`;
            });

            markdown += \`
## Implementation

\\\`\\\`\\\`javascript
// DataLayer Push
dataLayer.push({
  event: '\${selectedEvent}'\`;

            selectedParams.forEach(param => {
                const value = param.type === 'string' ? \`'\${param.example}'\` : param.example;
                markdown += \`,
  \${param.name}: \${value}\`;
            });

            markdown += \`
});

// gtag Implementation
gtag('event', '\${selectedEvent}', {\`;

            selectedParams.forEach((param, index) => {
                const value = param.type === 'string' ? \`'\${param.example}'\` : param.example;
                const comma = index < selectedParams.length - 1 ? ',' : '';
                markdown += \`
  \${param.name}: \${value}\${comma}\`;
            });

            markdown += \`
});
\\\`\\\`\\\`

Generated by DataLayer Builder v3.0 - \${new Date().toLocaleString()}
\`;

            // Download markdown file
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`\${selectedEvent}_schema.md\`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function clearAll() {
            selectedEvent = '';
            selectedParams = [];
            document.getElementById('eventSelect').value = '';
            document.getElementById('selectedEvent').textContent = 'None';
            updateSelectedParams();
            generateSchema();
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', init);

        // Console welcome message
        console.log('🎯 DataLayer Builder v3.0 - Standalone Version');
        console.log('🏥 Healthcare & Pharmaceutical GA4 Schema Generator');
        console.log('✅ Full functionality available offline');
        console.log('📊 20 healthcare parameters loaded');
        console.log('🚀 Ready to build GA4 schemas!');
    </script>
</body>
</html>`;

      // Create and download the file
      const blob = new Blob([standaloneHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `DataLayer-Builder-v3.0-Functional-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success message
      console.log('✅ Functional DataLayer Builder HTML downloaded!');
      console.log(`📊 File size: ${Math.round(blob.size / 1024)}KB`);

      // Show user feedback
      const feedback = document.createElement('div');
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 99999;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      feedback.innerHTML = `✅ Functional DataLayer Builder downloaded! (${Math.round(blob.size / 1024)}KB)`;
      document.body.appendChild(feedback);

      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.remove();
        }
      }, 4000);

    } catch (error) {
      console.error('❌ Error generating standalone HTML:', error);

      // Show error feedback
      const errorFeedback = document.createElement('div');
      errorFeedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 99999;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      errorFeedback.innerHTML = `❌ Error: ${error.message}`;
      document.body.appendChild(errorFeedback);

      setTimeout(() => {
        if (errorFeedback.parentNode) {
          errorFeedback.remove();
        }
      }, 6000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-500" />
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
                    DataLayer Builder
                  </h1>
                  <Badge
                    variant="outline"
                    className="text-xs bg-brand-500/10 text-brand-600 border-brand-500/20"
                  >
                    v3.0
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Google Analytics 4 Schema Generator
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadStandaloneHTML}
              className="flex items-center gap-2"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="hidden sm:inline">Download HTML</span>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-16 left-0 z-40 w-80 transform transition-transform duration-200 ease-in-out lg:relative lg:inset-y-0 lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="h-full border-r border-border bg-card/50">
            <div className="flex h-full flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-brand-500" />
                  <h2 className="font-semibold">Schema Components</h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  Drag events and parameters to build your GA4 schema
                </p>
              </div>
              <div className="flex-1 overflow-hidden p-4 space-y-4">
                <EventSelector
                  selectedEvent={selectedEvent}
                  onEventSelect={setSelectedEvent}
                />
                <ParameterList />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:translate-x-0">
          <div className="h-full overflow-auto">
            {/* Welcome Section */}
            {!selectedEvent && (
              <Card className="mb-8 bg-gradient-to-r from-brand-500/10 to-brand-600/10 border-brand-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-brand-500" />
                    Welcome to DataLayer Builder v3.0
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold text-brand-600 mb-2">
                        🏥 Healthcare & Pharmaceutical Focus
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 74+ specialized healthcare parameters</li>
                        <li>• Drug information tracking</li>
                        <li>• Insurance & coverage parameters</li>
                        <li>• Healthcare provider data</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-600 mb-2">
                        🎯 Professional GA4 Tools
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 35+ comprehensive GA4 events</li>
                        <li>• Real-time code generation</li>
                        <li>• Markdown documentation export</li>
                        <li>• Drag & drop schema building</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-brand-500/5 border border-brand-500/20 rounded-lg">
                    <p className="text-sm text-brand-700 dark:text-brand-400">
                      <strong>Get Started:</strong> Select an event from the sidebar to begin building your GA4 schema,
                      or click "Download HTML" to get a standalone version you can share with clients.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <SchemaBuilder
              selectedEvent={selectedEvent}
              onEventChange={setSelectedEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;