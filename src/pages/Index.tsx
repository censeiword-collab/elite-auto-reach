import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CasesSection from "@/components/home/CasesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import CTASection from "@/components/home/CTASection";
import SEOTextSection from "@/components/home/SEOTextSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import HowWeWorkSection from "@/components/home/HowWeWorkSection";
import SEOHead from "@/components/SEOHead";
import SchemaOrg, { buildBusinessData } from "@/components/seo/SchemaOrg";
import { WARRANTY, TIMING } from "@/lib/constants";
import { UNIFIED_POSITIONING, getPageSEO } from "@/lib/seo-config";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import LeadWizard from "@/components/LeadWizard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Calculator } from "lucide-react";

const homeFAQ = [
  {
    question: "Сколько стоит оклейка автомобиля защитной плёнкой PPF в Казани?",
    answer: `Стоимость оклейки PPF зависит от выбранной зоны защиты и модели автомобиля. Полная оклейка кузова начинается от 150 000 ₽, защита передней части — от 45 000 ₽, капота — от 15 000 ₽. Используем плёнки премиум-сегмента с гарантией ${WARRANTY.ppf.display}.`,
  },
  {
    question: "Какие автомобили вы обслуживаете?",
    answer: "SUNMAXKZN — студия для автомобилей бизнес- и премиум-класса: Porsche, BMW, Mercedes-Benz, Audi, Lexus, Land Rover и другие. Также работаем с автомобилями массового сегмента.",
  },
  {
    question: "Сколько времени занимает полная шумоизоляция автомобиля?",
    answer: `Комплексная шумоизоляция автомобиля занимает ${TIMING.soundproofingFull.display} в зависимости от объёма работ. Используем сертифицированные материалы премиум-класса. Гарантия — ${WARRANTY.soundproofing.display}.`,
  },
  {
    question: "Можно ли управлять активным выхлопом со смартфона?",
    answer: "Да, мы устанавливаем системы активного выхлопа с электронными заслонками, которые управляются с пульта или смартфона. Вы можете переключаться между тихим режимом для города и спортивным для трассы.",
  },
];

const Index = () => {
  const seoConfig = getPageSEO("/");
  const { settings } = useSiteSettings();
  const businessData = buildBusinessData(settings);
  const [wizardOpen, setWizardOpen] = useState(false);
  const handleOpenLeadWizard = () => setWizardOpen(true);
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title={seoConfig?.title || UNIFIED_POSITIONING.title}
        description={`Профессиональный детейлинг и тюнинг автомобилей премиум-класса в Казани. Оклейка PPF, активный выхлоп, шумоизоляция, PDR, сигнализации Pandora. Гарантия ${WARRANTY.max.display}.`}
        keywords={[
          "детейлинг казань",
          "оклейка ppf казань",
          "защитная плёнка автомобиля",
          "активный выхлоп казань",
          "шумоизоляция авто казань",
          "удаление вмятин pdr",
          "сигнализация pandora",
        ]}
        canonicalUrl="https://sunmax-kzn.ru"
      />
      <SchemaOrg type="LocalBusiness" data={businessData} />
      <SchemaOrg type="FAQ" data={homeFAQ} />
      
      <Header onOpenLeadWizard={handleOpenLeadWizard} />
      <main>
        
        <HeroSection />
        <ServicesSection />
        <CasesSection />
        <WhyUsSection />
        <HowWeWorkSection />
        <ReviewsSection />
        <CTASection />
        <SEOTextSection />
      </main>
      <Footer />

      {/* Fixed CTA button */}
      <button
        onClick={handleOpenLeadWizard}
        className="fixed z-40 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 md:px-5 md:py-4 md:text-base rounded-full shadow-lg hover:bg-primary/90 transition-colors font-medium text-sm bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] md:bottom-24 lg:bottom-28"
      >
        <Calculator className="w-5 h-5" />
        <span className="hidden sm:inline">Рассчитать стоимость</span>
        <span className="sm:hidden">Расчёт</span>
      </button>

      {/* Wizard modal */}
      <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
        <DialogContent className="sm:max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <DialogTitle className="sr-only">Квиз-калькулятор</DialogTitle>
          <LeadWizard onClose={() => setWizardOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
