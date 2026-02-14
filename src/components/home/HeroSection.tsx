import { motion } from "framer-motion";
import { Shield, Award, Clock, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WARRANTY, MARKETING, BRAND } from "@/lib/constants";
import { UNIFIED_POSITIONING } from "@/lib/seo-config";

const stats = [
{ value: "8+", label: "лет опыта" },
{ value: "2500+", label: "автомобилей" },
{ value: WARRANTY.max.years.toString(), label: "лет гарантии" }];


const premiumBrands = MARKETING.premiumBrands;

const usps = [
{
  icon: Shield,
  title: "Защита высшего класса",
  description: "Плёнки премиум-сегмента — надёжная защита от сколов и царапин"
},
{
  icon: Award,
  title: "Безупречное качество",
  description: `Гарантия ${WARRANTY.max.display}. Каждая работа — эталон мастерства`
},
{
  icon: Clock,
  title: "Индивидуальный подход",
  description: "Персональный менеджер и удобное время для вашего визита"
}];


const HeroSection = () => {
  return (
    <section className="hero-section min-h-screen flex items-center pt-4 md:pt-0 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-right">
                <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide">
                  Студия детейлинга, оклейки и тюнинга
                </span>
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.1] mb-6">

              <span className="text-gradient">{BRAND.name}</span>
              <span className="text-foreground"> — </span>
              <span className="text-foreground">{UNIFIED_POSITIONING.short}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">

              Студия для автомобилей бизнес- и премиум-класса. 
              Профессиональная защита кузова, оклейка, тюнинг выхлопа, шумоизоляция 
              и установка охранных систем.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex gap-8 mb-10">

              {stats.map((stat, index) =>
              <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-extrabold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12">

              <Button asChild size="lg" className="btn-glow text-base px-8 py-6 font-semibold">
                <a href="/contacts">
                  Записаться в автостудию
                  <ChevronRight className="w-5 h-5 ml-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 font-semibold border-border/50 hover:border-primary/50">
                <a href="/cases">Наши работы</a>
              </Button>
            </motion.div>

            {/* Premium brands */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}>

              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                Работаем с брендами
              </p>
              <div className="flex flex-wrap gap-3">
                {premiumBrands.map((brand) =>
                <span
                  key={brand}
                  className="px-3 py-1.5 rounded bg-secondary/30 border border-border/50 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors cursor-default">

                    {brand}
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column - USP Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-5">

            {usps.map((usp, index) =>
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="card-premium p-6 group">

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                    <usp.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1.5 text-foreground">
                      {usp.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {usp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Trust indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-3 mt-2 px-2">

              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) =>
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-muted border-2 border-background" />

                )}
              </div>
              <div className="text-sm">
                <span className="text-foreground font-semibold">500+</span>
                <span className="text-muted-foreground"> довольных клиентов в этом году</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile USPs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-4 mt-12 lg:hidden">

          {usps.map((usp, index) =>
          <motion.div
            key={usp.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="card-premium p-5">

              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                <usp.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-base mb-1.5">{usp.title}</h3>
              <p className="text-muted-foreground text-sm">{usp.description}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

};

export default HeroSection;