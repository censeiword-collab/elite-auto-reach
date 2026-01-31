import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/calculator/PriceCalculator";
import SEOHead from "@/components/SEOHead";

const CalculatorPage = () => {
  return (
    <>
      <SEOHead
        title="Онлайн-калькулятор стоимости | SUNMAXKZN"
        description="Рассчитайте стоимость оклейки PPF, шумоизоляции, активного выхлопа и других услуг для вашего автомобиля. Мгновенный расчёт онлайн."
        keywords={["калькулятор", "расчёт стоимости", "оклейка авто", "шумоизоляция", "PPF", "Казань"]}
      />
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Бесплатный расчёт
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-4">
              Онлайн-<span className="text-gradient">калькулятор</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Рассчитайте примерную стоимость услуг для вашего автомобиля 
              за 1 минуту. Выберите марку, услуги и получите расчёт.
            </p>
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <PriceCalculator />
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              {
                title: "Мгновенный расчёт",
                description: "Узнайте примерную стоимость за 1 минуту",
              },
              {
                title: "Актуальные цены",
                description: "Данные обновляются автоматически",
              },
              {
                title: "Персональный подход",
                description: "Получите точный расчёт от менеджера",
              },
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center p-6 rounded-xl bg-card border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CalculatorPage;
