import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+79038687861";
const PHONE_DISPLAY = "+7 (903) 868-78-61";

interface ServiceLocalSEOProps {
  serviceName: string;
}

const ServiceLocalSEO = ({ serviceName }: ServiceLocalSEOProps) => {
  return (
    <section className="section-container bg-secondary/30 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
            {serviceName} в <span className="text-gradient">Казани</span>
          </h2>
          
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-bold text-lg mb-4">
                  Автостудия SUNMAXKZN
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">г. Казань, ул. Техническая, 122</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <a 
                        href={`tel:${PHONE_NUMBER}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Режим работы</p>
                      <p className="text-muted-foreground">Пн–Сб: 9:00 – 20:00</p>
                      <p className="text-muted-foreground">Вс: по записи</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="mt-6" variant="outline">
                  <a 
                    href="https://yandex.ru/maps/-/CDsQvS0u" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Построить маршрут
                  </a>
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg">
                  Удобное расположение
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Рядом с центром Казани</li>
                  <li>• Бесплатная парковка для клиентов</li>
                  <li>• Удобный подъезд для любых авто</li>
                  <li>• Зона ожидания с Wi-Fi</li>
                </ul>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Ищете <strong>{serviceName.toLowerCase()}</strong> в Казани? 
                    SUNMAXKZN — это качественные услуги по защите и стайлингу автомобилей 
                    с гарантией результата.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceLocalSEO;
