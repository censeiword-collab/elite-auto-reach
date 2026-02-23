import { motion } from "framer-motion";
import { Shield, Volume2, CircleDot, Car, Lock, ArrowRight, Sparkles, Droplet, Palette, Layers, Scissors, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES_SEO_CONFIG, SERVICE_CATEGORIES, PRICING } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Volume2,
  CircleDot,
  Car,
  Lock,
  Sparkles,
  Droplet,
  Palette,
  Layers,
  Scissors,
  Star,
};

const getServiceIcon = (slug: string) => {
  const iconMapping: Record<string, string> = {
    "okleyka-avto-poliuretanovoy-plenkoy-kazan": "Shield",
    "tonirovka-avto-kazan": "Droplet",
    "okleyka-vinilom-kazan": "Palette",
    "antihrom-kazan": "Layers",
    "okleyka-salona-kazan": "Scissors",
    "snyatie-plenki-kazan": "Layers",
    "deteyling-kazan": "Sparkles",
    "aktivnyy-vyhlop-kazan": "Volume2",
    "shumoizolyaciya-avto-kazan": "Car",
    "udalenie-vmyatin-bez-pokraski-kazan": "CircleDot",
    "ustanovka-signalizacii-pandora-kazan": "Lock",
  };
  const iconName = iconMapping[slug] || "Star";
  return iconMap[iconName] || Star;
};

// Show top 6 services on homepage
const topServices = SERVICES_SEO_CONFIG.slice(0, 6);

const ServicesSection = ({ settings }: { settings?: Record<string, unknown> }) => {
  return (
    <section className="section-container relative" id="services">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Услуги SUNMAXKZN</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-5"
          >
            Премиальный сервис для
            <br />
            <span className="text-gradient">вашего автомобиля</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Защита, оклейка и тюнинг от мастеров с опытом работы 
            с автомобилями бизнес- и премиум-класса
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topServices.map((service, index) => {
            const IconComponent = getServiceIcon(service.slug);
            return (
              <motion.a
                key={service.slug}
                href={`/${service.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative rounded-xl overflow-hidden block"
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gradient-to-br from-card to-background border border-border/50 rounded-xl transition-all duration-500 group-hover:border-primary/30" />
                
                {/* Top gold line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mb-5 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-widest text-primary/70 font-medium mb-1">
                      {SERVICE_CATEGORIES[service.category].name}
                    </p>
                    <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">
                    {service.metaDescription.slice(0, 100)}...
                  </p>
                  
                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-5 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">от</p>
                      <p className="text-lg font-bold text-foreground">
                        {service.priceFrom ? PRICING.format(service.priceFrom) : "по запросу"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.warranty.display !== "—" && (
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          {service.warranty.display}
                        </span>
                      )}
                      <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base px-8 py-6 font-semibold border-border/50 hover:border-primary/50 hover:bg-primary/5"
            asChild
          >
            <a href="/services">
              Смотреть все услуги
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
