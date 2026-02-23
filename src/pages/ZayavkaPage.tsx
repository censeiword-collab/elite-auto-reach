import { useEffect, useRef, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PPFProcessGallery from "@/components/PPFProcessGallery";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTACT, getWhatsAppLink, getPhoneLink, WORKING_HOURS } from "@/lib/constants";
import {
  Shield,
  Award,
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  ArrowDown,
  ClipboardList,
  Car,
  Wrench,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const LeadWizard = lazy(() => import("@/components/LeadWizard"));

const COUNTER_ID = 106818205;

const BENEFITS = [
  { icon: Shield, title: "PPF премиум-класса", desc: "Полиуретановые плёнки SUNMAX с гарантией до 10 лет" },
  { icon: Award, title: "Гарантия на все работы", desc: "Письменная гарантия и прозрачный договор" },
  { icon: Sparkles, title: "Подготовка и полировка", desc: "Полная подготовка ЛКП перед оклейкой — без доплат" },
  { icon: MapPin, title: "Казань, ул. С. Хакима", desc: "Удобная локация с парковкой. Работаем ежедневно" },
];

const HOW_STEPS = [
  { icon: ClipboardList, title: "Оставляете заявку", desc: "Заполните форму — перезвоним за 15 минут" },
  { icon: Car, title: "Привозите авто", desc: "Осмотр и согласование объёма работ" },
  { icon: Wrench, title: "Делаем работу", desc: "Подготовка, полировка и оклейка в чистом боксе" },
  { icon: CheckCircle2, title: "Принимаете результат", desc: "Финальная проверка, договор и гарантия" },
];

const FAQ_ITEMS = [
  { q: "Сколько стоит оклейка?", a: "Стоимость зависит от автомобиля и объёма работ. Заполните форму — рассчитаем точную стоимость за 15 минут." },
  { q: "Какие плёнки используете?", a: "Используем полиуретановые плёнки SUNMAX: прозрачные, матовые (сатин) и цветной полиуретан. Все плёнки сертифицированы и имеют гарантию производителя до 10 лет." },
  { q: "Нужно ли готовить автомобиль?", a: "Нет, мы сами полностью подготовим ЛКП: мойка, деконтаминация, полировка при необходимости — всё включено." },
  { q: "Сколько времени занимает работа?", a: "Зоны риска — 1–2 дня, полный кузов — 3–5 дней. Точные сроки согласуем после осмотра." },
  { q: "Есть ли гарантия?", a: "Да, письменная гарантия до 10 лет на PPF-плёнку. На все остальные услуги — от 1 до 5 лет." },
];

function WizardSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-6 w-2/3 mt-4" />
      <div className="space-y-3 mt-6">
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
      <div className="flex justify-between mt-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

const ZayavkaPage = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as any;
    if (typeof w.ym === "function") w.ym(COUNTER_ID, "reachGoal", "lead_page_open");
  }, []);

  useEffect(() => {
    if (window.location.hash === "#form") {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 400);
    }
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title="Оставить заявку — расчёт стоимости | SUNMAXKZN Казань"
        description="Оставьте заявку на оклейку и защиту автомобиля. Рассчитаем стоимость и перезвоним за 15 минут. Гарантия до 10 лет."
        canonicalUrl="https://sunmax-kzn.ru/zayavka"
      />
      <Header />

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-heading font-bold leading-tight">
            Оставьте заявку — рассчитаем стоимость и перезвоним за 15 минут
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Заполните короткий квиз — подберём оптимальный вариант защиты для вашего автомобиля
          </p>
          <Button size="lg" onClick={scrollToForm} className="gap-2">
            Оставить заявку
            <ArrowDown className="w-4 h-4" />
          </Button>
        </section>

        {/* Benefits */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 p-5 rounded-2xl border border-border bg-card"
            >
              <b.icon className="w-8 h-8 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-semibold text-sm">{b.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{b.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Gallery + Quiz — two-column on desktop */}
        <section ref={formRef} id="form" className="scroll-mt-20">
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-[1fr_minmax(0,420px)] gap-8 items-start">
            {/* Gallery — sticky */}
            <div className="sticky top-24 space-y-4">
              <h2 className="text-lg font-heading font-bold flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Процесс оклейки PPF
              </h2>
              <PPFProcessGallery />
            </div>
            {/* Wizard */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 min-w-0">
              <Suspense fallback={<WizardSkeleton />}>
                <LeadWizard />
              </Suspense>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden space-y-4">
            {/* Collapsible gallery */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full gap-2 justify-center">
                  <Camera className="w-4 h-4" />
                  Показать процесс оклейки
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-3">
                <h2 className="text-base font-heading font-bold">Процесс оклейки PPF</h2>
                <PPFProcessGallery />
              </CollapsibleContent>
            </Collapsible>
            {/* Wizard */}
            <div className="rounded-2xl border border-border bg-card p-4 min-w-0">
              <Suspense fallback={<WizardSkeleton />}>
                <LeadWizard />
              </Suspense>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-center">
            Как мы работаем
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm">{s.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-center">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_ITEMS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-4">
                <AccordionTrigger className="text-sm font-medium text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contacts */}
        <section className="text-center space-y-4 pb-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-heading font-bold">Свяжитесь с нами</h2>
          <p className="text-muted-foreground text-sm">{WORKING_HOURS.display}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={getPhoneLink()}>
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                {CONTACT.phone.display}
              </Button>
            </a>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ZayavkaPage;
