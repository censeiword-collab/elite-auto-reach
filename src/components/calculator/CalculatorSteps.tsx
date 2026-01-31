import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface CalculatorStepsProps {
  steps: Step[];
}

const CalculatorSteps = ({ steps }: CalculatorStepsProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: step.isActive ? 1.1 : 1 }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                step.isCompleted
                  ? "bg-primary text-primary-foreground"
                  : step.isActive
                  ? "bg-primary/20 text-primary border-2 border-primary"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {step.isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </motion.div>
            <span
              className={cn(
                "text-xs mt-2 text-center hidden sm:block",
                step.isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-2 transition-colors duration-300",
                step.isCompleted ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CalculatorSteps;
