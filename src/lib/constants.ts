// =============================================================
// SUNMAXKZN — Единый файл констант
// Все контактные данные, гарантии, сроки, форматы цен
// =============================================================

// ========================
// БРЕНД И КОНТАКТЫ
// ========================
export const BRAND = {
  name: "SUNMAXKZN",
  fullName: "SUNMAXKZN — Премиальная автостудия детейлинга и тюнинга",
  tagline: "Защита. Тюнинг. Комфорт.",
  description: "Профессиональный детейлинг и тюнинг автомобилей премиум-класса в Казани",
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
      description: "Премиальные плёнки XPEL, SunTek — надёжная защита от сколов и царапин",
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
  buildDate: new Date().toISOString().split('T')[0], // Автоматическая дата
  noIndexPaths: ["/qa", "/qa/", "/qa/*"],
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
