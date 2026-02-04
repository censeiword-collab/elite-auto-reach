import { motion } from "framer-motion";
import { ShieldCheck, Car, Sparkles, ThermometerSun } from "lucide-react";

interface ServiceSafetyBlockProps {
  serviceType?: "ppf" | "tint" | "vinyl" | "default";
}

const safetyData = {
  ppf: {
    title: "Безопасно для лакокрасочного покрытия",
    items: [
      { icon: <ShieldCheck className="w-5 h-5" />, text: "Не повреждает заводской лак при демонтаже" },
      { icon: <Car className="w-5 h-5" />, text: "Подходит для новых и б/у автомобилей" },
      { icon: <Sparkles className="w-5 h-5" />, text: "Самовосстанавливающаяся плёнка — царапины затягиваются от тепла" },
      { icon: <ThermometerSun className="w-5 h-5" />, text: "Защита от УФ-лучей, реагентов и песка" }
    ]
  },
  tint: {
    title: "Безопасность и комфорт",
    items: [
      { icon: <ShieldCheck className="w-5 h-5" />, text: "Пленка соответствует нормам ГИБДД (передние боковые ≥70%)" },
      { icon: <Car className="w-5 h-5" />, text: "Подходит для любых марок автомобилей" },
      { icon: <Sparkles className="w-5 h-5" />, text: "Защита салона от выгорания на 99%" },
      { icon: <ThermometerSun className="w-5 h-5" />, text: "Снижение температуры в салоне до 60%" }
    ]
  },
  vinyl: {
    title: "Безопасно для вашего авто",
    items: [
      { icon: <ShieldCheck className="w-5 h-5" />, text: "Легко снимается без повреждения ЛКП" },
      { icon: <Car className="w-5 h-5" />, text: "Сохраняет заводской цвет под плёнкой" },
      { icon: <Sparkles className="w-5 h-5" />, text: "Качественные материалы 3M, Avery, Hexis" },
      { icon: <ThermometerSun className="w-5 h-5" />, text: "Защита от мелких царапин и сколов" }
    ]
  },
  default: {
    title: "Безопасность работ гарантирована",
    items: [
      { icon: <ShieldCheck className="w-5 h-5" />, text: "Работаем аккуратно, без повреждений" },
      { icon: <Car className="w-5 h-5" />, text: "Подходит для всех марок автомобилей" },
      { icon: <Sparkles className="w-5 h-5" />, text: "Используем только оригинальные материалы" },
      { icon: <ThermometerSun className="w-5 h-5" />, text: "Сертифицированные специалисты" }
    ]
  }
};

const ServiceSafetyBlock = ({ serviceType = "default" }: ServiceSafetyBlockProps) => {
  const data = safetyData[serviceType];

  return (
    <section className="section-container bg-card/50 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            {data.title}
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {data.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border"
              >
                <div className="text-primary shrink-0">{item.icon}</div>
                <span className="text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSafetyBlock;
