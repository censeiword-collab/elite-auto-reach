import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import BlogPage from "./pages/BlogPage";
import PricePage from "./pages/PricePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Service Pages */}
          <Route path="/okleyka-avto-poliuretanovoy-plenkoy-kazan" element={<ServicePage />} />
          <Route path="/aktivnyy-vyhlop-kazan" element={<ServicePage />} />
          <Route path="/shumoizolyaciya-avto-kazan" element={<ServicePage />} />
          <Route path="/udalenie-vmyatin-bez-pokraski-kazan" element={<ServicePage />} />
          <Route path="/ustanovka-signalizacii-pandora-kazan" element={<ServicePage />} />
          
          {/* Additional Pages */}
          <Route path="/price" element={<PricePage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
