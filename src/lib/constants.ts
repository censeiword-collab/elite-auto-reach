// =============================================================
// SUNMAXKZN — Единый файл констант
// Все контактные данные, гарантии, сроки, форматы цен
// =============================================================

// ========================
// БРЕНД И КОНТАКТЫ
// ========================
export const BRAND = {
  name: "SUNMAXKZN",
  fullName: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
  tagline: "Защита. Тюнинг. Комфорт.",
  description: "Студия детейлинга, оклейки и тюнинга автомобилей в Казани",
} as const;

export const CITY = {
  name: "Казань",
  region: "Республика Татарстан",
  country: "RU",
  postalCode: "420000",
} as const;

export const CONTACT = {
  phone: {
    raw: "+79038687861",
    display: "+7 (903) 868-78-61",
    whatsapp: "79038687861",
  },
  email: "info@sunmaxkzn.ru",
  address: {
    street: "ул. Техническая, 122",
    full: "г. Казань, ул. Техническая, 122",
    landmark: "Рядом с ТЦ МЕГА",
  },
  geo: {
    latitude: 55.796127,
    longitude: 49.122141,
  },
  social: {
    vk: "https://vk.com/sunmaxkzn",
    telegram: "https://t.me/sunmaxkzn",
    instagram: "https://instagram.com/sunmaxkzn",
  },
} as const;

export const WORKING_HOURS = {
  display: "Ежедневно 9:00 — 21:00",
  short: "9:00–21:00",
  schema: ["Mo-Su 09:00-21:00"],
  detailed: "Пн-Вс: 9:00 – 21:00",
  note: "Без перерывов и выходных",
} as const;

// ========================
// ГАРАНТИИ (СТАНДАРТ)
// ========================
export const WARRANTY = {
  ppf: {
    years: 10,
    display: "до 10 лет",
    description: "Гарантия производителя на PPF-плёнку",
  },
  tinting: {
    years: 5,
    display: "5 лет",
    description: "Гарантия на тонировку стёкол",
  },
  vinyl: {
    years: 5,
    display: "до 5 лет",
    description: "Гарантия на виниловую плёнку",
  },
  soundproofing: {
    years: 3,
    display: "3 года",
    description: "Гарантия на шумоизоляцию",
  },
  exhaust: {
    years: 2,
    display: "2 года",
    description: "Гарантия на установку активного выхлопа",
  },
  pdr: {
    years: null, // Пожизненная
    display: "пожизненная",
    description: "Пожизненная гарантия на удаление вмятин",
  },
  pandora: {
    years: 3,
    display: "3 года",
    description: "Гарантия производителя + установка",
  },
  equipment: {
    years: 2,
    display: "2 года",
    description: "Гарантия на установку оборудования",
  },
  detailing: {
    years: 1,
    display: "1 год",
    description: "Гарантия на детейлинг-услуги",
  },
  // Общая максимальная (для маркетинга)
  max: {
    years: 10,
    display: "до 10 лет",
    description: "Максимальная гарантия на услуги",
  },
} as const;

// ========================
// СРОКИ ВЫПОЛНЕНИЯ
// ========================
export const TIMING = {
  ppfFull: {
    display: "3–5 дней",
    description: "Полная оклейка кузова PPF",
  },
  ppfPartial: {
    display: "1–2 дня",
    description: "Частичная оклейка PPF",
  },
  tinting: {
    display: "2–4 часа",
    description: "Тонировка стёкол",
  },
  vinylFull: {
    display: "4–7 дней",
    description: "Полная оклейка винилом",
  },
  soundproofingFull: {
    display: "2–5 дней",
    description: "Комплексная шумоизоляция",
  },
  soundproofingPartial: {
    display: "1–2 дня",
    description: "Частичная шумоизоляция",
  },
  exhaust: {
    display: "1–2 дня",
    description: "Установка активного выхлопа",
  },
  pdrSmall: {
    display: "от 3 часов",
    description: "Удаление небольших вмятин",
  },
  pdrComplex: {
    display: "1–3 дня",
    description: "Сложный PDR-ремонт",
  },
  pandora: {
    display: "1 день",
    description: "Установка сигнализации Pandora",
  },
  antichrome: {
    display: "1–2 дня",
    description: "Оклейка хрома в чёрный",
  },
  interior: {
    display: "1–3 дня",
    description: "Оклейка салона",
  },
  detailing: {
    display: "1–2 дня",
    description: "Комплексный детейлинг",
  },
  filmRemoval: {
    display: "1–2 дня",
    description: "Снятие плёнки",
  },
  callback: {
    display: "10–15 минут",
    description: "Время ожидания звонка",
  },
} as const;

// ========================
// ЦЕНООБРАЗОВАНИЕ
// ========================
export const PRICING = {
  currency: "₽",
  currencyCode: "RUB",
  priceRange: "₽₽₽", // Schema.org
  // Форматирование цен
  format: (price: number): string => {
    return price.toLocaleString("ru-RU") + " ₽";
  },
  formatFrom: (price: number): string => {
    return "от " + price.toLocaleString("ru-RU") + " ₽";
  },
} as const;

// ========================
// SEO ШАБЛОНЫ
// ========================
export const SEO = {
  domain: "https://sunmaxkzn.ru",
  h1Suffix: " в Казани",
  titleSuffix: " | SUNMAXKZN Казань",
  defaultDescription: "Профессиональный детейлинг и тюнинг автомобилей премиум-класса в Казани. Гарантия до 10 лет.",
  keywords: {
    brand: ["SUNMAXKZN", "детейлинг казань", "автостудия казань"],
    location: ["казань", "татарстан"],
  },
} as const;

// ========================
// СООБЩЕНИЯ ФОРМ
// ========================
export const FORM_MESSAGES = {
  validation: {
    nameMin: "Имя должно быть минимум 2 символа",
    nameMax: "Имя слишком длинное",
    phoneInvalid: "Введите корректный номер телефона",
    phoneMax: "Номер слишком длинный",
    emailInvalid: "Введите корректный email",
    emailMax: "Email слишком длинный",
    messageMax: "Сообщение слишком длинное",
  },
  success: {
    title: "Заявка отправлена!",
    description: "Мы свяжемся с вами в ближайшее время",
  },
  error: {
    title: "Ошибка",
    description: "Не удалось отправить заявку. Попробуйте позвонить нам.",
  },
  labels: {
    name: "Ваше имя",
    phone: "Телефон",
    email: "Email",
    message: "Сообщение",
    carBrand: "Марка авто",
    carModel: "Модель",
    service: "Интересующая услуга",
  },
  placeholders: {
    name: "Иван",
    phone: "+7 (___) ___-__-__",
    email: "email@example.com",
    message: "Расскажите о вашем автомобиле и интересующей услуге...",
    carBrand: "BMW",
    carModel: "X5",
  },
  required: "*",
  submitButton: "Отправить заявку",
  privacyText: "Нажимая кнопку, вы соглашаетесь с",
  privacyLink: "политикой конфиденциальности",
} as const;

// ========================
// МАРКЕТИНГОВЫЕ ТЕКСТЫ
// ========================
export const MARKETING = {
  trustBadges: [
    { value: "8+", label: "лет опыта" },
    { value: "2500+", label: "автомобилей" },
    { value: "10", label: "лет гарантии" },
  ],
  premiumBrands: [
    "Porsche", "BMW", "Mercedes-Benz", "Audi", "Lexus", "Land Rover", "Bentley", "Maserati"
  ],
  usps: [
    {
      title: "Защита высшего класса",
      description: "Плёнки премиум-сегмента — надёжная защита от сколов и царапин",
    },
    {
      title: "Безупречное качество",
      description: "Гарантия до 10 лет. Каждая работа — эталон мастерства",
    },
    {
      title: "Индивидуальный подход",
      description: "Персональный менеджер и удобное время для вашего визита",
    },
  ],
} as const;

// ========================
// QA РЕЖИМ
// ========================
export const QA = {
  buildDate: new Date().toISOString().split('T')[0],
  noIndexPaths: ["/qa", "/qa/", "/qa/*"],
} as const;

// ========================
// ПОЗИЦИОНИРОВАНИЕ
// ========================
export const POSITIONING = {
  tagline: "студия детейлинга, оклейки и тюнинга в Казани",
  full: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
  short: "Детейлинг, оклейка и тюнинг в Казани",
  notAutoService: true, // НЕ автосервис (без ремонта/ТО/диагностики)
} as const;

// ========================
// SEO КОНФИГУРАЦИЯ ПО УСЛУГАМ
// ========================
export interface ServiceSEOConfig {
  slug: string;
  category: "protection" | "detailing" | "tuning";
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  warranty: { display: string; years: number | null };
  timing: { display: string };
  priceFrom: number | null;
  keywords: string[];
}

export const SERVICES_SEO_CONFIG: ServiceSEOConfig[] = [
  {
    slug: "okleyka-avto-poliuretanovoy-plenkoy-kazan",
    category: "protection",
    title: "Антигравийная защита PPF",
    h1: "Оклейка автомобиля полиуретановой плёнкой в Казани",
    metaTitle: "SUNMAXKZN — Оклейка авто полиуретановой плёнкой PPF в Казани",
    metaDescription: "Антигравийная защита кузова плёнкой PPF в Казани. Защита от сколов и царапин. Гарантия до 10 лет. Аккуратные стыки и кромки. Запись по телефону.",
    ogTitle: "Оклейка авто плёнкой PPF в Казани | SUNMAXKZN",
    ogDescription: "Защитите кузов от сколов — антигравийная плёнка с гарантией до 10 лет",
    warranty: { display: "до 10 лет", years: 10 },
    timing: { display: "3–5 дней" },
    priceFrom: 15000,
    keywords: ["антигравийная плёнка ppf Казань", "оклейка ppf Казань", "бронеплёнка Казань", "бронирование кузова плёнкой Казань", "защита лкп от сколов Казань", "оклейка зон риска Казань"],
  },
  {
    slug: "tonirovka-avto-kazan",
    category: "protection",
    title: "Тонировка",
    h1: "Тонировка автомобиля в Казани",
    metaTitle: "SUNMAXKZN — Тонировка авто в Казани | Атермальная, классическая",
    metaDescription: "Профессиональная тонировка стёкол в Казани. Атермальная плёнка, защита от УФ. Гарантия 5 лет. Работы за 2–4 часа. Запись онлайн.",
    ogTitle: "Тонировка авто в Казани | SUNMAXKZN",
    ogDescription: "Тонировка стёкол атермальной плёнкой — комфорт и защита от солнца",
    warranty: { display: "5 лет", years: 5 },
    timing: { display: "2–4 часа" },
    priceFrom: 3000,
    keywords: ["тонировка авто Казань", "тонировка стёкол Казань", "атермальная тонировка Казань", "тонировка задней полусферы Казань", "растонировка Казань"],
  },
  {
    slug: "okleyka-vinilom-kazan",
    category: "protection",
    title: "Оклейка винилом",
    h1: "Оклейка автомобиля винилом в Казани",
    metaTitle: "SUNMAXKZN — Оклейка авто винилом в Казани | Смена цвета",
    metaDescription: "Оклейка автомобиля винилом в Казани — смена цвета кузова. Матовые, глянцевые, текстурные плёнки. Гарантия до 5 лет. Запись по телефону.",
    ogTitle: "Оклейка авто винилом в Казани | SUNMAXKZN",
    ogDescription: "Смена цвета кузова виниловой плёнкой — матовая, глянцевая, карбон",
    warranty: { display: "до 5 лет", years: 5 },
    timing: { display: "4–7 дней" },
    priceFrom: 80000,
    keywords: ["оклейка винилом Казань", "автовинил Казань", "смена цвета плёнкой Казань", "оклейка авто плёнкой Казань", "матовая плёнка Казань", "глянцевая плёнка Казань"],
  },
  {
    slug: "antihrom-kazan",
    category: "protection",
    title: "Антихром",
    h1: "Антихром — оклейка хрома в чёрный в Казани",
    metaTitle: "SUNMAXKZN — Антихром в Казани | Оклейка хрома в чёрный",
    metaDescription: "Антихром в Казани — оклейка хромированных деталей в чёрный. Решётка, молдинги, эмблемы. Аккуратная работа с кромками. Запись онлайн.",
    ogTitle: "Антихром в Казани | SUNMAXKZN",
    ogDescription: "Оклейка хромированных деталей в чёрный — стильный и агрессивный вид",
    warranty: { display: "до 5 лет", years: 5 },
    timing: { display: "1–2 дня" },
    priceFrom: 5000,
    keywords: ["антихром Казань", "оклейка хрома Казань", "хром в чёрный Казань", "затемнение хрома Казань"],
  },
  {
    slug: "okleyka-salona-kazan",
    category: "protection",
    title: "Оклейка салона",
    h1: "Оклейка салона автомобиля в Казани",
    metaTitle: "SUNMAXKZN — Оклейка салона в Казани | Защита интерьера",
    metaDescription: "Оклейка салона автомобиля плёнкой в Казани. Защита глянцевых вставок, декора и экранов. Аккуратные стыки. Запись по телефону.",
    ogTitle: "Оклейка салона в Казани | SUNMAXKZN",
    ogDescription: "Защита элементов салона плёнкой — глянцевые вставки, декор, экраны",
    warranty: { display: "до 3 лет", years: 3 },
    timing: { display: "1–3 дня" },
    priceFrom: 5000,
    keywords: ["оклейка салона Казань", "оклейка элементов салона плёнкой Казань", "защита глянцевых вставок салона Казань"],
  },
  {
    slug: "snyatie-plenki-kazan",
    category: "protection",
    title: "Снятие плёнки",
    h1: "Снятие защитной плёнки с авто в Казани",
    metaTitle: "SUNMAXKZN — Снятие плёнки в Казани | Демонтаж PPF и винила",
    metaDescription: "Снятие защитной плёнки в Казани — демонтаж PPF и винила без повреждения ЛКП. Профессиональный подход. Запись онлайн.",
    ogTitle: "Снятие плёнки в Казани | SUNMAXKZN",
    ogDescription: "Демонтаж плёнки без повреждения лакокрасочного покрытия",
    warranty: { display: "—", years: null },
    timing: { display: "1–2 дня" },
    priceFrom: 10000,
    keywords: ["снятие плёнки Казань", "демонтаж плёнки Казань", "снять винил Казань", "снять ppf Казань"],
  },
  {
    slug: "deteyling-kazan",
    category: "detailing",
    title: "Детейлинг",
    h1: "Полный детейлинг автомобиля в Казани",
    metaTitle: "SUNMAXKZN — Детейлинг в Казани | Полировка, химчистка, защита",
    metaDescription: "Детейлинг автомобиля в Казани — полировка кузова, химчистка салона, нанесение керамики. Гарантия 1 год. Запись по телефону.",
    ogTitle: "Детейлинг в Казани | SUNMAXKZN",
    ogDescription: "Полный детейлинг — полировка, химчистка, нанесение защитных составов",
    warranty: { display: "1 год", years: 1 },
    timing: { display: "1–2 дня" },
    priceFrom: 15000,
    keywords: ["детейлинг Казань", "детейлинг авто Казань", "полировка кузова Казань", "химчистка салона Казань"],
  },
  {
    slug: "aktivnyy-vyhlop-kazan",
    category: "tuning",
    title: "Активный выхлоп",
    h1: "Установка активного выхлопа в Казани",
    metaTitle: "SUNMAXKZN — Активный выхлоп в Казани | Управляемый звук",
    metaDescription: "Установка активного выхлопа в Казани. Электронные заслонки, управление со смартфона. Гарантия 2 года. Запись онлайн.",
    ogTitle: "Активный выхлоп в Казани | SUNMAXKZN",
    ogDescription: "Управляемый звук выхлопа — тихий режим для города, спортивный для трассы",
    warranty: { display: "2 года", years: 2 },
    timing: { display: "1–2 дня" },
    priceFrom: 45000,
    keywords: ["активный выхлоп Казань", "активный звук выхлопа Казань", "установка активного выхлопа Казань", "заслонки на выхлоп Казань"],
  },
  {
    slug: "shumoizolyaciya-avto-kazan",
    category: "tuning",
    title: "Шумоизоляция",
    h1: "Шумоизоляция автомобиля в Казани",
    metaTitle: "SUNMAXKZN — Шумоизоляция авто в Казани | Комфорт премиум-класса",
    metaDescription: "Комплексная шумоизоляция авто в Казани. Виброизоляция дверей, пола, багажника. Гарантия 3 года. Запись по телефону.",
    ogTitle: "Шумоизоляция авто в Казани | SUNMAXKZN",
    ogDescription: "Комплексная шумо- и виброизоляция — тишина премиум-класса в салоне",
    warranty: { display: "3 года", years: 3 },
    timing: { display: "2–5 дней" },
    priceFrom: 25000,
    keywords: ["шумоизоляция авто Казань", "виброшумоизоляция Казань", "шумоизоляция дверей Казань", "шумоизоляция пола Казань", "шумоизоляция багажника Казань"],
  },
  {
    slug: "udalenie-vmyatin-bez-pokraski-kazan",
    category: "tuning",
    title: "Удаление вмятин PDR",
    h1: "Удаление вмятин без покраски PDR в Казани",
    metaTitle: "SUNMAXKZN — Удаление вмятин без покраски в Казани | PDR",
    metaDescription: "Удаление вмятин без покраски (PDR) в Казани. Сохранение заводского ЛКП. Пожизненная гарантия. Результат за 1 день. Запись онлайн.",
    ogTitle: "Удаление вмятин без покраски в Казани | SUNMAXKZN",
    ogDescription: "Беспокрасочное удаление вмятин — сохранение заводского ЛКП",
    warranty: { display: "пожизненная", years: null },
    timing: { display: "от 3 часов" },
    priceFrom: 3000,
    keywords: ["удаление вмятин без покраски Казань", "pdr Казань", "выпрямление вмятин без покраски Казань", "удаление вмятин Казань"],
  },
  {
    slug: "ustanovka-signalizacii-pandora-kazan",
    category: "tuning",
    title: "Сигнализации Pandora",
    h1: "Установка сигнализации Pandora в Казани",
    metaTitle: "SUNMAXKZN — Установка сигнализации Pandora в Казани",
    metaDescription: "Установка сигнализации Pandora в Казани. Автозапуск, GPS-мониторинг, управление со смартфона. Гарантия 3 года. Запись по телефону.",
    ogTitle: "Установка сигнализации Pandora в Казани | SUNMAXKZN",
    ogDescription: "Охранные системы Pandora с автозапуском и GPS-мониторингом",
    warranty: { display: "3 года", years: 3 },
    timing: { display: "1 день" },
    priceFrom: 35000,
    keywords: ["установка Pandora Казань", "сигнализация Pandora установка Казань", "установка автосигнализации Казань", "pandora Казань"],
  },
];

// Хелпер для получения конфига услуги по slug
export const getServiceSEOConfig = (slug: string): ServiceSEOConfig | undefined => {
  return SERVICES_SEO_CONFIG.find((s) => s.slug === slug);
};

// Категории услуг
export const SERVICE_CATEGORIES = {
  protection: {
    name: "Оклейка и защита",
    description: "Защита кузова и элементов плёнкой",
  },
  detailing: {
    name: "Детейлинг",
    description: "Полировка, химчистка, защитные покрытия",
  },
  tuning: {
    name: "Тюнинг и доп.оборудование",
    description: "Выхлоп, шумоизоляция, сигнализации",
  },
} as const;

// ========================
// ПРЕМИАЛЬНЫЕ БЛОКИ
// ========================
export const WHY_SUNMAXKZN = {
  title: "Почему выбирают SUNMAXKZN",
  items: [
    {
      icon: "Scissors",
      title: "Аккуратная работа с кромками и стыками",
      description: "Каждый шов и край — ровный и незаметный",
    },
    {
      icon: "Sparkles",
      title: "Чистая зона оклейки и контроль качества",
      description: "Работаем в закрытом боксе с контролем пыли",
    },
    {
      icon: "Award",
      title: "Материалы и расходники премиум-класса",
      description: "Используем только проверенные плёнки и составы",
    },
    {
      icon: "Clock",
      title: "Прозрачные сроки и понятный результат",
      description: "Точные сроки работ и согласование до старта",
    },
    {
      icon: "Shield",
      title: "Гарантия на работы и материалы",
      description: "Гарантия от 1 до 10 лет в зависимости от услуги",
    },
    {
      icon: "Camera",
      title: "Фотоотчёт и рекомендации по уходу",
      description: "Полный отчёт о работе и инструкции по уходу",
    },
  ],
} as const;

export const HOW_WE_WORK = {
  title: "Как проходит работа",
  steps: [
    {
      step: 1,
      title: "Заявка и консультация",
      description: "Уточняем задачу, подбираем решение под ваш автомобиль",
    },
    {
      step: 2,
      title: "Осмотр и расчёт",
      description: "Согласуем материалы, сроки и стоимость работ",
    },
    {
      step: 3,
      title: "Работы в студии",
      description: "Выполняем оклейку/детейлинг по регламенту качества",
    },
    {
      step: 4,
      title: "Выдача и гарантия",
      description: "Сдаём авто, даём рекомендации по уходу и гарантийный талон",
    },
  ],
} as const;

// ========================
// НАВИГАЦИЯ
// ========================
export const NAVIGATION = {
  header: [
    { href: "/", label: "Главная", hasDropdown: false },
    { href: "/services", label: "Услуги", hasDropdown: true },
    { href: "/cases", label: "Портфолио", hasDropdown: false },
    { href: "/price", label: "Цены", hasDropdown: false },
    { href: "/faq", label: "FAQ", hasDropdown: false },
    { href: "/about", label: "О нас", hasDropdown: false },
    { href: "/contacts", label: "Контакты", hasDropdown: false },
  ] as const,
  servicesDropdown: {
    groups: [
      {
        title: "Оклейка и защита",
        items: [
          { href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Антигравийная защита PPF" },
          { href: "/okleyka-vinilom-kazan", label: "Оклейка винилом" },
          { href: "/antihrom-kazan", label: "Антихром" },
          { href: "/okleyka-salona-kazan", label: "Оклейка салона" },
          { href: "/snyatie-plenki-kazan", label: "Снятие плёнки" },
        ],
      },
      {
        title: "Детейлинг",
        items: [
          { href: "/deteyling-kazan", label: "Детейлинг" },
          { href: "/tonirovka-avto-kazan", label: "Тонировка" },
        ],
      },
      {
        title: "Тюнинг и доп.оборудование",
        items: [
          { href: "/aktivnyy-vyhlop-kazan", label: "Активный выхлоп" },
          { href: "/shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
          { href: "/udalenie-vmyatin-bez-pokraski-kazan", label: "Удаление вмятин PDR" },
          { href: "/ustanovka-signalizacii-pandora-kazan", label: "Сигнализации Pandora" },
        ],
      },
    ],
    allServicesLink: { href: "/services", label: "Все услуги" },
  },
  mobileQuickActions: [
    { href: "/contacts", label: "Записаться", icon: "Calendar" },
    { href: "https://wa.me/79038687861", label: "WhatsApp", icon: "MessageCircle", external: true },
    { href: "tel:+79038687861", label: "Позвонить", icon: "Phone" },
  ],
  footer: {
    services: [
      { href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Защита кузова PPF" },
      { href: "/okleyka-vinilom-kazan", label: "Оклейка винилом" },
      { href: "/antihrom-kazan", label: "Антихром" },
      { href: "/tonirovka-avto-kazan", label: "Тонировка" },
      { href: "/aktivnyy-vyhlop-kazan", label: "Активный выхлоп" },
      { href: "/shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
      { href: "/udalenie-vmyatin-bez-pokraski-kazan", label: "Удаление вмятин PDR" },
    ],
    pages: [
      { href: "/services", label: "Все услуги" },
      { href: "/price", label: "Цены" },
      { href: "/cases", label: "Портфолио" },
      { href: "/faq", label: "Вопросы и ответы" },
      { href: "/blog", label: "Блог" },
      { href: "/about", label: "О компании" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
} as const;

// ========================
// ХЕЛПЕРЫ
// ========================

/**
 * Получить ссылку на WhatsApp с сообщением
 */
export const getWhatsAppLink = (message?: string): string => {
  const base = `https://wa.me/${CONTACT.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/**
 * Получить ссылку на телефон
 */
export const getPhoneLink = (): string => {
  return `tel:${CONTACT.phone.raw}`;
};

/**
 * Получить ссылку на карту
 */
export const getMapLink = (): string => {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(CONTACT.address.full)}`;
};
