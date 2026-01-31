import { motion } from "framer-motion";
import { Shield, Volume2, CircleDot, Car, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Shield,
    title: "Оклейка полиуретановой плёнкой (PPF)",
    description: "Защита кузова от сколов, царапин и реагентов. Плёнки XPEL, SunTek с гарантией до 10 лет.",
    features: ["Полная оклейка кузова", "Защита капота и бампера", "Антигравийная плёнка"],
    price: "от 15 000 ₽",
    href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan",
  },
  {
    icon: Volume2,
    title: "Установка активного выхлопа",
    description: "Управляемый звук двигателя с пульта или смартфона. Электронные заслонки для любых авто.",
    features: ["Электронные заслонки", "Управление со смартфона", "Спортивный звук"],
    price: "от 45 000 ₽",
    href: "/aktivnyy-vyhlop-kazan",
  },
  {
    icon: Car,
    title: "Шумоизоляция автомобиля",
    description: "Комплексная шумоизоляция салона материалами StP, Dynamat. Тишина премиум-класса.",
    features: ["Полная шумоизоляция", "Виброизоляция", "Теплоизоляция"],
    price: "от 25 000 ₽",
    href: "/shumoizolyaciya-avto-kazan",
  },
  {
    icon: CircleDot,
    title: "Удаление вмятин без покраски (PDR)",
    description: "Беспокрасочный ремонт вмятин от града и парковочных повреждений. Сохранение заводского ЛКП.",
    features: ["Без покраски", "Сохранение ЛКП", "Ремонт за 1 день"],
    price: "от 3 000 ₽",
    href: "/udalenie-vmyatin-bez-pokraski-kazan",
  },
  {
    icon: Lock,
    title: "Установка Pandora с автозапуском",
    description: "Премиальные охранные системы Pandora с автозапуском, GPS-мониторингом и управлением со смартфона.",
    features: ["Автозапуск", "GPS-мониторинг", "Управление с телефона"],
    price: "от 35 000 ₽",
    href: "/ustanovka-signalizacii-pandora-kazan",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-container" id="services">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="badge-premium mb-4 inline-block"
        >
          Наши услуги
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-4"
        >
          Премиальные услуги для{" "}
          <span className="text-gradient">вашего автомобиля</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Профессиональный детейлинг, защита и тюнинг от сертифицированных мастеров
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.a
            key={service.title}
            href={service.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card-gradient rounded-2xl p-6 group cursor-pointer block"
          >
            <div className="service-icon mb-5">
              <service.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            
            <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {service.description}
            </p>
            
            <ul className="space-y-2 mb-6">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-lg font-bold text-primary">{service.price}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Подробнее
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button size="lg" variant="outline" className="text-lg px-8">
          Все услуги и цены
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
