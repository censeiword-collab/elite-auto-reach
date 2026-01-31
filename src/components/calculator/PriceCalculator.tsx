import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import { useCalculator } from "@/hooks/useCalculator";
import CalculatorSteps from "./CalculatorSteps";
import StepCar from "./StepCar";
import StepServices from "./StepServices";
import StepOptions from "./StepOptions";
import StepResult from "./StepResult";
import LeadFormModal from "./LeadFormModal";

interface PriceCalculatorProps {
  preselectedService?: string;
  className?: string;
}

const PriceCalculator = ({ preselectedService, className }: PriceCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showLeadModal, setShowLeadModal] = useState(false);
  
  const {
    selection,
    brands,
    models,
    selectedBrand,
    selectedModel,
    isLoading,
    getOptionsForService,
    calculateResult,
    setBrand,
    setModel,
    toggleService,
    toggleOption,
    reset,
    SERVICE_NAMES,
  } = useCalculator();

  const steps = [
    { number: 1, title: "Автомобиль", isCompleted: currentStep > 1, isActive: currentStep === 1 },
    { number: 2, title: "Услуги", isCompleted: currentStep > 2, isActive: currentStep === 2 },
    { number: 3, title: "Детализация", isCompleted: currentStep > 3, isActive: currentStep === 3 },
    { number: 4, title: "Результат", isCompleted: false, isActive: currentStep === 4 },
  ];

  const result = calculateResult();

  const handleReset = () => {
    reset();
    setCurrentStep(1);
  };

  const handleSubmitLead = () => {
    setShowLeadModal(true);
  };

  if (isLoading) {
    return (
      <div className={className}>
        <div className="card-premium p-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Загрузка калькулятора...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="card-premium p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold">Онлайн-калькулятор</h2>
            <p className="text-sm text-muted-foreground">Рассчитайте стоимость за 1 минуту</p>
          </div>
        </div>

        {/* Steps Indicator */}
        <CalculatorSteps steps={steps} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepCar
              key="step-car"
              brands={brands}
              models={models}
              selectedBrandId={selection.brandId}
              selectedModelId={selection.modelId}
              onSelectBrand={setBrand}
              onSelectModel={setModel}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <StepServices
              key="step-services"
              selectedServices={selection.services}
              onToggleService={toggleService}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepOptions
              key="step-options"
              selectedServices={selection.services}
              selectedOptions={selection.options}
              getOptionsForService={getOptionsForService}
              serviceName={SERVICE_NAMES}
              onToggleOption={toggleOption}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <StepResult
              key="step-result"
              result={result}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              onBack={() => setCurrentStep(3)}
              onReset={handleReset}
              onSubmit={handleSubmitLead}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Lead Modal */}
      <LeadFormModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        calculatorResult={result}
        carInfo={
          selectedBrand && selectedModel
            ? `${selectedBrand.name} ${selectedModel.name}`
            : undefined
        }
        selectedServices={selection.services}
      />
    </div>
  );
};

export default PriceCalculator;
