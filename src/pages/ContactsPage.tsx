import { useState } from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQAOptional } from "@/contexts/QAContext";
import { WORKING_HOURS } from "@/lib/constants";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Имя должно быть минимум 2 символа").max(100, "Имя слишком длинное"),
  phone: z.string().trim().min(10, "Введите корректный номер телефона").max(20, "Номер слишком длинный"),
  email: z.string().trim().max(255, "Email слишком длинный").optional().refine(
    (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Введите корректный email" }
  ),
  message: z.string().trim().max(1000, "Сообщение слишком длинное").optional(),
  service: z.string().optional(),
});

const serviceOptions = [
  { value: "ppf", label: "Защита кузова PPF" },
  { value: "tonirovka", label: "Тонировка" },
  { value: "vinyl", label: "Оклейка винилом" },
  { value: "antihrom", label: "Антихром" },
  { value: "shumoizolyaciya", label: "Шумоизоляция" },
  { value: "vyhlop", label: "Активный выхлоп" },
  { value: "pdr", label: "Удаление вмятин PDR" },
  { value: "pandora", label: "Сигнализация Pandora" },
  { value: "other", label: "Другое" },
];

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    service: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const qaContext = useQAOptional();
  const { settings: contactData } = useSiteSettings();

  // Динамические контактные карточки
  const contactInfo = useMemo(() => {
    const items: Array<{
      icon: typeof MapPin;
      title: string;
      content: string;
      subtext: string;
      href?: string;
      external?: boolean;
    }> = [];
    
    // Адрес показываем только если он заполнен
    if (contactData.address) {
      items.push({
        icon: MapPin,
        title: "Адрес",
        content: contactData.address,
        subtext: contactData.landmark || "",
        href: `https://yandex.ru/maps/?pt=${contactData.lon},${contactData.lat}&z=16&l=map`,
        external: true,
      });
    }
    
    items.push({
      icon: Phone,
      title: "Телефон",
      content: contactData.phoneDisplay,
      subtext: "Звоните с 9:00 до 21:00",
      href: `tel:${contactData.phone}`,
    });
    
    items.push({
      icon: Mail,
      title: "Email",
      content: contactData.email,
      subtext: "Ответим в течение часа",
      href: `mailto:${contactData.email}`,
    });
    
    items.push({
      icon: Clock,
      title: "Режим работы",
      content: contactData.workingHours,
      subtext: WORKING_HOURS.note,
    });
    
    return items;
  }, [contactData]);


  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = contactSchema.safeParse(formData);
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
      // Get UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);
      
      const leadPayload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || null,
        message: formData.message?.trim() || null,
        source_page: "/contacts",
        utm_source: urlParams.get("utm_source"),
        utm_medium: urlParams.get("utm_medium"),
        utm_campaign: urlParams.get("utm_campaign"),
      };

      // QA Mode: intercept submission
      if (qaContext?.isQAMode) {
        qaContext.addSubmission({
          formType: "ContactForm",
          sourcePage: "/contacts",
          payload: leadPayload,
        });
        toast({
          title: "🧪 QA Mode",
          description: "Форма перехвачена. Данные доступны в /qa",
        });
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "", service: "" });
        return;
      }

      const { error } = await supabase.functions.invoke("lead-submit", {
        body: leadPayload,
      });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "", service: "" });
      
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });

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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Контакты — SUNMAXKZN | Детейлинг-центр в Казани"
        description="Свяжитесь с автостудией SUNMAXKZN в Казани. Адрес: ул. Техническая, 122. Телефон: +7 (903) 868-78-61. Работаем ежедневно с 9:00 до 21:00."
        keywords={["контакты sunmaxkzn", "детейлинг казань адрес", "запись на детейлинг"]}
        canonicalUrl="https://sunmaxkzn.ru/contacts"
      />
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Контакты
              </h1>
              <p className="text-xl text-muted-foreground">
                Приезжайте к нам или оставьте заявку — мы свяжемся с вами в течение 15 минут
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                        {item.href ? (
                            <a
                              href={item.href}
                              className="font-semibold hover:text-primary transition-colors"
                              {...((item as any).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="font-semibold">{item.content}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.subtext}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Messengers */}
            <div className="grid gap-4 md:grid-cols-2 mt-8 max-w-2xl mx-auto">
              <motion.a
                href={`https://wa.me/${contactData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-accent/50 border border-border hover:bg-accent transition-colors"
              >
                <MessageCircle className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Напишите нам в мессенджер</p>
                </div>
              </motion.a>
              <motion.a
                href={contactData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-accent/50 border border-border hover:bg-accent transition-colors"
              >
                <Send className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">Telegram</p>
                  <p className="text-sm text-muted-foreground">@sunmaxkzn</p>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* Map + Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="overflow-hidden h-full min-h-[400px] relative">
                  <a href="https://yandex.ru/maps/org/sunmax_kzn/97524296927/?utm_medium=mapframe&utm_source=maps" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs absolute top-0 left-0 z-10">Sunmax-Kzn</a>
                  <a href="https://yandex.ru/maps/43/kazan/category/car_wrapping/184074231588/?utm_medium=mapframe&utm_source=maps" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs absolute top-[14px] left-0 z-10">Оклейка машин в Казани</a>
                  <a href="https://yandex.ru/maps/43/kazan/category/tuning_studio/184105250/?utm_medium=mapframe&utm_source=maps" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs absolute top-[28px] left-0 z-10">Студия тюнинга в Казани</a>
                  <iframe
                    src="https://yandex.ru/map-widget/v1/org/sunmax_kzn/97524296927/reviews/?ll=49.127740%2C55.817396&utm_medium=s&utm_source=maps-reviews-widget&z=16"
                    width="100%"
                    height="100%"
                    frameBorder="1"
                    allowFullScreen
                    className="min-h-[400px] relative"
                    title="Карта проезда — Sunmax-Kzn"
                  />
                </Card>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    {isSuccess ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                          <CheckCircle className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
                        <p className="text-muted-foreground mb-6">
                          Мы свяжемся с вами в ближайшее время
                        </p>
                        <Button onClick={() => setIsSuccess(false)} variant="outline">
                          Отправить ещё одну заявку
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold mb-2">Оставьте заявку</h2>
                        <p className="text-muted-foreground mb-6">
                          Мы перезвоним вам в течение 15 минут
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Ваше имя *</Label>
                            <Input
                              id="name"
                              placeholder="Иван"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              className={errors.name ? "border-destructive" : ""}
                              maxLength={100}
                              disabled={isSubmitting}
                            />
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+7 (___) ___-__-__"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              className={errors.phone ? "border-destructive" : ""}
                              maxLength={20}
                              disabled={isSubmitting}
                            />
                            {errors.phone && (
                              <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="service">Интересующая услуга</Label>
                            <Select
                              value={formData.service}
                              onValueChange={(value) => handleChange("service", value)}
                              disabled={isSubmitting}
                            >
                              <SelectTrigger id="service">
                                <SelectValue placeholder="Выберите услугу" />
                              </SelectTrigger>
                              <SelectContent>
                                {serviceOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email (необязательно)</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="email@example.com"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              className={errors.email ? "border-destructive" : ""}
                              maxLength={255}
                              disabled={isSubmitting}
                            />
                            {errors.email && (
                              <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Сообщение</Label>
                            <Textarea
                              id="message"
                              placeholder="Расскажите о вашем автомобиле и интересующей услуге..."
                              value={formData.message}
                              onChange={(e) => handleChange("message", e.target.value)}
                              className={errors.message ? "border-destructive" : ""}
                              maxLength={1000}
                              rows={4}
                              disabled={isSubmitting}
                            />
                            {errors.message && (
                              <p className="text-sm text-destructive">{errors.message}</p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                Отправка...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Отправить заявку
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
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ContactsPage;
