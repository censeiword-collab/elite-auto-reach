import { motion } from "framer-motion";

const carBrands = [
  "Mercedes-Benz", "BMW", "Audi", "Porsche", "Lexus", "Toyota",
  "Land Rover", "Volkswagen", "Volvo", "Genesis", "Infiniti", "Cadillac"
];

interface ServiceCarsBlockProps {
  title?: string;
}

const ServiceCarsBlock = ({ title = "Для каких автомобилей подходит" }: ServiceCarsBlockProps) => {
  return (
    <section className="section-container">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground mb-8">
            Работаем с любыми марками — от массовых до эксклюзивных
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {carBrands.map((brand, index) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium hover:border-primary/50 transition-colors cursor-default"
              >
                {brand}
              </motion.span>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Не нашли свою марку? Свяжитесь с нами — работаем с любыми автомобилями!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCarsBlock;
