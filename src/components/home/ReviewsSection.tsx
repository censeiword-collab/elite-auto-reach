import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReviewsSection = ({ settings }: { settings?: Record<string, unknown> }) => {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="badge-premium mb-4 inline-block"
        >
          Отзывы клиентов
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-4"
        >
          Нам доверяют владельцы{" "}
          <span className="text-gradient">премиальных авто</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Более 500 довольных клиентов и 98% положительных отзывов
        </motion.p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {[
          { value: "500+", label: "Довольных клиентов" },
          { value: "98%", label: "Положительных отзывов" },
          { value: "7", label: "Лет на рынке" },
          { value: "4.9", label: "Рейтинг на Яндекс" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 rounded-xl bg-secondary/30 border border-border"
          >
            <div className="stats-number mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Yandex Maps Reviews Widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto w-full max-w-[560px] overflow-hidden"
        style={{ height: 800 }}
      >
        <iframe
          className="w-full h-full border border-border rounded-lg box-border"
          src="https://yandex.ru/maps-reviews-widget/97524296927?comments"
          title="Отзывы SUNMAX на Яндекс Картах"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a
          href="https://yandex.ru/maps/org/sunmax_kzn/97524296927/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 left-0 w-full text-center text-[10px] text-muted-foreground truncate px-4 box-border"
          style={{ fontFamily: "YS Text, sans-serif", maxHeight: 14 }}
        >
          Sunmax-Kzn на карте Казани — Яндекс Карты
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="https://yandex.ru/maps/org/97524296927"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" variant="outline" className="text-lg px-8">
            Все отзывы на Яндекс Картах
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </a>
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
