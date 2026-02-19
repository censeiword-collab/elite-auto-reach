import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, ChevronRight, Phone, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Button } from "@/components/ui/button";
import { getBrandBySlug } from "@/data/activeExhaustBrands";
import { getModelsByBrand } from "@/data/activeExhaustModels";
import { EXHAUST_INFO_PAGES } from "@/data/activeExhaustInfoPages";
import { EXHAUST_BASE, formatPrice } from "@/data/activeExhaustUtils";
import { CONTACT } from "@/lib/constants";
import { localBusinessSchema, exhaustServiceSchema, brandBreadcrumbs } from "@/data/activeExhaustJsonLd";
import NotFound from "@/pages/NotFound";

const STEP = 18;

const ActiveExhaustBrandPage = ({ brandSlug }: { brandSlug: string }) => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(STEP);

  const brand = getBrandBySlug(brandSlug);
  const allModels = useMemo(() => getModelsByBrand(brandSlug), [brandSlug]);

  if (!brand) return <NotFound />;

  const filtered = search.trim()
    ? allModels.filter((m) => {
        const q = search.toLowerCase();
        return m.name.toLowerCase().includes(q) || m.nameRu.toLowerCase().includes(q);
      })
    : allModels;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={brand.metaTitle}
        description={brand.metaDescription}
        keywords={[`активный выхлоп ${brand.name} Казань`, `выхлоп ${brand.nameRu} Казань`]}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}/${brand.slug}`}
        jsonLd={[localBusinessSchema(), exhaustServiceSchema(), brandBreadcrumbs(brand.name, brand.slug)]}
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
              <span className="text-foreground">{brand.name}</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight mb-6">
              {brand.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-8">
              {brand.description}
            </motion.p>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${CONTACT.phone.raw}`}><Phone className="w-5 h-5 mr-2" />{CONTACT.phone.display}</a>
            </Button>
          </div>
        </section>

        {/* Info pages links */}
        <section className="section-container bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-heading font-bold mb-4 text-center">Полезная информация</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {EXHAUST_INFO_PAGES.map((page) => (
                <Link key={page.slug} to={`${EXHAUST_BASE}/${page.slug}`} className="px-4 py-2 bg-card border border-border rounded-full hover:border-primary/50 transition-all text-sm font-heading">
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Models */}
        <section className="section-container">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">Модели {brand.name}</h2>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(STEP); }}
                  placeholder="Найти модель..."
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map((model) => (
                <Link key={model.slug} to={`${EXHAUST_BASE}/${model.slug}`} className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all">
                  <Volume2 className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-1">{brand.name} {model.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Двигатель: {model.engine}</p>
                  <p className="text-primary font-semibold">{formatPrice(model.priceFrom)}</p>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2">Подробнее <ChevronRight className="w-3 h-3" /></span>
                </Link>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground mt-8">Модель не найдена.</p>
            )}
            {hasMore && (
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => setVisibleCount((c) => c + STEP)}>
                  Показать ещё
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ActiveExhaustBrandPage;
