 import { motion } from "framer-motion";
 import { Scissors, Sparkles, Award, Clock, Shield, Camera } from "lucide-react";
 import { WHY_SUNMAXKZN } from "@/lib/constants";
 
 const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
   Scissors,
   Sparkles,
   Award,
   Clock,
   Shield,
   Camera,
 };
 
 const WhyUsSection = () => {
   return (
     <section className="section-container relative" id="why-sunmaxkzn">
       <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
 
       <div className="relative z-10">
         <div className="text-center mb-12">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
           >
             <Award className="w-4 h-4 text-primary" />
             <span className="text-sm font-semibold text-primary tracking-wide">Преимущества</span>
           </motion.div>
 
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-5"
           >
             {WHY_SUNMAXKZN.title}
           </motion.h2>
         </div>
 
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {WHY_SUNMAXKZN.items.map((item, index) => {
             const IconComponent = iconMap[item.icon] || Award;
             return (
               <motion.div
                 key={item.title}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className="card-premium p-6 group"
               >
                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mb-5 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
                   <IconComponent className="w-6 h-6 text-primary" />
                 </div>
 
                 <h3 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                   {item.title}
                 </h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                   {item.description}
                 </p>
               </motion.div>
             );
           })}
         </div>
       </div>
     </section>
   );
 };
 
 export default WhyUsSection;