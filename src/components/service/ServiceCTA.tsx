import { motion } from "framer-motion";
import { Phone, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+79038687861";
const PHONE_DISPLAY = "+7 (903) 868-78-61";
const WHATSAPP_URL = `https://wa.me/79038687861?text=Здравствуйте! Интересует расчёт стоимости услуги.`;

interface ServiceCTAProps {
  serviceTitle: string;
  IconComponent?: React.ComponentType<{ className?: string }>;
}

const ServiceCTA = ({ serviceTitle, IconComponent }: ServiceCTAProps) => {
  return (
    <section className="section-container" id="zapis">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
        <div className="relative text-center max-w-2xl mx-auto">
          {IconComponent && (
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
              <IconComponent className="w-8 h-8 text-primary-foreground" />
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Готовы заказать {serviceTitle.toLowerCase()}?
          </h2>
          <p className="text-muted-foreground mb-2">
            Оставьте заявку и получите расчёт стоимости в течение 30 минут
          </p>
          <p className="text-sm text-primary mb-8">
            ✅ Перезвоним в течение 10–15 минут
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-glow">
              <a href="/calculator">
                Рассчитать стоимость
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="w-5 h-5 mr-2" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceCTA;
