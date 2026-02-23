import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaOrg, { buildBusinessData } from "@/components/seo/SchemaOrg";
import { WARRANTY, TIMING } from "@/lib/constants";
import { UNIFIED_POSITIONING, getPageSEO } from "@/lib/seo-config";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePageSections } from "@/hooks/usePageSections";
import { SECTION_REGISTRY, HOME_FALLBACK_ORDER } from "@/lib/sectionRegistry";
const homeFAQ = [
  {
    question: "Сколько стоит оклейка автомобиля защитной плёнкой PPF в Казани?",
    answer: `Стоимость оклейки PPF зависит от выбранной зоны защиты и модели автомобиля. Полная оклейка кузова начинается от 150 000 ₽, защита передней части — от 45 000 ₽, капота — от 15 000 ₽. Используем плёнки премиум-сегмента с гарантией ${WARRANTY.ppf.display}.`,
  },
  {
    question: "Какие автомобили вы обслуживаете?",
    answer: "SUNMAXKZN — студия для автомобилей бизнес- и премиум-класса: Porsche, BMW, Mercedes-Benz, Audi, Lexus, Land Rover и другие. Также работаем с автомобилями массового сегмента.",
  },
  {
    question: "Сколько времени занимает полная шумоизоляция автомобиля?",
    answer: `Комплексная шумоизоляция автомобиля занимает ${TIMING.soundproofingFull.display} в зависимости от объёма работ. Используем сертифицированные материалы премиум-класса. Гарантия — ${WARRANTY.soundproofing.display}.`,
  },
  {
    question: "Можно ли управлять активным выхлопом со смартфона?",
    answer: "Да, мы устанавливаем системы активного выхлопа с электронными заслонками, которые управляются с пульта или смартфона. Вы можете переключаться между тихим режимом для города и спортивным для трассы.",
  },
];

const Index = () => {
  const seoConfig = getPageSEO("/");
  const { settings } = useSiteSettings();
  const businessData = buildBusinessData(settings);
  const { sections, error } = usePageSections("home");

  const renderSections = () => {
    if (sections && sections.length > 0 && !error) {
      return [...sections]
        .filter((s) => s.is_visible)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => {
          const Component = SECTION_REGISTRY[s.section_key];
          if (!Component) return null;
          return <Component key={s.id} settings={(s.settings as Record<string, unknown>) ?? {}} />;
        });
    }
    // Fallback: static order
    return HOME_FALLBACK_ORDER.map((key) => {
      const Component = SECTION_REGISTRY[key];
      if (!Component) return null;
      return <Component key={key} />;
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title={seoConfig?.title || UNIFIED_POSITIONING.title}
        description={`Профессиональный детейлинг и тюнинг автомобилей премиум-класса в Казани. Оклейка PPF, активный выхлоп, шумоизоляция, PDR, сигнализации Pandora. Гарантия ${WARRANTY.max.display}.`}
        keywords={[
          "детейлинг казань",
          "оклейка ppf казань",
          "защитная плёнка автомобиля",
          "активный выхлоп казань",
          "шумоизоляция авто казань",
          "удаление вмятин pdr",
          "сигнализация pandora",
        ]}
        canonicalUrl="https://sunmax-kzn.ru"
      />
      <SchemaOrg type="LocalBusiness" data={businessData} />
      <SchemaOrg type="FAQ" data={homeFAQ} />
      
      <Header />
      <main>{renderSections()}</main>
      <Footer />
    </div>
  );
};

export default Index;
