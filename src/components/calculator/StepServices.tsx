import { motion } from "framer-motion";
import { Shield, Volume2, Wrench, Bell, Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    slug: "okleyka-avto-poliuretanovoy-plenkoy-kazan",
    name: "Защита PPF",
    description: "Оклейка полиуретановой плёнкой",
    icon: Shield,
  },
  {
    slug: "aktivnyy-vyhlop-kazan",
    name: "Активный выхлоп",
    description: "Электронные заслонки и тюнинг",
    icon: Volume2,
  },
  {
    slug: "shumoizolyaciya-avto-kazan",
    name: "Шумоизоляция",
    description: "Комплексная виброизоляция",
    icon: Settings,
  },
  {
    slug: "udalenie-vmyatin-bez-pokraski-kazan",
    name: "PDR",
    description: "Удаление вмятин без покраски",
    icon: Wrench,
  },
  {
    slug: "ustanovka-signalizacii-pandora-kazan",
    name: "Pandora",
    description: "Охранные системы с автозапуском",
    icon: Bell,
  },
];

interface StepServicesProps {
  selectedServices: string[];
  onToggleService: (serviceSlug: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepServices = ({
  selectedServices,
  onToggleService,
  onNext,
  onBack,
}: StepServicesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Выберите услуги</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Можно выбрать несколько услуг
        </p>

        <div className="grid gap-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedServices.includes(service.slug);

            return (
              <button
                key={service.slug}
                onClick={() => onToggleService(service.slug)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      "font-semibold",
                      isSelected ? "text-primary" : "text-foreground"
                    )}
                  >
                    {service.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </div>
              </button>
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
          disabled={selectedServices.length === 0}
          className="btn-glow"
        >
          Далее
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepServices;
