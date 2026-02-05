 import { motion } from "framer-motion";
 import { ArrowRight } from "lucide-react";
 import { HOW_WE_WORK } from "@/lib/constants";
 
 const HowWeWorkSection = () => {
   return (
     <section className="section-container relative" id="how-we-work">
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
 
       <div className="relative z-10">
         <div className="text-center mb-12">
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-5"
           >
             {HOW_WE_WORK.title}
           </motion.h2>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-muted-foreground max-w-2xl mx-auto"
           >
             От заявки до выдачи автомобиля — 4 простых шага
           </motion.p>
         </div>
 
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {HOW_WE_WORK.steps.map((step, index) => (
             <motion.div
               key={step.step}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.15 }}
               className="relative"
             >
               <div className="card-premium p-6 h-full">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-5 text-primary-foreground font-heading font-extrabold text-lg">
                   {step.step}
                 </div>
 
                 <h3 className="font-heading font-bold text-lg mb-2 text-foreground">
                   {step.title}
                 </h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                   {step.description}
                 </p>
               </div>
 
               {index < HOW_WE_WORK.steps.length - 1 && (
                 <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                   <ArrowRight className="w-6 h-6 text-primary/30" />
                 </div>
               )}
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default HowWeWorkSection;