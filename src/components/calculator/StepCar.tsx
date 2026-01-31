import { motion } from "framer-motion";
import { Car, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarBrand, CarModel } from "@/hooks/useCalculator";

interface StepCarProps {
  brands: CarBrand[];
  models: CarModel[];
  selectedBrandId: string | null;
  selectedModelId: string | null;
  onSelectBrand: (brandId: string) => void;
  onSelectModel: (modelId: string) => void;
  onNext: () => void;
}

const StepCar = ({
  brands,
  models,
  selectedBrandId,
  selectedModelId,
  onSelectBrand,
  onSelectModel,
  onNext,
}: StepCarProps) => {
  const premiumBrands = brands.filter((b) => b.is_premium);
  const otherBrands = brands.filter((b) => !b.is_premium);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Brand Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          Выберите марку
        </h3>

        {premiumBrands.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Премиум</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {premiumBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => onSelectBrand(brand.id)}
                  className={cn(
                    "p-3 rounded-lg border text-sm font-medium transition-all duration-200",
                    selectedBrandId === brand.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/50 text-foreground"
                  )}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {otherBrands.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Другие марки</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {otherBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => onSelectBrand(brand.id)}
                  className={cn(
                    "p-3 rounded-lg border text-sm font-medium transition-all duration-200",
                    selectedBrandId === brand.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/50 text-foreground"
                  )}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Model Selection */}
      {selectedBrandId && models.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">Выберите модель</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className={cn(
                  "p-3 rounded-lg border text-sm font-medium transition-all duration-200",
                  selectedModelId === model.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                )}
              >
                <span>{model.name}</span>
                {model.body_type && (
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {model.body_type}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {selectedBrandId && models.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Модели для выбранной марки будут добавлены позже. Выберите другую марку или свяжитесь с нами для расчёта.
        </p>
      )}

      {/* Next Button */}
      <div className="pt-4">
        <Button
          onClick={onNext}
          disabled={!selectedModelId}
          className="btn-glow"
        >
          Далее
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepCar;
