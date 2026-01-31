import { motion } from "framer-motion";
import { Calculator, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(24_95%_53%/0.15)_0%,_transparent_60%)]" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        {/* Content */}
        <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg"
              style={{ boxShadow: "0 0 60px hsl(24 95% 53% / 0.4)" }}
            >
              <Calculator className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-6"
            >
              Рассчитайте стоимость{" "}
              <span className="text-gradient">бесплатно</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Оставьте заявку и получите точный расчёт стоимости работ для вашего автомобиля в течение 30 минут
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="btn-glow text-lg px-10 py-6">
                <Calculator className="w-5 h-5 mr-2" />
                Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                Позвонить
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground mt-6"
            >
              Ответим в течение 30 минут в рабочее время
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
