import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Button } from "@/components/ui/button";
import { getAreaBySlug } from "@/data/activeExhaustAreaPages";
import { getBrandBySlug } from "@/data/activeExhaustBrands";
import { getModelsByBrand } from "@/data/activeExhaustModels";
import { EXHAUST_BASE, formatPrice } from "@/data/activeExhaustUtils";
import { CONTACT } from "@/lib/constants";
import NotFound from "@/pages/NotFound";

const ActiveExhaustAreaBrandPage = () => {
  const { areaSlug, brandSlug } = useParams<{ areaSlug: string; brandSlug: string }>();
  const area = areaSlug ? getAreaBySlug(areaSlug) : undefined;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  if (!area || !brand) return <NotFound />;

  const models = getModelsByBrand(brand.slug);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Активный выхлоп на ${brand.name} — ${area.name} Казани | SUNMAXKZN`}
        description={`Установка активного выхлопа на ${brand.name} для жителей ${area.name} Казани. Студия SUNMAXKZN — рядом с вами. Гарантия до 2 лет.`}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}/kazan-${area.slug}/${brand.slug}`}
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
              <Link to={`${EXHAUST_BASE}/kazan`} className="hover:text-foreground transition-colors">Казань</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to={`${EXHAUST_BASE}/kazan-${area.slug}`} className="hover:text-foreground transition-colors">{area.name}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{brand.name}</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-heading font-black leading-tight mb-6">
              Активный выхлоп на {brand.name} — {area.name}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-4">
              Установка активного выхлопа на {brand.name} для жителей {area.name}. {area.description}
            </motion.p>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${CONTACT.phone.raw}`}><Phone className="w-5 h-5 mr-2" />{CONTACT.phone.display}</a>
            </Button>
          </div>
        </section>

        <section className="section-container">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Модели {brand.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {models.map((model) => (
                <Link key={model.slug} to={`${EXHAUST_BASE}/${model.slug}`} className="group p-5 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all">
                  <h3 className="font-heading font-semibold mb-1">{brand.name} {model.name}</h3>
                  <p className="text-sm text-muted-foreground">Двигатель: {model.engine}</p>
                  <p className="text-primary font-semibold mt-2">{formatPrice(model.priceFrom)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ActiveExhaustAreaBrandPage;
