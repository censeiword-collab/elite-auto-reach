 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import SEOHead from "@/components/SEOHead";
 import MobileStickyCTA from "@/components/MobileStickyCTA";
 import { motion } from "framer-motion";
 import { Shield, Volume2, CircleDot, Car, Lock, ArrowRight, Sparkles, Droplet, Palette, Layers, Scissors, Star } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { SERVICES_SEO_CONFIG, SERVICE_CATEGORIES, PRICING, POSITIONING } from "@/lib/constants";
 import { useState } from "react";
 
 const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
   Shield,
   Volume2,
   CircleDot,
   Car,
   Lock,
   Sparkles,
   Droplet,
   Palette,
   Layers,
   Scissors,
   Star,
 };
 
 const getServiceIcon = (slug: string) => {
   const iconMapping: Record<string, string> = {
     "okleyka-avto-poliuretanovoy-plenkoy-kazan": "Shield",
     "tonirovka-avto-kazan": "Droplet",
     "okleyka-vinilom-kazan": "Palette",
     "antihrom-kazan": "Layers",
     "okleyka-salona-kazan": "Scissors",
     "snyatie-plenki-kazan": "Layers",
     "deteyling-kazan": "Sparkles",
     "aktivnyy-vyhlop-kazan": "Volume2",
     "shumoizolyaciya-avto-kazan": "Car",
     "udalenie-vmyatin-bez-pokraski-kazan": "CircleDot",
     "ustanovka-signalizacii-pandora-kazan": "Lock",
   };
   const iconName = iconMapping[slug] || "Star";
   return iconMap[iconName] || Star;
 };
 
 const ServicesPage = () => {
   const [activeCategory, setActiveCategory] = useState<string | null>(null);
 
   const categories = Object.entries(SERVICE_CATEGORIES).map(([key, value]) => ({
     key,
     ...value,
   }));
 
   const filteredServices = activeCategory
     ? SERVICES_SEO_CONFIG.filter((s) => s.category === activeCategory)
     : SERVICES_SEO_CONFIG;
 
   return (
     <div className="min-h-screen bg-background">
       <SEOHead
         title="SUNMAXKZN — Все услуги детейлинга и тюнинга в Казани"
         description="Каталог услуг SUNMAXKZN: оклейка PPF, винил, антихром, тонировка, детейлинг, шумоизоляция, активный выхлоп, PDR, сигнализации Pandora. Записаться онлайн."
         keywords={["услуги детейлинга Казань", "оклейка авто Казань", "тюнинг Казань"]}
         canonicalUrl="https://sunmaxkzn.ru/services"
       />
 
       <Header />
 
       <main className="pt-24 pb-16">
         <div className="container mx-auto px-4">
           {/* Hero */}
           <div className="text-center mb-12">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
             >
               <Sparkles className="w-4 h-4 text-primary" />
               <span className="text-sm font-semibold text-primary tracking-wide">
                 {POSITIONING.tagline}
               </span>
             </motion.div>
 
             <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-5"
             >
               Все услуги{" "}
               <span className="text-gradient">SUNMAXKZN</span>
             </motion.h1>
 
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-lg text-muted-foreground max-w-2xl mx-auto"
             >
               Защита, оклейка, детейлинг и тюнинг автомобилей в Казани. 
               Выберите категорию или просмотрите все услуги.
             </motion.p>
           </div>
 
           {/* Category Filters */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-wrap justify-center gap-3 mb-12"
           >
             <Button
               variant={activeCategory === null ? "default" : "outline"}
               onClick={() => setActiveCategory(null)}
               className="font-semibold"
             >
               Все услуги
             </Button>
             {categories.map((cat) => (
               <Button
                 key={cat.key}
                 variant={activeCategory === cat.key ? "default" : "outline"}
                 onClick={() => setActiveCategory(cat.key)}
                 className="font-semibold"
               >
                 {cat.name}
               </Button>
             ))}
           </motion.div>
 
           {/* Services Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredServices.map((service, index) => {
               const IconComponent = getServiceIcon(service.slug);
               return (
                 <motion.a
                   key={service.slug}
                   href={`/${service.slug}`}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + index * 0.05 }}
                   className="group card-premium p-6 block"
                 >
                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mb-5 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                     <IconComponent className="w-6 h-6 text-primary" />
                   </div>
 
                   <div className="mb-4">
                     <p className="text-xs uppercase tracking-widest text-primary/70 font-medium mb-1">
                       {SERVICE_CATEGORIES[service.category].name}
                     </p>
                     <h2 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                       {service.title}
                     </h2>
                   </div>
 
                   <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">
                     {service.metaDescription.slice(0, 120)}...
                   </p>
 
                   <div className="flex items-center justify-between pt-4 border-t border-border/50">
                     <div>
                       {service.priceFrom && (
                         <>
                           <p className="text-xs text-muted-foreground mb-0.5">от</p>
                           <p className="text-lg font-bold text-foreground">
                             {PRICING.format(service.priceFrom)}
                           </p>
                         </>
                       )}
                     </div>
                     <div className="flex items-center gap-3">
                       {service.warranty.display !== "—" && (
                         <span className="text-xs text-muted-foreground">
                           Гарантия {service.warranty.display}
                         </span>
                       )}
                       <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                         <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                       </div>
                     </div>
                   </div>
                 </motion.a>
               );
             })}
           </div>
 
           {/* CTA Section */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="text-center mt-16"
           >
             <div className="card-premium p-8 md:p-12 max-w-3xl mx-auto">
               <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                 Не нашли нужную услугу?
               </h2>
               <p className="text-muted-foreground mb-6">
                 Свяжитесь с нами — подберём решение под ваш автомобиль и задачу
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild size="lg" className="btn-glow font-semibold">
                   <a href="/contacts">Записаться на консультацию</a>
                 </Button>
                 <Button asChild size="lg" variant="outline" className="font-semibold">
                   <a href="/calculator">Рассчитать стоимость</a>
                 </Button>
               </div>
             </div>
           </motion.div>
         </div>
       </main>
 
       <MobileStickyCTA />
       <Footer />
     </div>
   );
 };
 
 export default ServicesPage;