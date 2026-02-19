import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Button } from "@/components/ui/button";
import { getAreaBySlug } from "@/data/activeExhaustAreaPages";
import { getPopularBrands } from "@/data/activeExhaustBrands";
import { EXHAUST_BASE } from "@/data/activeExhaustUtils";
import { CONTACT } from "@/lib/constants";
import NotFound from "@/pages/NotFound";

interface Props {
  areaSlugOverride?: string;
}

const ActiveExhaustAreaPage = ({ areaSlugOverride }: Props = {}) => {
  const { areaSlug: paramSlug } = useParams<{ areaSlug: string }>();
  const slug = areaSlugOverride || paramSlug;
  const area = slug ? getAreaBySlug(slug) : undefined;
  if (!area) return <NotFound />;

  const topBrands = getPopularBrands();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={area.metaTitle}
        description={area.metaDescription}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}/kazan-${area.slug}`}
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
              <span className="text-foreground">{area.name}</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-heading font-black leading-tight mb-6">
              {area.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground mb-4">
              {area.description}
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

        {/* Top brands in this area */}
        <section className="section-container">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Популярные марки</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {topBrands.map((brand) => (
                <Link key={brand.slug} to={`${EXHAUST_BASE}/kazan-${area.slug}/${brand.slug}`} className="group p-5 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all text-center">
                  <Volume2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="font-heading font-semibold">{brand.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Kazan */}
        <section className="section-container bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <Link to={`${EXHAUST_BASE}/kazan`} className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all font-heading font-semibold">
              <MapPin className="w-4 h-4 text-primary" />
              Все районы Казани
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ActiveExhaustAreaPage;
