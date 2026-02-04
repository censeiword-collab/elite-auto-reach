import { useLocation } from "react-router-dom";
import { Shield, Volume2, Car, CircleDot, Lock, Palette, Droplet, Layers, Sun, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyСTA";
import { Button } from "@/components/ui/button";
import { useService } from "@/hooks/useService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Service page components
import ServiceHero from "@/components/service/ServiceHero";
import ServiceBenefits from "@/components/service/ServiceBenefits";
import ServiceTrust from "@/components/service/ServiceTrust";
import ServiceSafetyBlock from "@/components/service/ServiceSafetyBlock";
import ServiceCarsBlock from "@/components/service/ServiceCarsBlock";
import ServiceCTA from "@/components/service/ServiceCTA";
import ServiceLocalSEO from "@/components/service/ServiceLocalSEO";
import ServiceRelatedCases from "@/components/service/ServiceRelatedCases";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Volume2,
  Car,
  CircleDot,
  Lock,
  Palette,
  Droplet,
  Layers,
  Sun,
  Wrench,
};

const getServiceType = (slug: string): "ppf" | "tint" | "vinyl" | "default" => {
  if (slug.includes("poliuretan") || slug.includes("ppf") || slug.includes("plenk")) return "ppf";
  if (slug.includes("tonirov")) return "tint";
  if (slug.includes("vinil") || slug.includes("antihrom")) return "vinyl";
  return "default";
};

const getWarranty = (slug: string): string => {
  if (slug.includes("poliuretan") || slug.includes("ppf")) return "до 10 лет";
  if (slug.includes("tonirov")) return "5 лет";
  if (slug.includes("vinil")) return "до 5 лет";
  if (slug.includes("shumoiz")) return "3 года";
  return "до 3 лет";
};

const ServicePage = () => {
  const location = useLocation();
  const slug = location.pathname.replace("/", "");
  const { data: service, isLoading, error } = useService(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Услуга не найдена</h1>
          <p className="text-muted-foreground mb-8">Запрашиваемая страница не существует</p>
          <Button asChild>
            <a href="/">На главную</a>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = iconMap[service.icon || "Shield"] || Shield;
  const features = Array.isArray(service.features) ? (service.features as string[]) : [];
  const faq = Array.isArray(service.faq) ? (service.faq as { q: string; a: string }[]) : [];
  const serviceType = getServiceType(slug);
  const warranty = getWarranty(slug);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={service.meta_title || `${service.title} в Казани | SUNMAXKZN`}
        description={service.meta_description || service.short_description || ""}
        keywords={service.meta_keywords || undefined}
      />
      
      <Header />
      
      <main>
        {/* Hero Section with improved CTAs */}
        <ServiceHero service={service} IconComponent={IconComponent} />

        {/* What you get */}
        <ServiceBenefits features={features} title="Что вы получаете" />

        {/* Safety block */}
        <ServiceSafetyBlock serviceType={serviceType} />

        {/* Trust section with guarantee anchor */}
        <ServiceTrust warranty={warranty} />

        {/* Related cases from portfolio */}
        <ServiceRelatedCases serviceSlug={slug} serviceName={service.title} />

        {/* Supported cars */}
        <ServiceCarsBlock />

        {/* Description Section */}
        {service.full_description && (
          <section className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
                Подробнее об услуге
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {service.full_description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section with anchor for ads */}
        {faq.length > 0 && (
          <section className="section-container bg-secondary/20" id="voprosy">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                Вопросы клиентов
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faq.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border rounded-xl px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* SEO Text Section with hidden anchor */}
        {service.seo_text && (
          <section className="section-container border-t border-border" id="cena">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                <p>{service.seo_text}</p>
              </div>
            </div>
          </section>
        )}

        {/* Local SEO block */}
        <ServiceLocalSEO serviceName={service.title} />

        {/* CTA Section with anchors */}
        <ServiceCTA serviceTitle={service.title} IconComponent={IconComponent} />
      </main>

      <Footer />
      
      {/* Mobile sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
};

export default ServicePage;
