import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ServiceBenefitsProps {
  features: string[];
  title?: string;
}

const ServiceBenefits = ({ features, title = "Что вы получаете" }: ServiceBenefitsProps) => {
  if (features.length === 0) return null;

  return (
    <section className="section-container bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;
