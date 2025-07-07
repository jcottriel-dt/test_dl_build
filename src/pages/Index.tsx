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
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
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
                <p className="text-sm text-muted-foreground">
                  Drag events and parameters to build your data layer schema
                </p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 p-4">
                <EventSelector
                  selectedEvent={selectedEvent}
                  onEventSelect={setSelectedEvent}
                />
                <ParameterList />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  <p className="mb-1">Built for GA4 Data Layer</p>
                  <p>Drag & drop to create schemas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
            {/* Welcome Section */}
            {!selectedEvent && (
              <Card className="mb-8 bg-gradient-to-r from-brand-500/10 to-brand-600/10 border-brand-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Zap className="h-6 w-6 text-brand-500" />
                    Welcome to DataLayer Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">
                        Build GA4 Data Layer Schemas
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Create professional Google Analytics 4 data layer
                        implementations with our visual schema builder. Drag
                        events and parameters to generate complete
                        documentation.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-brand-500" />
                          Drag GA4 events from the sidebar
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-brand-500" />
                          Add parameters to object blocks
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-brand-500" />
                          Export markdown documentation
                        </div>
                      </div>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                      <h4 className="font-semibold mb-2">Sample Output</h4>
                      <pre className="text-xs text-muted-foreground overflow-x-auto">
                        {`dataLayer.push({
  event: 'page_view',
  user_data: {
    user_id: 'user_12345',
    login_state: true
  },
  page_data: {
    page_name: 'Homepage',
    page_location: 'https://example.com'
  }
});`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Schema Builder */}
            <SchemaBuilder
              selectedEvent={selectedEvent}
              onEventChange={setSelectedEvent}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
