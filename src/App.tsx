import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PricePage from "./pages/PricePage";
import ContactsPage from "./pages/ContactsPage";
import CalculatorPage from "./pages/CalculatorPage";
import AdminLogin from "./pages/AdminLogin";
import AdminSetup from "./pages/AdminSetup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminSections from "./pages/admin/AdminSections";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminCases from "./pages/admin/AdminCases";
import AdminCalculator from "./pages/admin/AdminCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/sections" element={<AdminSections />} />
            <Route path="/admin/seo" element={<AdminSEO />} />
            <Route path="/admin/seo/og" element={<AdminSEO />} />
            <Route path="/admin/menu" element={<AdminMenu />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/cases" element={<AdminCases />} />
            <Route path="/admin/calculator" element={<AdminCalculator />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
