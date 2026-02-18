import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { QAProvider } from "@/contexts/QAContext";
import AIChatWidget from "@/components/ai/AIChatWidget";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PricePage from "./pages/PricePage";
import ContactsPage from "./pages/ContactsPage";
import CalculatorPage from "./pages/CalculatorPage";
import CasesPage from "./pages/CasesPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import FAQPage from "./pages/FAQPage";
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
import AdminSettings from "./pages/admin/AdminSettings";
 import AdminCars from "./pages/admin/AdminCars";
import QAPage from "./pages/QAPage";
import ChatPage from "./pages/ChatPage";
import ServicesPage from "./pages/ServicesPage";
import ColorShowcasePage from "./pages/ColorShowcasePage";
import ActiveExhaustHubPage from "./pages/active-exhaust/ActiveExhaustHubPage";
import ActiveExhaustInfoPage from "./pages/active-exhaust/ActiveExhaustInfoPage";
import ActiveExhaustKazanPage from "./pages/active-exhaust/ActiveExhaustKazanPage";
import ActiveExhaustAreaPage from "./pages/active-exhaust/ActiveExhaustAreaPage";
import ActiveExhaustAreaBrandPage from "./pages/active-exhaust/ActiveExhaustAreaBrandPage";
import ActiveExhaustSlugPage from "./pages/active-exhaust/ActiveExhaustSlugPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <QAProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AIChatWidget />
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Service Pages - Existing */}
              <Route path="/okleyka-avto-poliuretanovoy-plenkoy-kazan" element={<ServicePage />} />
              <Route path="/aktivnyy-vyhlop-kazan" element={<ServicePage />} />
              <Route path="/shumoizolyaciya-avto-kazan" element={<ServicePage />} />
              <Route path="/udalenie-vmyatin-bez-pokraski-kazan" element={<ServicePage />} />
              <Route path="/ustanovka-signalizacii-pandora-kazan" element={<ServicePage />} />
              
              {/* Service Pages - New */}
              <Route path="/tonirovka-avto-kazan" element={<ServicePage />} />
              <Route path="/okleyka-vinilom-kazan" element={<ServicePage />} />
              <Route path="/antihrom-kazan" element={<ServicePage />} />
              <Route path="/okleyka-salona-kazan" element={<ServicePage />} />
              <Route path="/deteyling-kazan" element={<ServicePage />} />
              <Route path="/snyatie-plenki-kazan" element={<ServicePage />} />
              
              {/* Additional Pages */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/price" element={<PricePage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/faq" element={<FAQPage />} />
              
              {/* QA Page */}
              {/* QA & Chat Pages */}
              <Route path="/qa" element={<QAPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/colors/:colorId" element={<ColorShowcasePage />} />
              
              {/* Active Exhaust SEO Section */}
              <Route path="/aktivnyy-vykhlop" element={<ActiveExhaustHubPage />} />
              <Route path="/aktivnyy-vykhlop/sound-test" element={<ActiveExhaustInfoPage />} />
              <Route path="/aktivnyy-vykhlop/ustanovka" element={<ActiveExhaustInfoPage />} />
              <Route path="/aktivnyy-vykhlop/tsena" element={<ActiveExhaustInfoPage />} />
              <Route path="/aktivnyy-vykhlop/off-rezhim" element={<ActiveExhaustInfoPage />} />
              <Route path="/aktivnyy-vykhlop/dizel-gibrid-elektro" element={<ActiveExhaustInfoPage />} />
              <Route path="/aktivnyy-vykhlop/kazan" element={<ActiveExhaustKazanPage />} />
              <Route path="/aktivnyy-vykhlop/kazan-:areaSlug" element={<ActiveExhaustAreaPage />} />
              <Route path="/aktivnyy-vykhlop/kazan-:areaSlug/:brandSlug" element={<ActiveExhaustAreaBrandPage />} />
              <Route path="/aktivnyy-vykhlop/:slug" element={<ActiveExhaustSlugPage />} />
              
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
              <Route path="/admin/settings" element={<AdminSettings />} />
               <Route path="/admin/cars" element={<AdminCars />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QAProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
