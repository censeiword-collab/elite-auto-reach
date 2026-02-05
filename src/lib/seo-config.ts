// =============================================================
// SUNMAXKZN — Единый источник SEO-данных (Single Source of Truth)
// Все title/h1/description берутся ТОЛЬКО отсюда
// =============================================================

import { SERVICES_SEO_CONFIG } from "./constants";

// ========================
// SANITIZE TEXT (P0 — обязательно)
// ========================

/**
 * Санитайзинг текста: убирает переносы строк, артефакты L2/L3, нормализует пробелы
 */
export const sanitizeText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\\n/g, " ")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/L\d+:\s*/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

// ========================
// ТИПЫ
// ========================
export interface PageSEOConfig {
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  type: "static" | "dynamic";
  category?: "main" | "service" | "info";
}

export interface QARouteExport {
  url: string;
  title: string;
  h1: string;
  type: "static" | "dynamic";
  requiresAuth: boolean;
}

export interface QAContentExport {
  url: string;
  title: string;
  h1: string;
  mainText: string[];
  ctaButtons: string[];
  formLabels: string[];
  errorMessages: string[];
  keyFacts: Record<string, string>;
}

// ========================
// ЕДИНАЯ СТРОКА ПОЗИЦИОНИРОВАНИЯ (SSOT)
// ========================
export const UNIFIED_POSITIONING = {
  title: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
  h1: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
  short: "студия детейлинга, оклейки и тюнинга в Казани",
} as const;

// ========================
// ГЛОБАЛЬНЫЕ SEO-КОНФИГИ СТАТИЧЕСКИХ СТРАНИЦ
// ========================
export const GLOBAL_SEO_CONFIG: PageSEOConfig[] = [
  {
    path: "/",
    title: UNIFIED_POSITIONING.title,
    h1: UNIFIED_POSITIONING.h1,
    metaDescription: "Профессиональный детейлинг и тюнинг автомобилей премиум-класса в Казани. Оклейка PPF, активный выхлоп, шумоизоляция, PDR, сигнализации Pandora. Гарантия до 10 лет.",
    type: "static",
    category: "main",
  },
  {
    path: "/services",
    title: "SUNMAXKZN — Все услуги детейлинга, оклейки и тюнинга в Казани",
    h1: "Все услуги SUNMAXKZN",
    metaDescription: "Каталог услуг SUNMAXKZN: оклейка PPF, винил, антихром, тонировка, детейлинг, шумоизоляция, активный выхлоп, PDR, Pandora. Запись онлайн в Казани.",
    type: "static",
    category: "main",
  },
  {
    path: "/price",
    title: "SUNMAXKZN — Цены на детейлинг, оклейку и тюнинг в Казани",
    h1: "Прайс-лист на услуги",
    metaDescription: "Цены на детейлинг, оклейку, тюнинг и установку оборудования в Казани. Прозрачное ценообразование. Гарантия до 10 лет — зависит от услуги.",
    type: "static",
    category: "main",
  },
  {
    path: "/cases",
    title: "SUNMAXKZN — Портфолио работ по детейлингу и оклейке в Казани",
    h1: "Портфолио работ",
    metaDescription: "Примеры работ SUNMAXKZN: оклейка PPF, винил, детейлинг, шумоизоляция. Фото до и после. Реальные проекты в Казани.",
    type: "static",
    category: "main",
  },
  {
    path: "/calculator",
    title: "SUNMAXKZN — Калькулятор стоимости услуг в Казани",
    h1: "Рассчитайте стоимость услуг",
    metaDescription: "Онлайн-калькулятор стоимости оклейки, детейлинга и тюнинга в Казани. Получите точный расчёт за 1 минуту.",
    type: "static",
    category: "info",
  },
  {
    path: "/about",
    title: "SUNMAXKZN — О студии детейлинга и оклейки в Казани",
    h1: "О студии SUNMAXKZN",
    metaDescription: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани. 8+ лет опыта, 2500+ автомобилей, гарантия до 10 лет.",
    type: "static",
    category: "info",
  },
  {
    path: "/contacts",
    title: "SUNMAXKZN — Контакты студии детейлинга в Казани",
    h1: "Свяжитесь с нами",
    metaDescription: "Контакты студии SUNMAXKZN в Казани. Телефон +7 (903) 868-78-61. Запись на оклейку, детейлинг, шумоизоляцию.",
    type: "static",
    category: "info",
  },
  {
    path: "/faq",
    title: "SUNMAXKZN — Частые вопросы о детейлинге и оклейке в Казани",
    h1: "Ответы на частые вопросы",
    metaDescription: "Ответы на вопросы об оклейке PPF, тонировке, шумоизоляции, гарантии и ценах. FAQ студии SUNMAXKZN в Казани.",
    type: "static",
    category: "info",
  },
  {
    path: "/blog",
    title: "SUNMAXKZN — Блог о детейлинге и уходе за авто в Казани",
    h1: "Полезные статьи",
    metaDescription: "Статьи о детейлинге, оклейке и тюнинге автомобилей. Советы по уходу за авто от экспертов SUNMAXKZN.",
    type: "static",
    category: "info",
  },
  {
    path: "/privacy",
    title: "SUNMAXKZN — Политика конфиденциальности",
    h1: "Политика конфиденциальности",
    metaDescription: "Политика обработки персональных данных SUNMAXKZN. Защита информации клиентов.",
    type: "static",
    category: "info",
  },
  {
    path: "/qa",
    title: "QA Dashboard | SUNMAXKZN",
    h1: "QA Testing Dashboard",
    metaDescription: "Панель для тестирования и проверки сайта SUNMAXKZN.",
    type: "static",
    category: "info",
  },
];

// ========================
// ХЕЛПЕРЫ
// ========================

export const getPageSEO = (path: string): PageSEOConfig | undefined => {
  const page = GLOBAL_SEO_CONFIG.find((p) => p.path === path);
  if (!page) return undefined;
  return {
    ...page,
    title: sanitizeText(page.title),
    h1: sanitizeText(page.h1),
    metaDescription: sanitizeText(page.metaDescription),
  };
};

export const getServiceSEO = (slug: string) => {
  const service = SERVICES_SEO_CONFIG.find((s) => s.slug === slug);
  if (!service) return undefined;
  return {
    ...service,
    metaTitle: sanitizeText(service.metaTitle),
    h1: sanitizeText(service.h1),
    metaDescription: sanitizeText(service.metaDescription),
  };
};

export const getAllPublicPages = (): PageSEOConfig[] => {
  const staticPages = GLOBAL_SEO_CONFIG.filter(p => p.path !== "/qa");
  const servicePages: PageSEOConfig[] = SERVICES_SEO_CONFIG.map((s) => ({
    path: `/${s.slug}`,
    title: sanitizeText(s.metaTitle),
    h1: sanitizeText(s.h1),
    metaDescription: sanitizeText(s.metaDescription),
    type: "dynamic" as const,
    category: "service" as const,
  }));
  return [...staticPages, ...servicePages];
};

export const getAllQARoutes = (): QARouteExport[] => {
  const routes: QARouteExport[] = [];
  
  GLOBAL_SEO_CONFIG.forEach((page) => {
    routes.push({
      url: page.path,
      title: sanitizeText(page.title),
      h1: sanitizeText(page.h1),
      type: page.type,
      requiresAuth: false,
    });
  });
  
  SERVICES_SEO_CONFIG.forEach((service) => {
    routes.push({
      url: `/${service.slug}`,
      title: sanitizeText(service.metaTitle),
      h1: sanitizeText(service.h1),
      type: "dynamic",
      requiresAuth: false,
    });
  });
  
  return routes;
};

export const generateRoutesJSON = (): string => {
  return JSON.stringify(getAllQARoutes(), null, 2);
};

export const generateContentJSON = (): string => {
  const content: QAContentExport[] = [];
  
  const homeSEO = getPageSEO("/");
  if (homeSEO) {
    content.push({
      url: "/",
      title: homeSEO.title,
      h1: homeSEO.h1,
      mainText: [
        "Студия детейлинга, оклейки и тюнинга",
        "Студия для автомобилей бизнес- и премиум-класса",
        "Профессиональная защита кузова, тюнинг выхлопа, шумоизоляция и установка охранных систем",
        "8+ лет опыта",
        "2500+ автомобилей",
        "Гарантия до 10 лет",
        "Плёнки премиум-сегмента",
      ],
      ctaButtons: ["Записаться", "Наши работы", "Рассчитать стоимость"],
      formLabels: ["Ваше имя *", "Телефон *", "Сообщение"],
      errorMessages: ["Имя должно быть минимум 2 символа", "Введите корректный номер телефона"],
      keyFacts: {
        warranty: "до 10 лет",
        phone: "+7 (903) 868-78-61",
        workingHours: "Ежедневно 9:00 — 21:00",
      },
    });
  }
  
  const servicesSEO = getPageSEO("/services");
  if (servicesSEO) {
    content.push({
      url: "/services",
      title: servicesSEO.title,
      h1: servicesSEO.h1,
      mainText: [
        "Каталог всех услуг студии",
        "Оклейка и защита",
        "Детейлинг",
        "Тюнинг и доп.оборудование",
      ],
      ctaButtons: ["Подробнее", "Записаться на консультацию", "Рассчитать стоимость"],
      formLabels: [],
      errorMessages: [],
      keyFacts: {},
    });
  }
  
  const priceSEO = getPageSEO("/price");
  if (priceSEO) {
    content.push({
      url: "/price",
      title: priceSEO.title,
      h1: priceSEO.h1,
      mainText: [
        "Прозрачное ценообразование без скрытых платежей",
        "Цены указаны ориентировочно и зависят от марки и модели автомобиля",
        "Точную стоимость рассчитаем после осмотра автомобиля",
        "Предоставляем гарантию на все виды работ",
      ],
      ctaButtons: ["Подробнее об услуге", "Рассчитать для моего авто"],
      formLabels: [],
      errorMessages: [],
      keyFacts: { warranty: "гарантия на все виды работ", priceFormat: "от X ₽" },
    });
  }
  
  const casesSEO = getPageSEO("/cases");
  if (casesSEO) {
    content.push({
      url: "/cases",
      title: casesSEO.title,
      h1: casesSEO.h1,
      mainText: ["Портфолио выполненных проектов", "Фотографии до и после", "Реальные примеры работ"],
      ctaButtons: ["Смотреть все работы", "Записаться"],
      formLabels: [],
      errorMessages: [],
      keyFacts: {},
    });
  }
  
  const calcSEO = getPageSEO("/calculator");
  if (calcSEO) {
    content.push({
      url: "/calculator",
      title: calcSEO.title,
      h1: calcSEO.h1,
      mainText: ["Выберите автомобиль", "Выберите услуги", "Расчётная стоимость", "Получите точный расчёт за 1 минуту"],
      ctaButtons: ["Далее", "Назад", "Рассчитать", "Получить точный расчёт", "Отправить заявку"],
      formLabels: ["Марка", "Модель", "Ваше имя *", "Телефон *", "Комментарий"],
      errorMessages: ["Выберите марку автомобиля", "Выберите модель", "Имя должно быть минимум 2 символа", "Введите корректный номер телефона"],
      keyFacts: {},
    });
  }
  
  const aboutSEO = getPageSEO("/about");
  if (aboutSEO) {
    content.push({
      url: "/about",
      title: aboutSEO.title,
      h1: aboutSEO.h1,
      mainText: ["Студия детейлинга, оклейки и тюнинга в Казани", "Более 8 лет на рынке", "Специализация на автомобилях бизнес- и премиум-класса", "Работаем только с премиальными материалами"],
      ctaButtons: ["Связаться с нами", "Наши работы"],
      formLabels: [],
      errorMessages: [],
      keyFacts: { experience: "8+ лет", cars: "2500+ автомобилей" },
    });
  }
  
  const contactsSEO = getPageSEO("/contacts");
  if (contactsSEO) {
    content.push({
      url: "/contacts",
      title: contactsSEO.title,
      h1: contactsSEO.h1,
      mainText: ["Приезжайте к нам или оставьте заявку — мы свяжемся с вами в течение 15 минут", "+7 (903) 868-78-61", "Ежедневно 9:00 — 21:00"],
      ctaButtons: ["Отправить заявку", "WhatsApp", "Telegram"],
      formLabels: ["Ваше имя *", "Телефон *", "Интересующая услуга", "Email", "Сообщение"],
      errorMessages: ["Имя должно быть минимум 2 символа", "Введите корректный номер телефона", "Введите корректный email"],
      keyFacts: { phone: "+7 (903) 868-78-61", workingHours: "Ежедневно 9:00 — 21:00", callbackTime: "в течение 15 минут" },
    });
  }
  
  const faqSEO = getPageSEO("/faq");
  if (faqSEO) {
    content.push({
      url: "/faq",
      title: faqSEO.title,
      h1: faqSEO.h1,
      mainText: ["Собрали ответы на популярные вопросы о наших услугах, гарантии, сроках и оплате", "Общие вопросы", "Защитная плёнка PPF", "Сроки выполнения", "Гарантия и качество"],
      ctaButtons: ["Задать вопрос", "+7 (903) 868-78-61"],
      formLabels: [],
      errorMessages: [],
      keyFacts: { warrantyPPF: "до 10 лет", warrantySoundproofing: "3 года", warrantyEquipment: "2 года", warrantyPDR: "пожизненная" },
    });
  }
  
  const blogSEO = getPageSEO("/blog");
  if (blogSEO) {
    content.push({
      url: "/blog",
      title: blogSEO.title,
      h1: blogSEO.h1,
      mainText: ["Статьи о детейлинге и уходе за автомобилем", "Советы экспертов", "Обзоры материалов и технологий"],
      ctaButtons: ["Читать статью"],
      formLabels: [],
      errorMessages: [],
      keyFacts: {},
    });
  }
  
  const privacySEO = getPageSEO("/privacy");
  if (privacySEO) {
    content.push({
      url: "/privacy",
      title: privacySEO.title,
      h1: privacySEO.h1,
      mainText: ["Защита персональных данных", "Правовая информация"],
      ctaButtons: [],
      formLabels: [],
      errorMessages: [],
      keyFacts: {},
    });
  }
  
  SERVICES_SEO_CONFIG.forEach((service) => {
    content.push({
      url: `/${service.slug}`,
      title: sanitizeText(service.metaTitle),
      h1: sanitizeText(service.h1),
      mainText: [
        sanitizeText(service.metaDescription),
        `Гарантия ${service.warranty.display}`,
        `Сроки: ${service.timing.display}`,
      ],
      ctaButtons: ["Рассчитать за 1 минуту", "+7 (903) 868-78-61"],
      formLabels: [],
      errorMessages: [],
      keyFacts: {
        warranty: service.warranty.display,
        timing: service.timing.display,
        priceFrom: service.priceFrom ? `от ${service.priceFrom.toLocaleString("ru-RU")} ₽` : "",
      },
    });
  });
  
  return JSON.stringify(content, null, 2);
};

export const generateSitemapHTML = (): string => {
  const routes = getAllQARoutes();
  const publicRoutes = routes.filter(r => r.url !== "/qa");
  const serviceRoutes = routes.filter(r => r.type === "dynamic");
  const staticRoutes = publicRoutes.filter(r => r.type === "static");
  
  const escapeHtml = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  const renderRow = (route: QARouteExport, badgeClass: string, badgeText: string) => `
    <tr>
      <td><a href="${route.url}">${route.url}</a></td>
      <td>${escapeHtml(route.title)}</td>
      <td>${escapeHtml(route.h1)}</td>
      <td><span class="badge ${badgeClass}">${badgeText}</span></td>
    </tr>`;
  
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>SUNMAXKZN — Карта сайта для QA</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #e5e5e5; }
    h1 { color: #EA580C; margin-bottom: 10px; font-size: 24px; }
    .subtitle { color: #737373; margin-bottom: 30px; }
    h2 { color: #d4d4d4; margin: 30px 0 15px; font-size: 18px; border-bottom: 1px solid #262626; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th, td { padding: 12px; border: 1px solid #262626; text-align: left; vertical-align: top; }
    th { background: #171717; font-weight: 600; color: #a3a3a3; }
    tr:hover { background: #171717; }
    a { color: #EA580C; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    .badge-static { background: #166534; color: #86efac; }
    .badge-dynamic { background: #1e40af; color: #93c5fd; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #262626; color: #737373; font-size: 14px; }
    code { background: #262626; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>🧪 SUNMAXKZN — Карта сайта для QA</h1>
  <p class="subtitle">Полный список страниц для проверки. Генерируется из единого источника (SSOT).</p>

  <h2>📄 Публичные страницы (${staticRoutes.length})</h2>
  <table>
    <tr><th style="width:20%">URL</th><th style="width:35%">Title</th><th style="width:35%">H1</th><th style="width:10%">Тип</th></tr>
${staticRoutes.map(r => renderRow(r, "badge-static", "static")).join("")}
  </table>

  <h2>🔧 Страницы услуг (${serviceRoutes.length})</h2>
  <table>
    <tr><th style="width:20%">URL</th><th style="width:35%">Title</th><th style="width:35%">H1</th><th style="width:10%">Тип</th></tr>
${serviceRoutes.map(r => renderRow(r, "badge-dynamic", "dynamic")).join("")}
  </table>

  <h2>🧪 QA Инструменты</h2>
  <table>
    <tr><th>URL</th><th>Описание</th></tr>
    <tr><td><a href="/qa">/qa</a></td><td>QA Dashboard — интерактивная панель для тестирования</td></tr>
    <tr><td><a href="/qa/routes.json">/qa/routes.json</a></td><td>JSON-экспорт всех роутов с метаданными</td></tr>
    <tr><td><a href="/qa/content.json">/qa/content.json</a></td><td>JSON-экспорт контента для проверки</td></tr>
  </table>

  <div class="footer">
    <p>Для включения QA-режима добавьте <code>?qa=1</code> к URL или откройте <a href="/qa">/qa</a></p>
    <p>В QA-режиме формы не отправляются в базу — payload отображается на экране.</p>
    <p><strong>Всего страниц:</strong> ${staticRoutes.length} публичных + ${serviceRoutes.length} услуг</p>
  </div>
</body>
</html>`;
};