import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT, getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

/* ─── types ─── */
interface WizardData {
  service: string;
  carMakeModel: string;
  carYear: string;
  comment: string;
  condition: string;
  timeframe: string;
  phone: string;
  name: string;
  messenger: string;
  honeypot: string;
}

const INITIAL: WizardData = {
  service: "",
  carMakeModel: "",
  carYear: "",
  comment: "",
  condition: "",
  timeframe: "",
  phone: "",
  name: "",
  messenger: "",
  honeypot: "",
};

const STEPS = [
  { label: "Услуга" },
  { label: "Автомобиль" },
  { label: "Состояние" },
  { label: "Сроки" },
  { label: "Контакты" },
];

const COUNTER_ID = 106818205;
const MIN_OPEN_MS = 20_000;
const SUBMIT_LIMIT = 2;
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const LS_KEY = "lw_submits";

/* ─── helpers ─── */
function getUtm() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    yclid: p.get("yclid") || "",
  };
}

function checkRateLimit(): boolean {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = arr.filter((t) => now - t < SUBMIT_WINDOW_MS);
    return recent.length < SUBMIT_LIMIT;
  } catch {
    return true;
  }
}

function recordSubmit() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    arr.push(Date.now());
    localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(-10)));
  } catch {}
}

function ymGoal(goal: string) {
  const w = window as any;
  if (typeof w.ym === "function") w.ym(COUNTER_ID, "reachGoal", goal);
}

/* ─── component ─── */
interface LeadWizardProps {
  onClose?: () => void;
}

const LeadWizard = ({ onClose }: LeadWizardProps) => {
  const navigate = useNavigate();

  // Pre-fill from query params
  const initFromQuery = (): { data: WizardData; step: number } => {
    const p = new URLSearchParams(window.location.search);
    const serviceMap: Record<string, string> = {
      risk: "Зоны риска",
      full: "Полный кузов",
      parts: "Отдельные элементы",
    };
    const svc = serviceMap[p.get("service") || ""] || "";
    return {
      data: { ...INITIAL, service: svc },
      step: svc ? 1 : 0,
    };
  };

  const init = initFromQuery();
  const [step, setStep] = useState(init.step);
  const [data, setData] = useState<WizardData>(init.data);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "skipped">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const openedAt = useRef(Date.now());

  useEffect(() => {
    ymGoal("lead_wizard_open");
    const p = new URLSearchParams(window.location.search);
    if (p.get("step") === "form") {
      setTimeout(() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }), 400);
    }
  }, []);

  const upd = useCallback(
    (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch })),
    [],
  );

  const canNext = (): boolean => {
    if (step === 0) return !!data.service;
    if (step === 1) return data.carMakeModel.trim().length >= 2;
    if (step === 2) return !!data.condition;
    if (step === 3) return !!data.timeframe;
    if (step === 4) return data.phone.replace(/\D/g, "").length >= 10;
    return false;
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep((s) => s + 1);
      return;
    }

    // Step 5 — submit or skip
    if (data.timeframe === "Не планирую") {
      setStatus("skipped");
      return;
    }

    // honeypot
    if (data.honeypot) return;

    // rate limit
    if (!checkRateLimit()) {
      setErrorMsg("Слишком много заявок. Попробуйте позже или позвоните нам.");
      setStatus("error");
      return;
    }

    // min time
    if (Date.now() - openedAt.current < MIN_OPEN_MS) {
      setErrorMsg("Пожалуйста, подождите несколько секунд и попробуйте снова.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const utm = getUtm();

    const payload = {
      name: data.name || "",
      phone: data.phone,
      messenger: data.messenger || "",
      service: data.service,
      car_make_model: data.carMakeModel,
      car_year: data.carYear || "",
      condition: data.condition,
      timeframe: data.timeframe,
      comment: data.comment || "",
      ...utm,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      source_page: window.location.pathname,
    };

    try {
      const { error } = await supabase.functions.invoke("lead-submit", { body: payload });
      if (error) throw error;
      recordSubmit();
      ymGoal("lead_submit");
      setStatus("success");
    } catch (e: any) {
      setErrorMsg(e?.message || "Ошибка при отправке. Попробуйте позвонить нам.");
      setStatus("error");
    }
  };

  /* ─── terminal screens ─── */
  const resetWizard = () => {
    setData(INITIAL);
    setStep(0);
    setStatus("idle");
    setTimeout(() => {
      document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-6 py-8 px-4">
        <CheckCircle2 className="w-16 h-16 text-primary" />
        <h3 className="text-2xl font-heading font-bold">Заявка отправлена!</h3>
        <p className="text-muted-foreground max-w-sm">Мы свяжемся с вами в ближайшее время</p>
        {onClose ? (
          <Button onClick={onClose} variant="outline">Закрыть</Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={() => navigate("/")} variant="outline">На главную</Button>
            <Button onClick={resetWizard}>Отправить ещё заявку</Button>
          </div>
        )}
      </div>
    );
  }

  if (status === "skipped") {
    return (
      <div className="flex flex-col items-center text-center gap-6 py-8 px-4">
        <CheckCircle2 className="w-16 h-16 text-primary" />
        <h3 className="text-2xl font-heading font-bold">Спасибо за интерес!</h3>
        <p className="text-muted-foreground max-w-sm">
          Когда будете готовы — свяжитесь с нами любым удобным способом
        </p>
        <div className="flex gap-3">
          <a href={getWhatsAppLink()}>
            <Button variant="outline"><MessageCircle className="w-4 h-4 mr-2" />WhatsApp</Button>
          </a>
          <a href={getPhoneLink()}>
            <Button variant="outline"><Phone className="w-4 h-4 mr-2" />{CONTACT.phone.display}</Button>
          </a>
        </div>
        {onClose ? (
          <Button onClick={onClose} variant="ghost" size="sm">Закрыть</Button>
        ) : (
          <div className="flex gap-3">
            <Button onClick={() => navigate("/")} variant="outline">На главную</Button>
            <Button onClick={resetWizard}>Отправить ещё заявку</Button>
          </div>
        )}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center text-center gap-6 py-8 px-4">
        <AlertTriangle className="w-16 h-16 text-destructive" />
        <h3 className="text-2xl font-heading font-bold">Ошибка</h3>
        <p className="text-muted-foreground max-w-sm">{errorMsg}</p>
        <div className="flex gap-3">
          <Button onClick={() => setStatus("idle")}>Попробовать снова</Button>
          <a href={getPhoneLink()}>
            <Button variant="outline"><Phone className="w-4 h-4 mr-2" />Позвонить</Button>
          </a>
        </div>
      </div>
    );
  }

  /* ─── step content ─── */
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <RadioGroup value={data.service} onValueChange={(v) => upd({ service: v })} className="gap-3">
            {["Зоны риска", "Полный кузов", "Отдельные элементы"].map((s) => (
              <label
                key={s}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  data.service === s
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground/40"
                }`}
              >
                <RadioGroupItem value={s} />
                <span className="font-medium">{s}</span>
              </label>
            ))}
          </RadioGroup>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label>Марка и модель *</Label>
              <Input
                placeholder="BMW X5, Toyota Camry..."
                value={data.carMakeModel}
                onChange={(e) => upd({ carMakeModel: e.target.value })}
                maxLength={100}
              />
            </div>
            <div>
              <Label>Год выпуска</Label>
              <Input
                placeholder="2023"
                value={data.carYear}
                onChange={(e) => upd({ carYear: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                maxLength={4}
              />
            </div>
            <div>
              <Label>Комментарий</Label>
              <Textarea
                placeholder="Дополнительная информация..."
                value={data.comment}
                onChange={(e) => upd({ comment: e.target.value })}
                maxLength={500}
                rows={2}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <RadioGroup value={data.condition} onValueChange={(v) => upd({ condition: v })} className="gap-3">
            {["Новый", "С пробегом", "Плачевное"].map((s) => (
              <label
                key={s}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  data.condition === s
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground/40"
                }`}
              >
                <RadioGroupItem value={s} />
                <span className="font-medium">{s}</span>
              </label>
            ))}
          </RadioGroup>
        );

      case 3:
        return (
          <RadioGroup value={data.timeframe} onValueChange={(v) => upd({ timeframe: v })} className="gap-3">
            {["Как можно скорее", "В течение месяца", "Позже", "Не планирую"].map((s) => (
              <label
                key={s}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  data.timeframe === s
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground/40"
                }`}
              >
                <RadioGroupItem value={s} />
                <span className="font-medium">{s}</span>
              </label>
            ))}
          </RadioGroup>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label>Телефон *</Label>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={data.phone}
                onChange={(e) => upd({ phone: e.target.value })}
                maxLength={20}
              />
            </div>
            <div>
              <Label>Имя</Label>
              <Input
                placeholder="Как к вам обращаться?"
                value={data.name}
                onChange={(e) => upd({ name: e.target.value })}
                maxLength={60}
              />
            </div>
            <div>
              <Label>Мессенджер</Label>
              <Input
                placeholder="Telegram, WhatsApp..."
                value={data.messenger}
                onChange={(e) => upd({ messenger: e.target.value })}
                maxLength={60}
              />
            </div>
            {/* honeypot */}
            <input
              type="text"
              name="website"
              value={data.honeypot}
              onChange={(e) => upd({ honeypot: e.target.value })}
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="flex flex-col gap-5 min-w-0">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Шаг {step + 1} из {STEPS.length}</span>
          <span>{STEPS[step].label}</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Step title */}
      <h3 className="text-lg font-heading font-bold">
        {step === 0 && "Что вас интересует?"}
        {step === 1 && "Ваш автомобиль"}
        {step === 2 && "Состояние кузова"}
        {step === 3 && "Когда планируете?"}
        {step === 4 && "Как с вами связаться?"}
      </h3>

      {/* Content */}
      <div className="min-h-[200px] min-w-0">{renderStep()}</div>

      {/* Nav — sticky on mobile */}
      <div className="sticky bottom-0 bg-background border-t pt-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex justify-between gap-3">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Назад
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canNext() || status === "loading"}
          className="min-w-[120px] sm:min-w-[140px]"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : step < 4 ? (
            <>
              Далее
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            "Отправить"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LeadWizard;
