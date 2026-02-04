import { motion } from "framer-motion";
import { Shield, Volume2, CircleDot, Car, Lock, ArrowRight, Sparkles, Droplet, Palette, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Shield,
    title: "Защита кузова PPF",
    subtitle: "Полиуретановая плёнка",
    description: "Невидимая защита от сколов, царапин и химических реагентов. Премиальные плёнки XPEL, SunTek.",
    features: ["Полная оклейка кузова", "Защита капота и бампера", "Гарантия до 10 лет"],
    price: "от 15 000",
    href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan",
    featured: true,
  },
  {
    icon: Droplet,
    title: "Тонировка",
    subtitle: "Атермальная и классическая",
    description: "Тонировка стёкол плёнками 3M, LLumar, SunTek. Атермальная, зеркальная, хамелеон.",
    features: ["Атермальная плёнка", "Защита от ультрафиолета", "Любой процент затемнения"],
    price: "от 3 000",
    href: "/tonirovka-avto-kazan",
  },
  {
    icon: Palette,
    title: "Оклейка винилом",
    subtitle: "Смена цвета",
    description: "Полная и частичная оклейка виниловой плёнкой. Матовые, глянцевые, текстурные покрытия.",
    features: ["Смена цвета кузова", "Матовая оклейка", "Карбон, текстуры"],
    price: "от 80 000",
    href: "/okleyka-vinilom-kazan",
  },
  {
    icon: Layers,
    title: "Антихром",
    subtitle: "Оклейка хрома",
    description: "Оклейка хромированных деталей в чёрный или другой цвет. Решётка, молдинги, эмблемы.",
    features: ["Радиаторная решётка", "Молдинги и накладки", "Эмблемы и шильдики"],
    price: "от 5 000",
    href: "/antihrom-kazan",
  },
  {
    icon: Car,
    title: "Шумоизоляция",
    subtitle: "Комфорт премиум-класса",
    description: "Комплексная шумо- и виброизоляция салона материалами StP, Dynamat.",
    features: ["Полная шумоизоляция", "Виброизоляция дверей", "Акустический комфорт"],
    price: "от 25 000",
    href: "/shumoizolyaciya-avto-kazan",
  },
  {
    icon: Volume2,
    title: "Активный выхлоп",
    subtitle: "Управляемый звук",
    description: "Электронные заслонки для контроля звука выхлопа. Управление с пульта или смартфона.",
    features: ["Электронные заслонки", "Управление со смартфона", "Спортивный режим"],
    price: "от 45 000",
    href: "/aktivnyy-vyhlop-kazan",
  },
  {
    icon: CircleDot,
    title: "Удаление вмятин PDR",
    subtitle: "Без покраски",
    description: "Беспокрасочный ремонт вмятин с сохранением заводского лакокрасочного покрытия.",
    features: ["Без покраски", "Сохранение ЛКП", "Результат за 1 день"],
    price: "от 3 000",
    href: "/udalenie-vmyatin-bez-pokraski-kazan",
  },
  {
    icon: Lock,
    title: "Сигнализации Pandora",
    subtitle: "Охранные системы",
    description: "Премиальные системы безопасности с автозапуском, GPS-мониторингом и телематикой.",
    features: ["Автозапуск двигателя", "GPS-мониторинг", "Приложение на телефон"],
    price: "от 35 000",
    href: "/ustanovka-signalizacii-pandora-kazan",
  },
];

const ServicesSection = () => {
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
            Защита, тюнинг и комфорт от сертифицированных мастеров с опытом работы 
            с автомобилями премиум-класса
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`group relative rounded-xl overflow-hidden block ${
                service.featured ? 'md:row-span-2 lg:row-span-1' : ''
              }`}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-card to-background border border-border/50 rounded-xl transition-all duration-500 group-hover:border-primary/30" />
              
              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mb-5 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Title & Subtitle */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-primary/70 font-medium mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Стоимость</p>
                    <p className="text-lg font-bold text-foreground">
                      {service.price} <span className="text-sm font-normal text-muted-foreground">₽</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
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
            <a href="/price">
              Все услуги и цены
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
