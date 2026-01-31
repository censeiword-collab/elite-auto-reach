import { motion } from "framer-motion";
import { Calculator, Clock, ChevronLeft, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalculatorResult, CarBrand, CarModel } from "@/hooks/useCalculator";

interface StepResultProps {
  result: CalculatorResult | null;
  selectedBrand: CarBrand | undefined;
  selectedModel: CarModel | undefined;
  onBack: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price);
};

const StepResult = ({
  result,
  selectedBrand,
  selectedModel,
  onBack,
  onReset,
  onSubmit,
}: StepResultProps) => {
  if (!result) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Не удалось рассчитать стоимость</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Car Info */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">Расчёт для</p>
        <p className="text-xl font-semibold">
          {selectedBrand?.name} {selectedModel?.name}
        </p>
      </div>

      {/* Total */}
      <div className="card-premium p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-2">Примерная стоимость</p>
        <p className="text-4xl md:text-5xl font-heading font-extrabold text-gradient">
          {formatPrice(result.totalPrice)} ₽
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            Срок выполнения: {result.totalDuration}{" "}
            {result.totalDuration === 1 ? "день" : result.totalDuration < 5 ? "дня" : "дней"}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div>
        <h4 className="font-semibold mb-3">Детализация</h4>
        <div className="space-y-2">
          {result.breakdown.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
            >
              <div>
                <p className="font-medium text-sm">{item.serviceName}</p>
                <p className="text-xs text-muted-foreground">{item.optionName}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(item.price)} ₽</p>
                <p className="text-xs text-muted-foreground">
                  {item.duration} {item.duration === 1 ? "день" : item.duration < 5 ? "дня" : "дней"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center">
        * Указана ориентировочная стоимость. Точная цена зависит от состояния автомобиля и выбранных материалов.
      </p>

      {/* Actions */}
      <div className="grid sm:grid-cols-2 gap-3 pt-4">
        <Button onClick={onSubmit} className="btn-glow">
          <Send className="w-4 h-4 mr-2" />
          Получить точный расчёт
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
          <Button variant="ghost" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StepResult;
