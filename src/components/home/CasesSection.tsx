import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  {
    id: 1,
    title: "Porsche 911 — Полная оклейка PPF",
    description: "Защита всего кузова плёнкой XPEL Ultimate Plus",
    beforeImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    service: "PPF",
  },
  {
    id: 2,
    title: "BMW M5 — Активный выхлоп",
    description: "Установка электронных заслонок с управлением",
    beforeImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
    service: "Выхлоп",
  },
  {
    id: 3,
    title: "Mercedes S-Class — Шумоизоляция",
    description: "Комплексная шумоизоляция салона Premium",
    beforeImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    service: "Шумоизоляция",
  },
  {
    id: 4,
    title: "Audi RS6 — Удаление вмятин PDR",
    description: "Беспокрасочное удаление градовых повреждений",
    beforeImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    service: "PDR",
  },
];

const CasesSection = () => {
  return (
    <section className="section-container bg-secondary/20">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="badge-premium mb-4 inline-block"
        >
          Портфолио
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-4"
        >
          Наши работы{" "}
          <span className="text-gradient">до и после</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Реальные результаты работы нашей команды с премиальными автомобилями
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cases.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card-gradient rounded-2xl overflow-hidden group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={caseItem.afterImage}
                alt={caseItem.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Service Badge */}
              <span className="absolute top-4 left-4 badge-premium">
                {caseItem.service}
              </span>

              {/* Before/After Toggle Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs">
                <span className="text-muted-foreground">До</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span className="text-foreground font-medium">После</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {caseItem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {caseItem.description}
              </p>
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
        <Button size="lg" className="btn-glow text-lg px-8">
          Смотреть все работы
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </section>
  );
};

export default CasesSection;
