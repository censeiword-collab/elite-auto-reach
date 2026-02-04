import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Clock, ChevronRight, Filter, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaOrg, { sunmaxBusinessData } from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const SERVICE_FILTERS = [
  { slug: null, label: "Все работы" },
  { slug: "okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Защита PPF" },
  { slug: "tonirovka-avto-kazan", label: "Тонировка" },
  { slug: "okleyka-vinilom-kazan", label: "Винил / Смена цвета" },
  { slug: "antihrom-kazan", label: "Антихром" },
  { slug: "shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
  { slug: "aktivnyy-vyhlop-kazan", label: "Активный выхлоп" },
  { slug: "udalenie-vmyatin-bez-pokraski-kazan", label: "PDR" },
  { slug: "ustanovka-signalizacii-pandora-kazan", label: "Pandora" },
  { slug: "deteyling-kazan", label: "Детейлинг" },
];

const CasesPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const { data: cases = [], isLoading } = useQuery({
    queryKey: ["public-cases", activeFilter],
    queryFn: async () => {
      let query = supabase
        .from("cases")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (activeFilter) {
        query = query.eq("service_slug", activeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getServiceLabel = (slug: string | null) => {
    return SERVICE_FILTERS.find((f) => f.slug === slug)?.label || slug;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Кейсы и примеры работ — SUNMAXKZN | Детейлинг в Казани"
        description="Портфолио выполненных работ автостудии SUNMAXKZN в Казани. Фото до и после оклейки PPF, установки активного выхлопа, шумоизоляции и PDR на премиальных автомобилях."
        keywords={["кейсы детейлинг казань", "примеры работ ppf", "фото до после оклейка"]}
      />
      <SchemaOrg type="LocalBusiness" data={sunmaxBusinessData} />
      <SchemaOrg
        type="Breadcrumb"
        data={[
          { name: "Главная", url: "https://sunmaxkzn.ru" },
          { name: "Кейсы", url: "https://sunmaxkzn.ru/cases" },
        ]}
      />

      <Header />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="badge-premium mb-4 inline-block">Наши работы</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4">
              Кейсы <span className="text-gradient">SUNMAXKZN</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Реальные примеры работ на автомобилях премиум-класса. Фотографии до и после,
              описание процесса и использованных материалов.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {SERVICE_FILTERS.map((filter) => (
              <Button
                key={filter.slug || "all"}
                variant={activeFilter === filter.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.slug)}
                className={
                  activeFilter === filter.slug
                    ? "btn-glow"
                    : "border-border/50 hover:border-primary/50"
                }
              >
                {filter.slug === null && <Filter className="w-4 h-4 mr-2" />}
                {filter.label}
              </Button>
            ))}
          </motion.div>

          {/* Cases Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl bg-secondary/50 animate-pulse"
                />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Кейсы скоро появятся</p>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {cases.map((caseItem, index) => {
                  const beforeImages = Array.isArray(caseItem.before_images)
                    ? caseItem.before_images
                    : [];
                  const afterImages = Array.isArray(caseItem.after_images)
                    ? caseItem.after_images
                    : [];
                  const mainImage = afterImages[0] || beforeImages[0];

                  return (
                    <motion.div
                      key={caseItem.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      <div className="card-premium overflow-hidden">
                        {/* Image */}
                        <div className="aspect-[4/3] relative overflow-hidden">
                          {mainImage ? (
                            <img
                              src={mainImage as string}
                              alt={caseItem.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                              <Camera className="w-12 h-12 text-muted-foreground/50" />
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Service badge */}
                          {caseItem.service_slug && (
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                              {getServiceLabel(caseItem.service_slug)}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {caseItem.title}
                          </h3>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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

                          {caseItem.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {caseItem.description}
                            </p>
                          )}

                          <div className="flex items-center text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                            Подробнее
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      {/* Case Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
                <h2 className="font-heading font-bold text-xl">{selectedCase.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCase(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Before/After images */}
                {(selectedCase.before_images?.length > 0 ||
                  selectedCase.after_images?.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCase.before_images?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">До</h3>
                        <div className="grid gap-2">
                          {(selectedCase.before_images as string[]).map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${selectedCase.title} до ${i + 1}`}
                              className="w-full rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedCase.after_images?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">После</h3>
                        <div className="grid gap-2">
                          {(selectedCase.after_images as string[]).map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${selectedCase.title} после ${i + 1}`}
                              className="w-full rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                {selectedCase.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Описание</h3>
                    <p className="text-muted-foreground">{selectedCase.description}</p>
                  </div>
                )}

                {/* Result */}
                {selectedCase.result_text && (
                  <div>
                    <h3 className="font-semibold mb-2">Результат</h3>
                    <p className="text-muted-foreground">{selectedCase.result_text}</p>
                  </div>
                )}

                {/* Materials */}
                {selectedCase.materials_used?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Использованные материалы</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.materials_used.map((material: string) => (
                        <span
                          key={material}
                          className="px-3 py-1 rounded-full bg-secondary text-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CasesPage;
