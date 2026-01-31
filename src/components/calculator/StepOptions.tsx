import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalculatorOption } from "@/hooks/useCalculator";

interface StepOptionsProps {
  selectedServices: string[];
  selectedOptions: Record<string, string[]>;
  getOptionsForService: (serviceSlug: string) => CalculatorOption[];
  serviceName: Record<string, string>;
  onToggleOption: (serviceSlug: string, optionKey: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepOptions = ({
  selectedServices,
  selectedOptions,
  getOptionsForService,
  serviceName,
  onToggleOption,
  onNext,
  onBack,
}: StepOptionsProps) => {
  const hasAnyOptions = selectedServices.some(
    (serviceSlug) => (selectedOptions[serviceSlug] || []).length > 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Детализация услуг</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Выберите конкретные опции для каждой услуги
        </p>

        <div className="space-y-8">
          {selectedServices.map((serviceSlug) => {
            const options = getOptionsForService(serviceSlug);
            const selected = selectedOptions[serviceSlug] || [];

            if (options.length === 0) return null;

            return (
              <div key={serviceSlug}>
                <h4 className="font-semibold text-primary mb-3">
                  {serviceName[serviceSlug] || serviceSlug}
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {options.map((option) => {
                    const isSelected = selected.includes(option.option_key);

                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          onToggleOption(serviceSlug, option.option_key)
                        }
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left",
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded flex items-center justify-center shrink-0 border-2",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-medium text-sm",
                              isSelected ? "text-primary" : "text-foreground"
                            )}
                          >
                            {option.option_name}
                          </p>
                          {option.description && (
                            <p className="text-xs text-muted-foreground truncate">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasAnyOptions}
          className="btn-glow"
        >
          Рассчитать
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepOptions;
