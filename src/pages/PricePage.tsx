import { motion } from "framer-motion";
import { Shield, Volume2, Car, CircleDot, Lock, Check, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useService";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Volume2,
  Car,
  CircleDot,
  Lock,
};

const pricingDetails = {
  "okleyka-avto-poliuretanovoy-plenkoy-kazan": [
    { name: "Полная оклейка кузова", price: "от 150 000 ₽" },
    { name: "Капот", price: "от 15 000 ₽" },
    { name: "Передний бампер", price: "от 12 000 ₽" },
    { name: "Крылья (2 шт)", price: "от 18 000 ₽" },
    { name: "Зеркала (2 шт)", price: "от 5 000 ₽" },
    { name: "Фары (2 шт)", price: "от 8 000 ₽" },
    { name: "Пороги (2 шт)", price: "от 10 000 ₽" },
  ],
  "aktivnyy-vyhlop-kazan": [
    { name: "Комплект с установкой (1 заслонка)", price: "от 45 000 ₽" },
    { name: "Комплект с установкой (2 заслонки)", price: "от 65 000 ₽" },
    { name: "Пульт управления", price: "от 5 000 ₽" },
    { name: "Bluetooth модуль", price: "от 8 000 ₽" },
  ],
  "shumoizolyaciya-avto-kazan": [
    { name: "Комплексная шумоизоляция (эконом)", price: "от 45 000 ₽" },
    { name: "Комплексная шумоизоляция (стандарт)", price: "от 75 000 ₽" },
    { name: "Комплексная шумоизоляция (премиум)", price: "от 120 000 ₽" },
    { name: "Двери (4 шт)", price: "от 25 000 ₽" },
    { name: "Пол", price: "от 20 000 ₽" },
    { name: "Крыша", price: "от 15 000 ₽" },
    { name: "Багажник", price: "от 15 000 ₽" },
    { name: "Арки колёс", price: "от 12 000 ₽" },
  ],
  "udalenie-vmyatin-bez-pokraski-kazan": [
    { name: "Маленькая вмятина (до 3 см)", price: "от 3 000 ₽" },
    { name: "Средняя вмятина (3-7 см)", price: "от 5 000 ₽" },
    { name: "Большая вмятина (7-15 см)", price: "от 8 000 ₽" },
    { name: "Градовый ремонт", price: "индивидуально" },
  ],
  "ustanovka-signalizacii-pandora-kazan": [
    { name: "Pandora DX-90B с установкой", price: "от 35 000 ₽" },
    { name: "Pandora DX-91 с установкой", price: "от 45 000 ₽" },
    { name: "Pandora DXL 4950 с установкой", price: "от 55 000 ₽" },
    { name: "Pandora DXL 5000 New с установкой", price: "от 75 000 ₽" },
    { name: "Дополнительная метка", price: "от 5 000 ₽" },
  ],
};

const PricePage = () => {
  const { data: services, isLoading } = useServices();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Цены на услуги — SUNMAXKZN | Детейлинг в Казани"
        description="Актуальные цены на оклейку PPF, шумоизоляцию, активный выхлоп, PDR и установку Pandora в Казани. Прозрачное ценообразование для премиальных автомобилей."
        keywords={["цены детейлинг казань", "стоимость ppf казань", "цены шумоизоляция авто", "SUNMAXKZN прайс"]}
        canonicalUrl="https://sunmaxkzn.ru/price"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="hero-section pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="badge-premium">Прайс-лист</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-6"
              >
                Цены на услуги{" "}
                <span className="text-gradient">SUNMAXKZN</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Прозрачное ценообразование без скрытых платежей
              </motion.p>
            </div>
          </div>
        </section>

        {/* Prices Grid */}
        <section className="section-container">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Загрузка...</div>
          ) : (
            <div className="space-y-8">
              {services?.map((service, index) => {
                const IconComponent = iconMap[service.icon || "Shield"] || Shield;
                const prices = pricingDetails[service.slug as keyof typeof pricingDetails] || [];

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-gradient rounded-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-border">
                      <div className="flex items-center gap-4">
                        <div className="service-icon">
                          <IconComponent className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-xl md:text-2xl">
                            {service.title}
                          </h2>
                          <p className="text-muted-foreground text-sm">
                            {service.short_description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price List */}
                    <div className="p-6 md:p-8">
                      <div className="grid gap-3">
                        {prices.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-3 border-b border-border last:border-0"
                          >
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="font-bold text-primary">{item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Button asChild className="flex-1">
                          <a href={`/${service.slug}`}>
                            Подробнее об услуге
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                          <a href="/calculator">
                            Рассчитать для моего авто
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Note */}
        <section className="section-container pt-0">
          <div className="card-gradient rounded-2xl p-6 md:p-8">
            <h3 className="font-heading font-bold text-lg mb-4">Важная информация</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Цены указаны ориентировочно и зависят от марки и модели автомобиля</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Точную стоимость рассчитаем после осмотра автомобиля</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Предоставляем гарантию на все виды работ</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Возможна рассрочка без переплаты</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Получите точный расчёт
              </h2>
              <p className="text-muted-foreground mb-8">
                Отправьте марку и модель вашего авто — рассчитаем стоимость за 30 минут
              </p>
              <Button asChild size="lg" className="btn-glow">
                <a href="/calculator">
                  Рассчитать стоимость
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricePage;
