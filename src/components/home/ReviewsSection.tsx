import { motion } from "framer-motion";
import { Star, Quote, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Александр К.",
    car: "Porsche Cayenne",
    rating: 5,
    text: "Оклеили весь кузов плёнкой XPEL. Качество работы на высшем уровне! Никаких пузырей, стыки идеальные. Рекомендую всем владельцам премиальных авто.",
    service: "PPF",
    date: "2 недели назад",
  },
  {
    id: 2,
    name: "Михаил В.",
    car: "BMW M5 F90",
    rating: 5,
    text: "Установили активный выхлоп с заслонками. Теперь могу управлять звуком с телефона — в городе тихо, на трассе как настоящий М5! Мастера знают своё дело.",
    service: "Активный выхлоп",
    date: "1 месяц назад",
  },
  {
    id: 3,
    name: "Дмитрий С.",
    car: "Mercedes GLE",
    rating: 5,
    text: "Сделали полную шумоизоляцию. Разница колоссальная — теперь в салоне тишина как в S-классе. Материалы премиум, работа аккуратная.",
    service: "Шумоизоляция",
    date: "3 недели назад",
  },
  {
    id: 4,
    name: "Андрей П.",
    car: "Audi Q8",
    rating: 5,
    text: "После града была куча вмятин. Ребята убрали все без покраски за день! Кузов как новый, заводское ЛКП сохранено. Спасибо огромное!",
    service: "PDR",
    date: "1 неделю назад",
  },
];

const ReviewsSection = () => {
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

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card-gradient rounded-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.car}</p>
                </div>
              </div>
              <Quote className="w-8 h-8 text-primary/30" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Text */}
            <p className="text-muted-foreground leading-relaxed mb-4">
              {review.text}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {review.service}
              </span>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button size="lg" variant="outline" className="text-lg px-8">
          Все отзывы
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
