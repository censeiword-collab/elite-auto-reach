// QA Route Registry - All routes with metadata
export interface QARoute {
  path: string;
  title: string;
  h1: string;
  description: string;
  type: "static" | "dynamic" | "admin";
  requiresAuth: boolean;
}

export const qaRoutes: QARoute[] = [
  // Main pages
  {
    path: "/",
    title: "SUNMAXKZN — Премиальный детейлинг и тюнинг в Казани",
    h1: "Премиальный детейлинг автомобилей в Казани",
    description: "Главная страница с услугами, кейсами и отзывами",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/price",
    title: "Цены на услуги | SUNMAXKZN Казань",
    h1: "Прайс-лист на услуги",
    description: "Страница с ценами на все услуги студии",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/cases",
    title: "Наши работы | SUNMAXKZN Казань",
    h1: "Портфолио работ",
    description: "Галерея выполненных проектов до/после",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/calculator",
    title: "Калькулятор стоимости | SUNMAXKZN Казань",
    h1: "Рассчитайте стоимость услуг",
    description: "Интерактивный калькулятор цен",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/about",
    title: "О нас | SUNMAXKZN Казань",
    h1: "О студии SUNMAXKZN",
    description: "Информация о компании, команде и подходе",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/contacts",
    title: "Контакты | SUNMAXKZN Казань",
    h1: "Свяжитесь с нами",
    description: "Контактная информация и форма обратной связи",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/faq",
    title: "Частые вопросы | SUNMAXKZN Казань",
    h1: "Ответы на частые вопросы",
    description: "FAQ по услугам и работе студии",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/blog",
    title: "Блог | SUNMAXKZN Казань",
    h1: "Полезные статьи",
    description: "Статьи о детейлинге и уходе за авто",
    type: "static",
    requiresAuth: false,
  },
  {
    path: "/privacy",
    title: "Политика конфиденциальности | SUNMAXKZN",
    h1: "Политика конфиденциальности",
    description: "Правовая информация о персональных данных",
    type: "static",
    requiresAuth: false,
  },

  // Service pages
  {
    path: "/okleyka-avto-poliuretanovoy-plenkoy-kazan",
    title: "Оклейка авто полиуретановой плёнкой в Казани | SUNMAXKZN",
    h1: "Оклейка авто полиуретановой плёнкой в Казани",
    description: "Защитная PPF плёнка XPEL/SunTek с гарантией до 10 лет",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/tonirovka-avto-kazan",
    title: "Тонировка авто в Казани | SUNMAXKZN",
    h1: "Тонировка автомобиля в Казани",
    description: "Профессиональная тонировка стёкол с гарантией 5 лет",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/aktivnyy-vyhlop-kazan",
    title: "Активный выхлоп в Казани | SUNMAXKZN",
    h1: "Установка активного выхлопа в Казани",
    description: "Системы активного выхлопа с управлением звуком",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/shumoizolyaciya-avto-kazan",
    title: "Шумоизоляция авто в Казани | SUNMAXKZN",
    h1: "Шумоизоляция автомобиля в Казани",
    description: "Комплексная шумо- и виброизоляция автомобиля",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/udalenie-vmyatin-bez-pokraski-kazan",
    title: "Удаление вмятин без покраски PDR в Казани | SUNMAXKZN",
    h1: "Удаление вмятин без покраски (PDR) в Казани",
    description: "Технология PDR для устранения вмятин без повреждения ЛКП",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/ustanovka-signalizacii-pandora-kazan",
    title: "Установка сигнализации Pandora в Казани | SUNMAXKZN",
    h1: "Установка сигнализации Pandora в Казани",
    description: "Профессиональная установка охранных систем Pandora",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/okleyka-vinilom-kazan",
    title: "Оклейка винилом в Казани | SUNMAXKZN",
    h1: "Оклейка авто винилом в Казани",
    description: "Изменение цвета автомобиля виниловой плёнкой",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/antihrom-kazan",
    title: "Антихром в Казани | SUNMAXKZN",
    h1: "Антихром — оклейка хрома в чёрный",
    description: "Оклейка хромированных деталей в чёрный цвет",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/okleyka-salona-kazan",
    title: "Оклейка салона в Казани | SUNMAXKZN",
    h1: "Оклейка салона автомобиля",
    description: "Защита и декорирование интерьера авто",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/deteyling-kazan",
    title: "Детейлинг в Казани | SUNMAXKZN",
    h1: "Полный детейлинг автомобиля в Казани",
    description: "Комплексный уход и восстановление внешнего вида",
    type: "dynamic",
    requiresAuth: false,
  },
  {
    path: "/snyatie-plenki-kazan",
    title: "Снятие плёнки в Казани | SUNMAXKZN",
    h1: "Снятие защитной плёнки с авто",
    description: "Профессиональное удаление старой PPF/винила",
    type: "dynamic",
    requiresAuth: false,
  },

  // Admin pages
  {
    path: "/admin",
    title: "Админ-панель | SUNMAXKZN",
    h1: "Панель управления",
    description: "Главная страница администратора",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/login",
    title: "Вход в админ-панель | SUNMAXKZN",
    h1: "Вход",
    description: "Страница авторизации администратора",
    type: "admin",
    requiresAuth: false,
  },
  {
    path: "/admin/services",
    title: "Управление услугами | SUNMAXKZN",
    h1: "Услуги",
    description: "CRUD услуг студии",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/blog",
    title: "Управление блогом | SUNMAXKZN",
    h1: "Блог",
    description: "CRUD статей блога",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/cases",
    title: "Управление работами | SUNMAXKZN",
    h1: "Работы",
    description: "CRUD кейсов портфолио",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/leads",
    title: "Заявки | SUNMAXKZN",
    h1: "Заявки клиентов",
    description: "Просмотр и управление лидами",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/calculator",
    title: "Настройки калькулятора | SUNMAXKZN",
    h1: "Калькулятор",
    description: "Управление ценами и опциями калькулятора",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/seo",
    title: "SEO настройки | SUNMAXKZN",
    h1: "SEO",
    description: "Мета-теги и SEO-настройки страниц",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/menu",
    title: "Управление меню | SUNMAXKZN",
    h1: "Меню",
    description: "Настройка навигационного меню",
    type: "admin",
    requiresAuth: true,
  },
  {
    path: "/admin/sections",
    title: "Секции страниц | SUNMAXKZN",
    h1: "Секции",
    description: "Управление блоками на страницах",
    type: "admin",
    requiresAuth: true,
  },

  // QA page
  {
    path: "/qa",
    title: "QA Dashboard | SUNMAXKZN",
    h1: "QA Testing Dashboard",
    description: "Панель для тестирования и проверки сайта",
    type: "static",
    requiresAuth: false,
  },
];

// Content registry for QA export
export interface QAContent {
  page: string;
  h1: string;
  buttons: string[];
  formLabels: string[];
  errorMessages: string[];
  mainText: string[];
}

export const qaContent: QAContent[] = [
  {
    page: "/",
    h1: "Премиальный детейлинг автомобилей в Казани",
    buttons: [
      "Записаться",
      "Рассчитать стоимость",
      "Смотреть все работы",
      "Оставить заявку",
    ],
    formLabels: ["Ваше имя", "Телефон", "Email", "Сообщение"],
    errorMessages: [
      "Имя должно быть минимум 2 символа",
      "Введите корректный номер телефона",
      "Введите корректный email",
    ],
    mainText: [
      "Защитим ваш автомобиль от сколов и царапин",
      "Гарантия до 10 лет",
      "Работаем с премиальными автомобилями",
    ],
  },
  {
    page: "/contacts",
    h1: "Свяжитесь с нами",
    buttons: ["Отправить заявку", "Позвонить", "Построить маршрут"],
    formLabels: ["Ваше имя", "Телефон", "Email", "Марка авто", "Модель", "Сообщение"],
    errorMessages: [
      "Имя должно быть минимум 2 символа",
      "Введите корректный номер телефона",
    ],
    mainText: [
      "+7 (903) 868-78-61",
      "Казань",
      "Ежедневно 9:00–21:00",
      "Мы перезвоним в течение 10–15 минут",
    ],
  },
  {
    page: "/calculator",
    h1: "Рассчитайте стоимость услуг",
    buttons: ["Далее", "Назад", "Рассчитать", "Получить точный расчёт", "Отправить заявку"],
    formLabels: ["Марка", "Модель", "Ваше имя", "Телефон", "Комментарий"],
    errorMessages: ["Выберите марку автомобиля", "Выберите модель", "Заполните обязательные поля"],
    mainText: [
      "Выберите автомобиль",
      "Выберите услуги",
      "Расчётная стоимость",
    ],
  },
];

// Generate JSON for export
export const generateRoutesJSON = () => {
  return JSON.stringify(
    qaRoutes.map((r) => ({
      url: r.path,
      title: r.title,
      h1: r.h1,
      type: r.type,
      requiresAuth: r.requiresAuth,
    })),
    null,
    2
  );
};

export const generateContentJSON = () => {
  return JSON.stringify(qaContent, null, 2);
};
