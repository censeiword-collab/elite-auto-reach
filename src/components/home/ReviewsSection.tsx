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
      >
        <a
          href="https://yandex.ru/maps/org/sunmax_kzn/97524296927/?utm_medium=mapframe&utm_source=maps"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 left-0 text-xs text-muted-foreground z-10"
        >
          Sunmax-Kzn
        </a>
        <a
          href="https://yandex.ru/maps/43/kazan/category/car_wrapping/184074231588/?utm_medium=mapframe&utm_source=maps"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[14px] left-0 text-xs text-muted-foreground z-10"
        >
          Оклейка машин в Казани
        </a>
        <a
          href="https://yandex.ru/maps/43/kazan/category/tuning_studio/184105250/?utm_medium=mapframe&utm_source=maps"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[28px] left-0 text-xs text-muted-foreground z-10"
        >
          Студия тюнинга в Казани
        </a>
        <iframe
          className="relative w-full border-0"
          src="https://yandex.ru/map-widget/v1/org/sunmax_kzn/97524296927/reviews/?ll=49.127740%2C55.817396&utm_medium=s&utm_source=maps-reviews-widget&z=16"
          width="560"
          height="400"
          title="Отзывы SUNMAX на Яндекс Картах"
          loading="lazy"
          allowFullScreen
        />
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
