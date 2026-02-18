import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, ChevronRight, Phone, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import SchemaOrg from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";
import { EXHAUST_BRANDS, getPopularBrands } from "@/data/activeExhaustBrands";
import { EXHAUST_INFO_PAGES } from "@/data/activeExhaustInfoPages";
import { EXHAUST_AREAS } from "@/data/activeExhaustAreaPages";
import { EXHAUST_BASE } from "@/data/activeExhaustUtils";
import { CONTACT, BRAND } from "@/lib/constants";

const ActiveExhaustHubPage = () => {
  const popularBrands = getPopularBrands();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Активный электронный выхлоп в Казани — установка, цена | SUNMAXKZN"
        description="Установка активного электронного выхлопа в Казани. Управляемый звук двигателя для BMW, Mercedes, Audi, Toyota, Porsche. Гарантия до 2 лет. Запись онлайн."
        keywords={["активный выхлоп Казань", "электронный выхлоп Казань", "управляемый выхлоп", "клапанный выхлоп", "установка выхлопа Казань"]}
        canonicalUrl={`https://sunmaxkzn.ru${EXHAUST_BASE}`}
      />
      <SchemaOrg
        type="Service"
        data={{
          name: "Активный электронный выхлоп",
          description: "Установка активного электронного выхлопа с управляемым звуком в Казани",
          provider: BRAND.name,
          areaServed: "Казань",
          price: "25000",
        }}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="hero-section pt-32 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
                <span className="badge-premium">Тюнинг</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight mb-6">
                Активный электронный выхлоп в Казани
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground mb-8">
                Управляйте звуком двигателя со смартфона или пульта. Спортивный рёв на трассе, тишина в городе — один автомобиль, любой режим.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-glow text-lg px-8">
                  <a href="/calculator"><Calculator className="w-5 h-5 mr-2" />Рассчитать стоимость</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8">
                  <a href={`tel:${CONTACT.phone.raw}`}><Phone className="w-5 h-5 mr-2" />{CONTACT.phone.display}</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular brands */}
        <section className="section-container">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Выберите марку автомобиля</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {EXHAUST_BRANDS.map((brand) => (
                <Link key={brand.slug} to={`${EXHAUST_BASE}/${brand.slug}`} className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all text-center">
                  <Volume2 className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-heading font-semibold block">{brand.name}</span>
                  <span className="text-sm text-muted-foreground">{brand.models.length} моделей</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Info pages */}
        <section className="section-container bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Полезная информация</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXHAUST_INFO_PAGES.map((page) => (
                <Link key={page.slug} to={`${EXHAUST_BASE}/${page.slug}`} className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all">
                  <h3 className="font-heading font-semibold mb-2 group-hover:text-primary transition-colors">{page.title}</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">Подробнее <ChevronRight className="w-4 h-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Geo pages */}
        <section className="section-container">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Активный выхлоп по районам Казани</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <Link to={`${EXHAUST_BASE}/kazan`} className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all font-heading font-semibold text-center">
                Вся Казань
              </Link>
              {EXHAUST_AREAS.map((area) => (
                <Link key={area.slug} to={`${EXHAUST_BASE}/kazan-${area.slug}`} className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all text-center text-sm text-muted-foreground hover:text-foreground">
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO text */}
        <section className="section-container border-t border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <p>
                Активный электронный выхлоп — это система управления звуком двигателя с помощью электронных клапанов, встроенных в выхлопную систему. В студии SUNMAXKZN в Казани мы устанавливаем клапанные системы на автомобили всех марок: BMW, Mercedes-Benz, Audi, Toyota, Lexus, Porsche, Land Rover и другие.
              </p>
              <p>
                Система позволяет переключаться между режимами Comfort, Sport и Race одним нажатием — с пульта или со смартфона. Off-режим делает автомобиль тише заводского. Установка занимает 1–2 дня, гарантия — до 2 лет. Заводская гарантия на автомобиль сохраняется.
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

export default ActiveExhaustHubPage;
