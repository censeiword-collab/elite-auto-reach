import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useQAOptional } from "@/contexts/QAContext";
import { toast } from "sonner";
import type { CalculatorResult } from "@/hooks/useCalculator";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calculatorResult: CalculatorResult | null;
  carInfo?: string;
  selectedServices: string[];
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price);
};

const LeadFormModal = ({
  open,
  onOpenChange,
  calculatorResult,
  carInfo,
  selectedServices,
}: LeadFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const qaContext = useQAOptional();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Заполните обязательные поля");
      return;
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-\+\(\)]{10,18}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Введите корректный номер телефона");
      return;
    }

    setIsSubmitting(true);

    try {
      const leadMessage = [
        formData.message,
        carInfo ? `Автомобиль: ${carInfo}` : "",
        calculatorResult
          ? `Расчёт: ${formatPrice(calculatorResult.totalPrice)} ₽`
          : "",
        calculatorResult?.breakdown.map((b) => `${b.serviceName}: ${b.optionName}`).join(", "),
      ]
        .filter(Boolean)
        .join("\n");

      const leadPayload = {
        name: formData.name.trim().substring(0, 100),
        phone: formData.phone.trim().substring(0, 20),
        message: leadMessage.substring(0, 1000),
        source_page: window.location.pathname,
        service_slug: selectedServices[0] || null,
      };

      // QA Mode: intercept submission
      if (qaContext?.isQAMode) {
        qaContext.addSubmission({
          formType: "CalculatorLeadForm",
          sourcePage: window.location.pathname,
          payload: {
            ...leadPayload,
            carInfo,
            calculatorResult: calculatorResult ? {
              totalPrice: calculatorResult.totalPrice,
              breakdown: calculatorResult.breakdown,
            } : null,
          },
        });
        toast.success("🧪 QA Mode: Форма перехвачена");
        setIsSuccess(true);
        setFormData({ name: "", phone: "", message: "" });
        setTimeout(() => {
          onOpenChange(false);
          setIsSuccess(false);
        }, 2000);
        return;
      }

      const { error } = await supabase.from("leads").insert(leadPayload);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
      
      setTimeout(() => {
        onOpenChange(false);
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Ошибка отправки. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSuccess ? "Заявка отправлена!" : "Получить точный расчёт"}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-lg font-semibold mb-2">Спасибо за заявку!</p>
            <p className="text-muted-foreground text-sm">
              Наш менеджер свяжется с вами в ближайшее время
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {calculatorResult && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Расчётная стоимость</p>
                <p className="text-2xl font-bold text-gradient">
                  {formatPrice(calculatorResult.totalPrice)} ₽
                </p>
                {carInfo && (
                  <p className="text-sm text-muted-foreground mt-1">{carInfo}</p>
                )}
              </div>
            )}

            <div>
              <Input
                placeholder="Ваше имя *"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                maxLength={100}
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Телефон *"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                maxLength={20}
                required
              />
            </div>

            <div>
              <Textarea
                placeholder="Комментарий (необязательно)"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                maxLength={500}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Отправить заявку
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="/privacy" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
