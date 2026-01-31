import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Имя должно быть минимум 2 символа").max(100, "Имя слишком длинное"),
  phone: z.string().trim().min(10, "Введите корректный номер телефона").max(20, "Номер слишком длинный"),
  email: z.string().trim().email("Введите корректный email").max(255, "Email слишком длинный").optional().or(z.literal("")),
  carBrand: z.string().trim().max(50, "Марка слишком длинная").optional(),
  carModel: z.string().trim().max(50, "Модель слишком длинная").optional(),
  message: z.string().trim().max(1000, "Сообщение слишком длинное").optional(),
});

interface LeadFormProps {
  serviceSlug?: string;
  sourcePage?: string;
  showCarFields?: boolean;
  showEmailField?: boolean;
  showMessageField?: boolean;
  submitButtonText?: string;
  onSuccess?: () => void;
  className?: string;
}

const LeadForm = ({
  serviceSlug,
  sourcePage,
  showCarFields = false,
  showEmailField = true,
  showMessageField = true,
  submitButtonText = "Отправить заявку",
  onSuccess,
  className = "",
}: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carBrand: "",
    carModel: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getUtmParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get("utm_source"),
      utm_medium: urlParams.get("utm_medium"),
      utm_campaign: urlParams.get("utm_campaign"),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const utmParams = getUtmParams();

      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || null,
        car_brand: formData.carBrand?.trim() || null,
        car_model: formData.carModel?.trim() || null,
        message: formData.message?.trim() || null,
        service_slug: serviceSlug || null,
        source_page: sourcePage || window.location.pathname,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
      });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", carBrand: "", carModel: "", message: "" });

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      onSuccess?.();
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позвонить нам.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
        <p className="text-muted-foreground mb-6">
          Мы свяжемся с вами в ближайшее время
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Отправить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="lead-name">Ваше имя *</Label>
        <Input
          id="lead-name"
          placeholder="Иван"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name ? "border-destructive" : ""}
          maxLength={100}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-phone">Телефон *</Label>
        <Input
          id="lead-phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={errors.phone ? "border-destructive" : ""}
          maxLength={20}
          disabled={isSubmitting}
        />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      {showEmailField && (
        <div className="space-y-2">
          <Label htmlFor="lead-email">Email</Label>
          <Input
            id="lead-email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
            maxLength={255}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      )}

      {showCarFields && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lead-car-brand">Марка авто</Label>
            <Input
              id="lead-car-brand"
              placeholder="BMW"
              value={formData.carBrand}
              onChange={(e) => handleChange("carBrand", e.target.value)}
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-car-model">Модель</Label>
            <Input
              id="lead-car-model"
              placeholder="X5"
              value={formData.carModel}
              onChange={(e) => handleChange("carModel", e.target.value)}
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>
        </div>
      )}

      {showMessageField && (
        <div className="space-y-2">
          <Label htmlFor="lead-message">Сообщение</Label>
          <Textarea
            id="lead-message"
            placeholder="Расскажите о вашем автомобиле и интересующей услуге..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={errors.message ? "border-destructive" : ""}
            maxLength={1000}
            rows={4}
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Отправка...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            {submitButtonText}
          </span>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" className="underline hover:text-primary">
          политикой конфиденциальности
        </a>
      </p>
    </form>
  );
};

export default LeadForm;
