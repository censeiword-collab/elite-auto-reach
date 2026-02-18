// Active exhaust brands data for SEO pages

export interface ExhaustBrand {
  slug: string;
  name: string;
  nameRu: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  models: string[]; // model slugs
  popular: boolean;
}

export const EXHAUST_BRANDS: ExhaustBrand[] = [
  {
    slug: "bmw",
    name: "BMW",
    nameRu: "БМВ",
    description: "Установка активного электронного выхлопа на автомобили BMW в Казани. Управляемый звук для всех моделей BMW.",
    metaTitle: "Активный выхлоп на BMW в Казани — установка, цена | SUNMAXKZN",
    metaDescription: "Установка активного электронного выхлопа на BMW в Казани. Управляемый звук двигателя, клапанные системы. Гарантия до 2 лет. Запись онлайн.",
    h1: "Активный выхлоп на BMW в Казани",
    models: ["x5", "x6", "m5", "3-series", "5-series", "7-series", "x3", "x7"],
    popular: true,
  },
  {
    slug: "mercedes",
    name: "Mercedes-Benz",
    nameRu: "Мерседес",
    description: "Установка активного электронного выхлопа на Mercedes-Benz в Казани. Спортивный звук для AMG и стандартных моделей.",
    metaTitle: "Активный выхлоп на Mercedes-Benz в Казани — установка | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Mercedes-Benz в Казани. Электронные клапаны, управление со смартфона. Гарантия до 2 лет.",
    h1: "Активный выхлоп на Mercedes-Benz в Казани",
    models: ["gle", "gle-coupe", "g-class", "e-class", "s-class", "c-class", "glc", "gls"],
    popular: true,
  },
  {
    slug: "audi",
    name: "Audi",
    nameRu: "Ауди",
    description: "Активный выхлоп на Audi в Казани. Спортивный звук для S-Line, RS и стандартных моделей.",
    metaTitle: "Активный выхлоп на Audi в Казани — установка, цена | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Audi в Казани. Клапанные системы для всех моделей. Управление звуком. Гарантия до 2 лет.",
    h1: "Активный выхлоп на Audi в Казани",
    models: ["q7", "q8", "a6", "a7", "a8", "q5", "rs6", "rs7"],
    popular: true,
  },
  {
    slug: "toyota",
    name: "Toyota",
    nameRu: "Тойота",
    description: "Активный выхлоп на Toyota в Казани. Управляемый звук для Land Cruiser, Camry, RAV4.",
    metaTitle: "Активный выхлоп на Toyota в Казани — установка | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Toyota в Казани. Land Cruiser, Camry, RAV4 и другие модели. Гарантия до 2 лет.",
    h1: "Активный выхлоп на Toyota в Казани",
    models: ["land-cruiser-300", "land-cruiser-200", "camry", "rav4", "highlander"],
    popular: true,
  },
  {
    slug: "lexus",
    name: "Lexus",
    nameRu: "Лексус",
    description: "Активный выхлоп на Lexus в Казани. Спортивный звук для LX, RX, GX и других моделей.",
    metaTitle: "Активный выхлоп на Lexus в Казани — установка | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Lexus в Казани. LX, RX, GX — управляемый звук. Гарантия до 2 лет.",
    h1: "Активный выхлоп на Lexus в Казани",
    models: ["lx600", "rx", "gx", "lc", "es"],
    popular: true,
  },
  {
    slug: "porsche",
    name: "Porsche",
    nameRu: "Порше",
    description: "Активный выхлоп на Porsche в Казани. Заводской звук спорткара с управлением.",
    metaTitle: "Активный выхлоп на Porsche в Казани — установка | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Porsche в Казани. Cayenne, Macan, Panamera. Спортивный звук с управлением. Гарантия.",
    h1: "Активный выхлоп на Porsche в Казани",
    models: ["cayenne", "macan", "panamera", "911"],
    popular: true,
  },
  {
    slug: "land-rover",
    name: "Land Rover",
    nameRu: "Ленд Ровер",
    description: "Активный выхлоп на Land Rover в Казани. Range Rover, Defender, Discovery — управляемый звук.",
    metaTitle: "Активный выхлоп на Land Rover в Казани — установка | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Land Rover в Казани. Range Rover, Defender. Электронные клапаны. Гарантия до 2 лет.",
    h1: "Активный выхлоп на Land Rover в Казани",
    models: ["range-rover", "range-rover-sport", "defender", "discovery"],
    popular: true,
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    nameRu: "Фольксваген",
    description: "Активный выхлоп на Volkswagen в Казани. Touareg, Tiguan, Golf — спортивный звук.",
    metaTitle: "Активный выхлоп на Volkswagen в Казани | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Volkswagen в Казани. Touareg, Tiguan и другие модели. Гарантия.",
    h1: "Активный выхлоп на Volkswagen в Казани",
    models: ["touareg", "tiguan", "golf-r"],
    popular: false,
  },
  {
    slug: "kia",
    name: "Kia",
    nameRu: "Киа",
    description: "Активный выхлоп на Kia в Казани. K5, Sportage, Sorento — управляемый звук.",
    metaTitle: "Активный выхлоп на Kia в Казани | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Kia в Казани. K5, Sportage, Sorento. Гарантия до 2 лет.",
    h1: "Активный выхлоп на Kia в Казани",
    models: ["k5", "sportage", "sorento"],
    popular: false,
  },
  {
    slug: "genesis",
    name: "Genesis",
    nameRu: "Дженезис",
    description: "Активный выхлоп на Genesis в Казани. G70, G80, GV80 — спортивный звук.",
    metaTitle: "Активный выхлоп на Genesis в Казани | SUNMAXKZN",
    metaDescription: "Установка активного выхлопа на Genesis в Казани. G70, G80, GV80. Управление звуком. Гарантия.",
    h1: "Активный выхлоп на Genesis в Казани",
    models: ["g70", "g80", "gv80", "gv70"],
    popular: false,
  },
];

export const getBrandBySlug = (slug: string): ExhaustBrand | undefined =>
  EXHAUST_BRANDS.find((b) => b.slug === slug);

export const getPopularBrands = (): ExhaustBrand[] =>
  EXHAUST_BRANDS.filter((b) => b.popular);
