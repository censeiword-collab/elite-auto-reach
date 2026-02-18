import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Calculator, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Button } from "@/components/ui/button";
import { getBrandBySlug } from "@/data/activeExhaustBrands";
import { getModelBySlug, type ExhaustModel } from "@/data/activeExhaustModels";
import { EXHAUST_BASE, formatPrice } from "@/data/activeExhaustUtils";
import { CONTACT } from "@/lib/constants";
import NotFound from "@/pages/NotFound";

const ActiveExhaustModelPage = ({ brandSlug, modelSlug }: { brandSlug: string; modelSlug: string }) => {
  const brand = getBrandBySlug(brandSlug);
  const model = getModelBySlug(modelSlug, brandSlug);
  if (!brand || !model) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={model.metaTitle}
        description={model.metaDescription}
        keywords={[`активный выхлоп ${brand.name} ${model.name} Казань`]}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}/${model.slug}`}
      />
      <Header />
      <main>
        <section className="hero-section pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to={EXHAUST_BASE} className="hover:text-foreground transition-colors">Активный выхлоп</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to={`${EXHAUST_BASE}/${brand.slug}`} className="hover:text-foreground transition-colors">{brand.name}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{model.name}</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight mb-6">
              {model.h1}
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-4 mb-8">
              <div className="px-4 py-2 bg-card rounded-xl border border-border">
                <span className="text-muted-foreground">Цена: </span>
                <span className="text-2xl font-bold text-primary">{formatPrice(model.priceFrom)}</span>
              </div>
              <div className="px-4 py-2 bg-card rounded-xl border border-border">
                <span className="text-muted-foreground">Двигатель: </span>
                <span className="font-semibold">{model.engine}</span>
              </div>
              <div className="px-4 py-2 bg-card rounded-xl border border-border">
                <span className="text-muted-foreground">Срок: </span>
                <span className="font-semibold">1–2 дня</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-glow text-lg px-8">
                <a href="/calculator"><Calculator className="w-5 h-5 mr-2" />Рассчитать стоимость</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <a href={`tel:${CONTACT.phone.raw}`}><Phone className="w-5 h-5 mr-2" />{CONTACT.phone.display}</a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        {model.features.length > 0 && (
          <section className="section-container">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Что входит в установку</h2>
              <div className="space-y-4">
                {model.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SEO text */}
        <section className="section-container border-t border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <p>
                Установка активного электронного выхлопа на {brand.name} {model.name} в Казани — студия SUNMAXKZN. Клапанная система позволяет управлять звуком двигателя {model.engine} с пульта или смартфона. Режимы Comfort, Sport и Race. Гарантия до 2 лет. Работаем по договору. Запишитесь на установку прямо сейчас.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ActiveExhaustModelPage;
