import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, ChevronRight, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Button } from "@/components/ui/button";
import { EXHAUST_BRANDS } from "@/data/activeExhaustBrands";
import { EXHAUST_AREAS } from "@/data/activeExhaustAreaPages";
import { EXHAUST_BASE } from "@/data/activeExhaustUtils";
import { CONTACT } from "@/lib/constants";

const ActiveExhaustKazanPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Активный выхлоп в Казани — установка по районам | SUNMAXKZN"
        description="Установка активного электронного выхлопа в любом районе Казани. Студия SUNMAXKZN — удобное расположение. Все марки авто. Гарантия до 2 лет."
        keywords={["активный выхлоп Казань", "установка выхлопа Казань", "клапанный выхлоп Казань"]}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}/kazan`}
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
              <span className="text-foreground">Казань</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight mb-6">
              Активный выхлоп в Казани
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-4">
              Студия SUNMAXKZN — установка активного электронного выхлопа для жителей всех районов Казани.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-2 text-muted-foreground mb-8">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{CONTACT.address.full}</span>
            </motion.div>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${CONTACT.phone.raw}`}><Phone className="w-5 h-5 mr-2" />{CONTACT.phone.display}</a>
            </Button>
          </div>
        </section>

        {/* Areas */}
        <section className="section-container">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Районы Казани</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {EXHAUST_AREAS.map((area) => (
                <Link key={area.slug} to={`${EXHAUST_BASE}/kazan-${area.slug}`} className="group p-5 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all">
                  <MapPin className="w-5 h-5 text-primary mb-2" />
                  <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{area.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brands quick links */}
        <section className="section-container bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Марки автомобилей</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {EXHAUST_BRANDS.map((brand) => (
                <Link key={brand.slug} to={`${EXHAUST_BASE}/${brand.slug}`} className="px-4 py-2 bg-card border border-border rounded-full hover:border-primary/50 transition-all text-sm font-heading">
                  {brand.name}
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

export default ActiveExhaustKazanPage;
