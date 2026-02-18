import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import MarkdownLite from "@/components/MarkdownLite";
import { getInfoPageBySlug } from "@/data/activeExhaustInfoPages";
import { EXHAUST_BASE } from "@/data/activeExhaustUtils";
import NotFound from "@/pages/NotFound";

const ActiveExhaustInfoPage = () => {
  const slug = window.location.pathname.replace(`${EXHAUST_BASE}/`, "");
  const page = getInfoPageBySlug(slug);
  if (!page) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={page.metaTitle}
        description={page.metaDescription}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}/${page.slug}`}
      />
      <Header />
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to={EXHAUST_BASE} className="hover:text-foreground transition-colors">Активный выхлоп</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{page.title}</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-heading font-black leading-tight mb-8">
              {page.h1}
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <MarkdownLite content={page.content} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ActiveExhaustInfoPage;
