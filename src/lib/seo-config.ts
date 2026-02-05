 // =============================================================
 // SUNMAXKZN — Единый источник SEO-данных (Single Source of Truth)
 // Используется для страниц сайта, QA-экспортов и sitemap
 // =============================================================
 
 import { SERVICES_SEO_CONFIG, POSITIONING } from "./constants";
 
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
 // ГЛОБАЛЬНЫЕ SEO-КОНФИГИ СТРАНИЦ
 // ========================
 export const GLOBAL_SEO_CONFIG: PageSEOConfig[] = [
   {
     path: "/",
     title: `SUNMAXKZN — ${POSITIONING.tagline.charAt(0).toUpperCase() + POSITIONING.tagline.slice(1)}`,
     h1: "SUNMAXKZN — Детейлинг, оклейка и тюнинг в Казани",
     metaDescription: "Профессиональный детейлинг и тюнинг автомобилей премиум-класса в Казани. Оклейка PPF, активный выхлоп, шумоизоляция, PDR, сигнализации Pandora. Гарантия до 10 лет.",
     type: "static",
     category: "main",
   },
   {
     path: "/services",
     title: "SUNMAXKZN — Все услуги детейлинга и тюнинга в Казани",
     h1: "Все услуги SUNMAXKZN",
     metaDescription: "Каталог услуг SUNMAXKZN: оклейка PPF, винил, антихром, тонировка, детейлинг, шумоизоляция, активный выхлоп, PDR, сигнализации Pandora. Записаться онлайн.",
     type: "static",
     category: "main",
   },
   {
     path: "/price",
     title: "Цены на услуги | SUNMAXKZN Казань",
     h1: "Прайс-лист на услуги",
     metaDescription: "Цены на детейлинг, оклейку, тюнинг и установку оборудования в Казани. Прозрачное ценообразование. Гарантия на все работы.",
     type: "static",
     category: "main",
   },
   {
     path: "/cases",
     title: "Наши работы | SUNMAXKZN Казань",
     h1: "Портфолио работ",
     metaDescription: "Примеры работ SUNMAXKZN: оклейка PPF, винил, детейлинг, шумоизоляция. Фото до и после. Реальные проекты в Казани.",
     type: "static",
     category: "main",
   },
   {
     path: "/calculator",
     title: "Калькулятор стоимости | SUNMAXKZN Казань",
     h1: "Рассчитайте стоимость услуг",
     metaDescription: "Онлайн-калькулятор стоимости оклейки, детейлинга и тюнинга в Казани. Получите точный расчёт за 1 минуту.",
     type: "static",
     category: "info",
   },
   {
     path: "/about",
     title: "О нас | SUNMAXKZN Казань",
     h1: "О студии SUNMAXKZN",
     metaDescription: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани. 8+ лет опыта, 2500+ автомобилей, гарантия до 10 лет.",
     type: "static",
     category: "info",
   },
   {
     path: "/contacts",
     title: "Контакты | SUNMAXKZN Казань",
     h1: "Свяжитесь с нами",
     metaDescription: "Контакты студии SUNMAXKZN в Казани. Телефон +7 (903) 868-78-61. Запись на оклейку, детейлинг, шумоизоляцию.",
     type: "static",
     category: "info",
   },
   {
     path: "/faq",
     title: "Частые вопросы | SUNMAXKZN Казань",
     h1: "Ответы на частые вопросы",
     metaDescription: "Ответы на вопросы об оклейке PPF, тонировке, шумоизоляции, гарантии и ценах. FAQ студии SUNMAXKZN в Казани.",
     type: "static",
     category: "info",
   },
   {
     path: "/blog",
     title: "Блог | SUNMAXKZN Казань",
     h1: "Полезные статьи",
     metaDescription: "Статьи о детейлинге, оклейке и тюнинге автомобилей. Советы по уходу за авто от экспертов SUNMAXKZN.",
     type: "static",
     category: "info",
   },
   {
     path: "/privacy",
     title: "Политика конфиденциальности | SUNMAXKZN",
     h1: "Политика конфиденциальности",
     metaDescription: "Политика обработки персональных данных SUNMAXKZN. Защита информации клиентов.",
     type: "static",
     category: "info",
   },
 ];
 
 // ========================
 // ХЕЛПЕРЫ
 // ========================
 
 /**
  * Получить SEO-конфиг страницы по пути
  */
 export const getPageSEO = (path: string): PageSEOConfig | undefined => {
   return GLOBAL_SEO_CONFIG.find((p) => p.path === path);
 };
 
 /**
  * Получить SEO-конфиг услуги по slug
  */
 export const getServiceSEO = (slug: string) => {
   return SERVICES_SEO_CONFIG.find((s) => s.slug === slug);
 };
 
 /**
  * Получить все публичные страницы для sitemap
  */
 export const getAllPublicPages = (): PageSEOConfig[] => {
   const staticPages = GLOBAL_SEO_CONFIG;
   const servicePages: PageSEOConfig[] = SERVICES_SEO_CONFIG.map((s) => ({
     path: `/${s.slug}`,
     title: s.metaTitle,
     h1: s.h1,
     metaDescription: s.metaDescription,
     type: "dynamic" as const,
     category: "service" as const,
   }));
   return [...staticPages, ...servicePages];
 };
 
 /**
  * Генерация routes.json для QA
  */
 export const generateRoutesJSON = (): string => {
   const routes: QARouteExport[] = [];
   
   // Static pages
   GLOBAL_SEO_CONFIG.forEach((page) => {
     routes.push({
       url: page.path,
       title: page.title,
       h1: page.h1,
       type: page.type,
       requiresAuth: false,
     });
   });
   
   // Service pages
   SERVICES_SEO_CONFIG.forEach((service) => {
     routes.push({
       url: `/${service.slug}`,
       title: service.metaTitle,
       h1: service.h1,
       type: "dynamic",
       requiresAuth: false,
     });
   });
   
   // QA page
   routes.push({
     url: "/qa",
     title: "QA Dashboard | SUNMAXKZN",
     h1: "QA Testing Dashboard",
     type: "static",
     requiresAuth: false,
   });
   
   return JSON.stringify(routes, null, 2);
 };
 
 /**
  * Генерация content.json для QA
  */
 export const generateContentJSON = (): string => {
   const content: QAContentExport[] = [];
   
   // Home page
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
         "10 лет гарантии",
       ],
       ctaButtons: ["Записаться", "Наши работы", "Открыть калькулятор", "Позвонить", "WhatsApp"],
       formLabels: ["Ваше имя *", "Телефон *", "Сообщение"],
       errorMessages: ["Имя должно быть минимум 2 символа", "Введите корректный номер телефона"],
       keyFacts: {
         warranty: "до 10 лет",
         phone: "+7 (903) 868-78-61",
         workingHours: "Ежедневно 9:00 — 21:00",
       },
     });
   }
   
   // Services catalog
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
   
   // Price page
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
       ctaButtons: ["Подробнее об услуге", "Рассчитать для моего авто", "Рассчитать стоимость"],
       formLabels: [],
       errorMessages: [],
       keyFacts: {
         warranty: "гарантия на все виды работ",
         priceFormat: "от X ₽",
       },
     });
   }
   
   // Cases page
   const casesSEO = getPageSEO("/cases");
   if (casesSEO) {
     content.push({
       url: "/cases",
       title: casesSEO.title,
       h1: casesSEO.h1,
       mainText: [
         "Портфолио выполненных проектов",
         "Фотографии до и после",
         "Реальные примеры работ",
       ],
       ctaButtons: ["Смотреть все работы", "Записаться"],
       formLabels: [],
       errorMessages: [],
       keyFacts: {},
     });
   }
   
   // Calculator page
   const calcSEO = getPageSEO("/calculator");
   if (calcSEO) {
     content.push({
       url: "/calculator",
       title: calcSEO.title,
       h1: calcSEO.h1,
       mainText: [
         "Выберите автомобиль",
         "Выберите услуги",
         "Расчётная стоимость",
         "Получите точный расчёт за 1 минуту",
       ],
       ctaButtons: ["Далее", "Назад", "Рассчитать", "Получить точный расчёт", "Отправить заявку"],
       formLabels: ["Марка", "Модель", "Ваше имя *", "Телефон *", "Комментарий"],
       errorMessages: ["Выберите марку автомобиля", "Выберите модель", "Имя должно быть минимум 2 символа", "Введите корректный номер телефона"],
       keyFacts: {},
     });
   }
   
   // About page
   const aboutSEO = getPageSEO("/about");
   if (aboutSEO) {
     content.push({
       url: "/about",
       title: aboutSEO.title,
       h1: aboutSEO.h1,
       mainText: [
         "Студия детейлинга, оклейки и тюнинга в Казани",
         "Более 8 лет на рынке",
         "Специализация на автомобилях бизнес- и премиум-класса",
         "Работаем только с премиальными материалами",
       ],
       ctaButtons: ["Связаться с нами", "Наши работы"],
       formLabels: [],
       errorMessages: [],
       keyFacts: {
         experience: "8+ лет",
         cars: "2500+ автомобилей",
       },
     });
   }
   
   // Contacts page
   const contactsSEO = getPageSEO("/contacts");
   if (contactsSEO) {
     content.push({
       url: "/contacts",
       title: contactsSEO.title,
       h1: contactsSEO.h1,
       mainText: [
         "Приезжайте к нам или оставьте заявку — мы свяжемся с вами в течение 15 минут",
         "+7 (903) 868-78-61",
         "Звоните с 9:00 до 21:00",
         "info@sunmaxkzn.ru",
         "Пн-Вс: 9:00 – 21:00",
         "Без перерывов и выходных",
       ],
       ctaButtons: ["Отправить заявку", "WhatsApp", "Telegram"],
       formLabels: ["Ваше имя *", "Телефон *", "Интересующая услуга", "Email", "Сообщение"],
       errorMessages: ["Имя должно быть минимум 2 символа", "Введите корректный номер телефона", "Введите корректный email"],
       keyFacts: {
         phone: "+7 (903) 868-78-61",
         workingHours: "Пн-Вс: 9:00 – 21:00",
         callbackTime: "в течение 15 минут",
       },
     });
   }
   
   // FAQ page
   const faqSEO = getPageSEO("/faq");
   if (faqSEO) {
     content.push({
       url: "/faq",
       title: faqSEO.title,
       h1: faqSEO.h1,
       mainText: [
         "Собрали ответы на популярные вопросы о наших услугах, гарантии, сроках и оплате",
         "Общие вопросы",
         "Защитная плёнка PPF",
         "Сроки выполнения",
         "Гарантия и качество",
       ],
       ctaButtons: ["Задать вопрос", "+7 (903) 868-78-61"],
       formLabels: [],
       errorMessages: [],
       keyFacts: {
         warrantyPPF: "до 10 лет",
         warrantySoundproofing: "3 года",
         warrantyEquipment: "2 года",
         warrantyPDR: "пожизненная",
       },
     });
   }
   
   // Blog page
   const blogSEO = getPageSEO("/blog");
   if (blogSEO) {
     content.push({
       url: "/blog",
       title: blogSEO.title,
       h1: blogSEO.h1,
       mainText: [
         "Статьи о детейлинге и уходе за автомобилем",
         "Советы экспертов",
         "Обзоры материалов и технологий",
       ],
       ctaButtons: ["Читать статью"],
       formLabels: [],
       errorMessages: [],
       keyFacts: {},
     });
   }
   
   // Privacy page
   const privacySEO = getPageSEO("/privacy");
   if (privacySEO) {
     content.push({
       url: "/privacy",
       title: privacySEO.title,
       h1: privacySEO.h1,
       mainText: [
         "Защита персональных данных",
         "Правовая информация",
       ],
       ctaButtons: [],
       formLabels: [],
       errorMessages: [],
       keyFacts: {},
     });
   }
   
   // Service pages
   SERVICES_SEO_CONFIG.forEach((service) => {
     content.push({
       url: `/${service.slug}`,
       title: service.metaTitle,
       h1: service.h1,
       mainText: [
         service.metaDescription,
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