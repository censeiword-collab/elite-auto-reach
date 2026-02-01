import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Volume2, Car, CircleDot, Lock, Check, ChevronRight, Phone, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useService } from "@/hooks/useService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Volume2,
  Car,
  CircleDot,
  Lock,
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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={service.meta_title || service.title}
        description={service.meta_description || service.short_description || ""}
        keywords={service.meta_keywords || undefined}
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section pt-32 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="badge-premium">Услуга</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight mb-6"
              >
                {service.h1 || service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8"
              >
                {service.short_description}
              </motion.p>

              {service.price_from && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-baseline gap-2 mb-8"
                >
                  <span className="text-muted-foreground">Цена:</span>
                  <span className="text-3xl font-bold text-primary">
                    от {service.price_from.toLocaleString()} {service.price_unit}
                  </span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="btn-glow text-lg px-8">
                  <a href="/calculator">
                    <Calculator className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8">
                  <a href="tel:+78435553535">
                    <Phone className="w-5 h-5 mr-2" />
                    Позвонить
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section className="section-container bg-secondary/20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                Что включено
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Description Section */}
        {service.full_description && (
          <section className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {service.full_description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faq.length > 0 && (
          <section className="section-container bg-secondary/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                Часто задаваемые вопросы
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

        {/* SEO Text Section */}
        {service.seo_text && (
          <section className="section-container border-t border-border">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
                <p>{service.seo_text}</p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
            <div className="relative text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                <IconComponent className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Готовы заказать {service.title.toLowerCase()}?
              </h2>
              <p className="text-muted-foreground mb-8">
                Оставьте заявку и получите расчёт стоимости в течение 30 минут
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-glow">
                  <a href="/calculator">
                    Рассчитать стоимость
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:+78435553535">
                    <Phone className="w-5 h-5 mr-2" />
                    +7 (843) 555-35-35
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
