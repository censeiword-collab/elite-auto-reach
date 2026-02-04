import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Camera, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ServiceRelatedCasesProps {
  serviceSlug: string;
  serviceName: string;
}

const ServiceRelatedCases = ({ serviceSlug, serviceName }: ServiceRelatedCasesProps) => {
  const { data: cases = [] } = useQuery({
    queryKey: ["service-cases", serviceSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("service_slug", serviceSlug)
        .eq("is_active", true)
        .order("sort_order")
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!serviceSlug,
  });

  if (cases.length === 0) return null;

  return (
    <section className="section-container">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Примеры работ: {serviceName}
            </h2>
            <p className="text-muted-foreground mt-2">
              Реальные результаты на автомобилях наших клиентов
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <a href="/cases">
              Все работы
              <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => {
            const afterImages = Array.isArray(caseItem.after_images)
              ? caseItem.after_images
              : [];
            const beforeImages = Array.isArray(caseItem.before_images)
              ? caseItem.before_images
              : [];
            const mainImage = afterImages[0] || beforeImages[0];

            return (
              <motion.a
                key={caseItem.id}
                href="/cases"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block"
              >
                <div className="card-premium overflow-hidden">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {mainImage ? (
                      <img
                        src={mainImage as string}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                      {caseItem.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      {caseItem.car_brand && (
                        <span>{caseItem.car_brand} {caseItem.car_model}</span>
                      )}
                      {caseItem.work_duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {caseItem.work_duration}
                        </span>
                      )}
                    </div>

                    {/* What was done */}
                    {caseItem.result_text && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        <span className="text-primary">Результат:</span> {caseItem.result_text}
                      </p>
                    )}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <a href="/cases">
              Смотреть все работы
              <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceRelatedCases;
