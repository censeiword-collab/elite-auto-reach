import { motion } from "framer-motion";
import { Phone, Calculator, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/hooks/useService";
import { CONTACT, CITY, getPhoneLink } from "@/lib/constants";

interface ServiceHeroProps {
  service: Service;
  IconComponent: React.ComponentType<{ className?: string }>;
}

const ServiceHero = ({ service, IconComponent }: ServiceHeroProps) => {
  return (
    <section className="hero-section pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="badge-premium">Услуга</span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              {CITY.name}
            </span>
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

          {/* Price + Timing badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {service.price_from && (
              <div className="flex items-baseline gap-2 px-4 py-2 bg-card rounded-xl border border-border">
                <span className="text-muted-foreground">Цена:</span>
                <span className="text-2xl font-bold text-primary">
                  от {service.price_from.toLocaleString()} ₽
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Срок: 1-3 дня</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="btn-glow text-lg px-8">
              <a href="/calculator">
                <Calculator className="w-5 h-5 mr-2" />
                Рассчитать за 1 минуту
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <a href={getPhoneLink()}>
                <Phone className="w-5 h-5 mr-2" />
                {CONTACT.phone.display}
              </a>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            ✅ Перезвоним в течение 10–15 минут • Работаем по договору
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
