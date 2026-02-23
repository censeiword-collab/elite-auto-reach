import { motion } from "framer-motion";
import { Shield, FileText, Users, Package, MapPin, Award } from "lucide-react";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceTrustProps {
  warranty?: string;
  className?: string;
}

const ServiceTrust = ({ warranty = "до 10 лет", className = "" }: ServiceTrustProps) => {
  const trustItems: TrustItem[] = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: `Гарантия ${warranty}`,
      description: "Официальная гарантия на материалы и работу"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Работаем по договору",
      description: "Юридические гарантии для физ. и юр. лиц"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Опыт с 2018 года",
      description: "Более 2000 автомобилей обслужено"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Премиальные материалы",
      description: "SUNMAX — прозрачные, матовые (сатин) и цветной полиуретан"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Мы в Казани",
      description: "ул. Техническая, 122 — удобная локация"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Сертифицированные мастера",
      description: "Обучение и сертификация от производителя"
    }
  ];

  return (
    <section className={`section-container ${className}`} id="garantiya">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Почему клиенты выбирают <span className="text-gradient">SUNMAXKZN</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы не просто оказываем услуги — мы заботимся о вашем автомобиле как о своём
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-premium p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTrust;
