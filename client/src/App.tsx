import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import LinkTracker from "./components/link_tracker";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Component to track page views with Wouter
const PageTracker = () => {
  const [path] = useLocation();

  useEffect(() => {
    // Send page view to GTM whenever the route changes
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        page: path,
      },
    });
  }, [path]); // Trigger on path change

  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <PageTracker />
          <LinkTracker />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
