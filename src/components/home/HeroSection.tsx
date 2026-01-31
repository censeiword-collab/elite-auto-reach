import { motion } from "framer-motion";
import { Shield, Award, Wrench, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const brands = ["Porsche", "BMW", "Mercedes", "Audi", "Lexus", "Land Rover", "Jaguar"];

const usps = [
  {
    icon: Shield,
    title: "Премиум бренды",
    description: "Работаем с Porsche, BMW, Mercedes, Audi, Lexus",
  },
  {
    icon: Award,
    title: "Гарантия качества",
    description: "До 10 лет гарантии на материалы и работу",
  },
  {
    icon: Wrench,
    title: "Профессиональные материалы",
    description: "XPEL, SunTek, Hexis, Dynamat, StP",
  },
];

const HeroSection = () => {
  return (
    <section className="hero-section min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="badge-premium">
              Премиальный автосервис
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-tight mb-6"
          >
            Премиальный автосервис в Казани —{" "}
            <span className="text-gradient">защита, тюнинг и комфорт</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Оклейка PPF, активный выхлоп, шумоизоляция, PDR, Pandora
          </motion.p>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {brands.map((brand) => (
              <span
                key={brand}
                className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium text-muted-foreground"
              >
                {brand}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button size="lg" className="btn-glow text-lg px-8 py-6">
              Рассчитать стоимость
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Смотреть портфолио
            </Button>
          </motion.div>

          {/* USPs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {usps.map((usp, index) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="card-gradient rounded-xl p-6"
              >
                <div className="service-icon mb-4">
                  <usp.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{usp.title}</h3>
                <p className="text-muted-foreground text-sm">{usp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
