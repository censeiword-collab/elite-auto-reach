import { motion } from "framer-motion";
import { HelpCircle, Shield, Clock, Sparkles, CreditCard, FileText, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaOrg from "@/components/seo/SchemaOrg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    id: "general",
    icon: HelpCircle,
    title: "Общие вопросы",
    questions: [
      {
        q: "Какие автомобили вы обслуживаете?",
        a: "Мы специализируемся на автомобилях бизнес- и премиум-класса: BMW, Mercedes-Benz, Audi, Porsche, Lexus, Land Rover, Bentley, Maserati и другие. Наши мастера имеют опыт работы со сложными формами кузова и эксклюзивными материалами. Также работаем с автомобилями массового сегмента."
      },
      {
        q: "Где вы находитесь?",
        a: "Наш детейлинг-центр расположен в Казани по адресу ул. Техническая, 122 (рядом с ТЦ МЕГА). Есть бесплатная парковка для клиентов."
      },
      {
        q: "Нужно ли записываться заранее?",
        a: "Да, рекомендуем записываться за 2-3 дня до планируемого визита, особенно на популярные услуги (полная оклейка PPF, комплексная шумоизоляция). Для консультации или осмотра можно приехать без записи в рабочее время."
      },
    ]
  },
  {
    id: "ppf",
    icon: Shield,
    title: "Защитная плёнка PPF",
    questions: [
      {
        q: "Что такое PPF и зачем он нужен?",
        a: "PPF (Paint Protection Film) — это прозрачная полиуретановая плёнка, которая защищает лакокрасочное покрытие от сколов, царапин, песка, реагентов и ультрафиолета. Плёнка самовосстанавливающаяся — мелкие царапины затягиваются при нагреве."
      },
      {
        q: "Какие плёнки вы используете?",
        a: "Мы работаем с премиальными брендами: XPEL Ultimate Plus, SunTek Ultra, 3M Pro Series. Все плёнки имеют гарантию производителя от 5 до 10 лет в зависимости от модели."
      },
      {
        q: "Сколько времени занимает оклейка PPF?",
        a: "Полная оклейка кузова занимает 3-5 рабочих дней. Частичная защита (капот, бампер, фары) — 1-2 дня. Сроки зависят от сложности кузова и объёма работ."
      },
      {
        q: "Влияет ли плёнка на внешний вид автомобиля?",
        a: "Качественная PPF-плёнка практически невидима. Она может быть глянцевой или матовой. Плёнка усиливает глубину цвета и придаёт блеск, защищая при этом от выгорания."
      },
      {
        q: "Можно ли мыть автомобиль с плёнкой на мойке?",
        a: "Да, плёнка не боится автомоек. Рекомендуем избегать агрессивной химии и абразивных средств. Первые 7 дней после оклейки рекомендуется не мыть автомобиль."
      },
    ]
  },
  {
    id: "timing",
    icon: Clock,
    title: "Сроки выполнения",
    questions: [
      {
        q: "Сколько времени занимает шумоизоляция?",
        a: "Комплексная шумоизоляция автомобиля занимает от 2 до 5 дней в зависимости от объёма работ и класса автомобиля. Частичная шумоизоляция (только двери или пол) — 1-2 дня."
      },
      {
        q: "Как быстро устанавливается активный выхлоп?",
        a: "Установка системы активного выхлопа с электронными заслонками занимает 1-2 дня. Включает монтаж заслонок, прокладку проводки и настройку управления."
      },
      {
        q: "За сколько удаляются вмятины PDR?",
        a: "Небольшие вмятины удаляются за несколько часов. Сложные повреждения или градовый ремонт могут занять 1-3 дня. Точные сроки определяем после осмотра."
      },
    ]
  },
  {
    id: "warranty",
    icon: Sparkles,
    title: "Гарантия и качество",
    questions: [
      {
        q: "Какую гарантию вы даёте?",
        a: "Гарантия зависит от услуги: PPF — до 10 лет (гарантия производителя плёнки), шумоизоляция — 3 года, установка оборудования — 2 года, PDR — пожизненная на выполненную работу."
      },
      {
        q: "Что входит в гарантию на PPF?",
        a: "Гарантия покрывает: пожелтение, растрескивание, отслаивание, помутнение плёнки. Не покрывает: механические повреждения, неправильный уход, внешние химические воздействия."
      },
      {
        q: "Как ухаживать за автомобилем после детейлинга?",
        a: "После оклейки PPF первые 7 дней не мыть, не тереть. Далее — обычный уход без абразивов. После шумоизоляции — специальный уход не требуется. После керамики — избегать контактных моек первые 2 недели."
      },
    ]
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Оплата и документы",
    questions: [
      {
        q: "Какие способы оплаты вы принимаете?",
        a: "Наличные, банковские карты, безналичный расчёт для юридических лиц. Возможна рассрочка без переплаты на срок до 12 месяцев (уточняйте условия у менеджера)."
      },
      {
        q: "Работаете ли вы с юридическими лицами?",
        a: "Да, работаем с ИП и организациями. Предоставляем полный пакет документов: договор, акт выполненных работ, счёт-фактура. Возможен безналичный расчёт с НДС."
      },
      {
        q: "Заключаете ли вы договор?",
        a: "Да, на все виды работ заключается договор с указанием перечня услуг, сроков, стоимости и гарантийных обязательств. Это защищает интересы обеих сторон."
      },
    ]
  },
  {
    id: "care",
    icon: Car,
    title: "Уход за автомобилем",
    questions: [
      {
        q: "Повредит ли плёнка заводское ЛКП при снятии?",
        a: "Нет, качественная PPF-плёнка не повреждает заводское покрытие при правильном снятии. Мы используем специальные технологии демонтажа с подогревом, которые исключают повреждение ЛКП."
      },
      {
        q: "Можно ли полировать автомобиль с плёнкой?",
        a: "Плёнку можно полировать специальными составами для PPF. Обычные полироли использовать не рекомендуется. Лучше доверить уход профессионалам."
      },
      {
        q: "Как часто нужно обновлять защитное покрытие?",
        a: "PPF служит 5-10 лет в зависимости от условий эксплуатации. Керамика требует обновления каждые 1-3 года. При правильном уходе срок службы увеличивается."
      },
    ]
  },
];

// Flatten for Schema.org
const allFAQ = faqCategories.flatMap(cat => 
  cat.questions.map(q => ({ question: q.q, answer: q.a }))
);

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Часто задаваемые вопросы — SUNMAXKZN | Детейлинг Казань"
        description="Ответы на популярные вопросы о защитной плёнке PPF, шумоизоляции, тонировке и других услугах автостудии SUNMAXKZN в Казани. Гарантия, сроки, оплата."
        keywords={["faq детейлинг казань", "вопросы ppf", "гарантия оклейка плёнкой"]}
        canonicalUrl="https://sunmaxkzn.ru/faq"
      />
      <SchemaOrg type="FAQ" data={allFAQ} />

      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge-premium mb-4 inline-block">FAQ</span>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
              Часто задаваемые{" "}
              <span className="text-gradient">вопросы</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Собрали ответы на популярные вопросы о наших услугах, гарантии, сроках и оплате
            </p>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="card-gradient rounded-2xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="p-6 border-b border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-heading font-bold text-xl">{category.title}</h2>
                </div>

                {/* Questions */}
                <div className="p-6">
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((item, qIndex) => (
                      <AccordionItem
                        key={qIndex}
                        value={`${category.id}-${qIndex}`}
                        className="border border-border/50 rounded-xl px-5 bg-card/50"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Не нашли ответ на свой вопрос?
              </h2>
              <p className="text-muted-foreground mb-8">
                Свяжитесь с нами — ответим на любые вопросы и поможем подобрать оптимальное решение
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-glow">
                  <a href="/contacts">Задать вопрос</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:+79038687861">
                    +7 (903) 868-78-61
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
