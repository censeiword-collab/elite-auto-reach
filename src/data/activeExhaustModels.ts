// Active exhaust models data for SEO pages

export interface ExhaustModel {
  slug: string;
  brandSlug: string;
  name: string;
  nameRu: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  engine: string;
  priceFrom: number;
  features: string[];
}

export const EXHAUST_MODELS: ExhaustModel[] = [
  // BMW
  { slug: "x5", brandSlug: "bmw", name: "X5", nameRu: "X5", metaTitle: "Активный выхлоп на BMW X5 в Казани | SUNMAXKZN", metaDescription: "Установка активного выхлопа на BMW X5 в Казани. Клапанная система, управление со смартфона. Гарантия до 2 лет.", h1: "Активный выхлоп на BMW X5 в Казани", engine: "3.0 / 4.4", priceFrom: 45000, features: ["Клапанная система", "Управление со смартфона", "Режимы Comfort/Sport"] },
  { slug: "x6", brandSlug: "bmw", name: "X6", nameRu: "X6", metaTitle: "Активный выхлоп на BMW X6 в Казани | SUNMAXKZN", metaDescription: "Установка активного выхлопа на BMW X6 в Казани. Спортивный звук, клапаны.", h1: "Активный выхлоп на BMW X6 в Казани", engine: "3.0 / 4.4", priceFrom: 45000, features: ["Клапанная система", "Спортивный выхлоп", "Пульт управления"] },
  { slug: "m5", brandSlug: "bmw", name: "M5", nameRu: "M5", metaTitle: "Активный выхлоп на BMW M5 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на BMW M5 в Казани. Раскройте потенциал звука V8.", h1: "Активный выхлоп на BMW M5 в Казани", engine: "4.4 V8", priceFrom: 55000, features: ["Полный обход клапанов", "Усиление звука V8", "Титановые насадки"] },
  { slug: "3-series", brandSlug: "bmw", name: "3 Series", nameRu: "3 серии", metaTitle: "Активный выхлоп на BMW 3 Series в Казани | SUNMAXKZN", metaDescription: "Установка активного выхлопа на BMW 3 серии в Казани.", h1: "Активный выхлоп на BMW 3 серии в Казани", engine: "2.0 / 3.0", priceFrom: 35000, features: ["Клапанная система", "Спортивный звук", "Быстрая установка"] },
  { slug: "5-series", brandSlug: "bmw", name: "5 Series", nameRu: "5 серии", metaTitle: "Активный выхлоп на BMW 5 Series в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на BMW 5 серии в Казани. Управляемый звук.", h1: "Активный выхлоп на BMW 5 серии в Казани", engine: "2.0 / 3.0 / 4.4", priceFrom: 40000, features: ["Клапанная система", "Управление звуком", "Comfort/Sport режимы"] },
  { slug: "7-series", brandSlug: "bmw", name: "7 Series", nameRu: "7 серии", metaTitle: "Активный выхлоп на BMW 7 Series в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на BMW 7 серии в Казани.", h1: "Активный выхлоп на BMW 7 серии в Казани", engine: "3.0 / 4.4", priceFrom: 50000, features: ["Премиальный звук", "Бесшумный режим", "Управление со смартфона"] },
  { slug: "x3", brandSlug: "bmw", name: "X3", nameRu: "X3", metaTitle: "Активный выхлоп на BMW X3 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на BMW X3 в Казани.", h1: "Активный выхлоп на BMW X3 в Казани", engine: "2.0 / 3.0", priceFrom: 35000, features: ["Клапанная система", "Управление звуком"] },
  { slug: "x7", brandSlug: "bmw", name: "X7", nameRu: "X7", metaTitle: "Активный выхлоп на BMW X7 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на BMW X7 в Казани.", h1: "Активный выхлоп на BMW X7 в Казани", engine: "3.0 / 4.4", priceFrom: 50000, features: ["Премиум клапаны", "Тихий/Спорт режим"] },

  // Mercedes
  { slug: "gle", brandSlug: "mercedes", name: "GLE", nameRu: "GLE", metaTitle: "Активный выхлоп на Mercedes GLE в Казани | SUNMAXKZN", metaDescription: "Установка активного выхлопа на Mercedes GLE в Казани. Спортивный звук, клапаны, управление.", h1: "Активный выхлоп на Mercedes GLE в Казани", engine: "2.0 / 3.0 / 4.0", priceFrom: 45000, features: ["AMG-звук", "Электронные клапаны", "App-управление"] },
  { slug: "gle-coupe", brandSlug: "mercedes", name: "GLE Coupe", nameRu: "GLE Купе", metaTitle: "Активный выхлоп на Mercedes GLE Coupe в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Mercedes GLE Coupe в Казани.", h1: "Активный выхлоп на Mercedes GLE Coupe в Казани", engine: "3.0 / 4.0", priceFrom: 50000, features: ["AMG-стиль звука", "Клапанная система"] },
  { slug: "g-class", brandSlug: "mercedes", name: "G-Class", nameRu: "G-Класс", metaTitle: "Активный выхлоп на Mercedes G-Class в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Гелендваген в Казани. Мощный звук V8, клапаны.", h1: "Активный выхлоп на Mercedes G-Class в Казани", engine: "4.0 V8", priceFrom: 65000, features: ["Звук V8 AMG", "Полный обход", "Титановые насадки"] },
  { slug: "e-class", brandSlug: "mercedes", name: "E-Class", nameRu: "E-Класс", metaTitle: "Активный выхлоп на Mercedes E-Class в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Mercedes E-Class в Казани.", h1: "Активный выхлоп на Mercedes E-Class в Казани", engine: "2.0 / 3.0", priceFrom: 40000, features: ["Спортивный звук", "Клапаны", "Управление"] },
  { slug: "s-class", brandSlug: "mercedes", name: "S-Class", nameRu: "S-Класс", metaTitle: "Активный выхлоп на Mercedes S-Class в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Mercedes S-Class в Казани.", h1: "Активный выхлоп на Mercedes S-Class в Казани", engine: "3.0 / 4.0", priceFrom: 55000, features: ["Премиальный звук", "Бесшумный режим"] },
  { slug: "c-class", brandSlug: "mercedes", name: "C-Class", nameRu: "C-Класс", metaTitle: "Активный выхлоп на Mercedes C-Class в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Mercedes C-Class в Казани.", h1: "Активный выхлоп на Mercedes C-Class в Казани", engine: "1.5 / 2.0", priceFrom: 35000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "glc", brandSlug: "mercedes", name: "GLC", nameRu: "GLC", metaTitle: "Активный выхлоп на Mercedes GLC в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Mercedes GLC в Казани.", h1: "Активный выхлоп на Mercedes GLC в Казани", engine: "2.0 / 3.0", priceFrom: 40000, features: ["AMG-звук", "Клапанная система"] },
  { slug: "gls", brandSlug: "mercedes", name: "GLS", nameRu: "GLS", metaTitle: "Активный выхлоп на Mercedes GLS в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Mercedes GLS в Казани.", h1: "Активный выхлоп на Mercedes GLS в Казани", engine: "3.0 / 4.0", priceFrom: 55000, features: ["Премиум клапаны", "Управление звуком"] },

  // Audi
  { slug: "q7", brandSlug: "audi", name: "Q7", nameRu: "Q7", metaTitle: "Активный выхлоп на Audi Q7 в Казани | SUNMAXKZN", metaDescription: "Установка активного выхлопа на Audi Q7 в Казани. Управляемый звук.", h1: "Активный выхлоп на Audi Q7 в Казани", engine: "3.0 / 4.0", priceFrom: 45000, features: ["S-Line звук", "Клапаны", "Управление"] },
  { slug: "q8", brandSlug: "audi", name: "Q8", nameRu: "Q8", metaTitle: "Активный выхлоп на Audi Q8 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi Q8 в Казани.", h1: "Активный выхлоп на Audi Q8 в Казани", engine: "3.0 / 4.0", priceFrom: 50000, features: ["RS-звук", "Электронные клапаны"] },
  { slug: "a6", brandSlug: "audi", name: "A6", nameRu: "A6", metaTitle: "Активный выхлоп на Audi A6 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi A6 в Казани.", h1: "Активный выхлоп на Audi A6 в Казани", engine: "2.0 / 3.0", priceFrom: 40000, features: ["S-Line звук", "Управление"] },
  { slug: "a7", brandSlug: "audi", name: "A7", nameRu: "A7", metaTitle: "Активный выхлоп на Audi A7 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi A7 в Казани.", h1: "Активный выхлоп на Audi A7 в Казани", engine: "2.0 / 3.0", priceFrom: 45000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "a8", brandSlug: "audi", name: "A8", nameRu: "A8", metaTitle: "Активный выхлоп на Audi A8 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi A8 в Казани.", h1: "Активный выхлоп на Audi A8 в Казани", engine: "3.0 / 4.0", priceFrom: 50000, features: ["Премиальный звук", "Бесшумный режим"] },
  { slug: "q5", brandSlug: "audi", name: "Q5", nameRu: "Q5", metaTitle: "Активный выхлоп на Audi Q5 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi Q5 в Казани.", h1: "Активный выхлоп на Audi Q5 в Казани", engine: "2.0 / 3.0", priceFrom: 40000, features: ["Клапанная система", "Управление звуком"] },
  { slug: "rs6", brandSlug: "audi", name: "RS6", nameRu: "RS6", metaTitle: "Активный выхлоп на Audi RS6 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi RS6 в Казани. Максимальный звук V8.", h1: "Активный выхлоп на Audi RS6 в Казани", engine: "4.0 V8", priceFrom: 65000, features: ["Полный обход клапанов", "Звук V8", "Титановые насадки"] },
  { slug: "rs7", brandSlug: "audi", name: "RS7", nameRu: "RS7", metaTitle: "Активный выхлоп на Audi RS7 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Audi RS7 в Казани.", h1: "Активный выхлоп на Audi RS7 в Казани", engine: "4.0 V8", priceFrom: 65000, features: ["Полный обход", "Звук V8"] },

  // Toyota
  { slug: "land-cruiser-300", brandSlug: "toyota", name: "Land Cruiser 300", nameRu: "Ленд Крузер 300", metaTitle: "Активный выхлоп на Toyota Land Cruiser 300 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Тойота Ленд Крузер 300 в Казани. Мощный звук V6.", h1: "Активный выхлоп на Toyota Land Cruiser 300 в Казани", engine: "3.5 V6", priceFrom: 55000, features: ["Звук V6 Twin-Turbo", "Клапанная система", "Пульт/App"] },
  { slug: "land-cruiser-200", brandSlug: "toyota", name: "Land Cruiser 200", nameRu: "Ленд Крузер 200", metaTitle: "Активный выхлоп на Toyota Land Cruiser 200 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Тойота Ленд Крузер 200 в Казани.", h1: "Активный выхлоп на Toyota Land Cruiser 200 в Казани", engine: "4.6 V8 / 4.5D", priceFrom: 50000, features: ["Звук V8", "Клапаны", "Управление"] },
  { slug: "camry", brandSlug: "toyota", name: "Camry", nameRu: "Камри", metaTitle: "Активный выхлоп на Toyota Camry в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Тойота Камри в Казани.", h1: "Активный выхлоп на Toyota Camry в Казани", engine: "2.5 / 3.5", priceFrom: 30000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "rav4", brandSlug: "toyota", name: "RAV4", nameRu: "РАВ4", metaTitle: "Активный выхлоп на Toyota RAV4 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Тойота РАВ4 в Казани.", h1: "Активный выхлоп на Toyota RAV4 в Казани", engine: "2.0 / 2.5", priceFrom: 30000, features: ["Спортивный звук", "Управление"] },
  { slug: "highlander", brandSlug: "toyota", name: "Highlander", nameRu: "Хайлендер", metaTitle: "Активный выхлоп на Toyota Highlander в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Тойота Хайлендер в Казани.", h1: "Активный выхлоп на Toyota Highlander в Казани", engine: "2.5 / 3.5", priceFrom: 35000, features: ["Клапанная система", "Звук V6"] },

  // Lexus
  { slug: "lx600", brandSlug: "lexus", name: "LX 600", nameRu: "LX 600", metaTitle: "Активный выхлоп на Lexus LX 600 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Lexus LX 600 в Казани. Мощный звук V6 Twin-Turbo.", h1: "Активный выхлоп на Lexus LX 600 в Казани", engine: "3.5 V6 TT", priceFrom: 60000, features: ["Звук V6 Twin-Turbo", "Премиум клапаны"] },
  { slug: "rx", brandSlug: "lexus", name: "RX", nameRu: "RX", metaTitle: "Активный выхлоп на Lexus RX в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Lexus RX в Казани.", h1: "Активный выхлоп на Lexus RX в Казани", engine: "2.4T / 3.5", priceFrom: 40000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "gx", brandSlug: "lexus", name: "GX", nameRu: "GX", metaTitle: "Активный выхлоп на Lexus GX в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Lexus GX в Казани.", h1: "Активный выхлоп на Lexus GX в Казани", engine: "3.5 V6", priceFrom: 50000, features: ["Клапанная система", "Звук V6"] },
  { slug: "lc", brandSlug: "lexus", name: "LC", nameRu: "LC", metaTitle: "Активный выхлоп на Lexus LC в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Lexus LC в Казани. Звук V8.", h1: "Активный выхлоп на Lexus LC в Казани", engine: "5.0 V8", priceFrom: 65000, features: ["Звук V8 атмо", "Титановые насадки"] },
  { slug: "es", brandSlug: "lexus", name: "ES", nameRu: "ES", metaTitle: "Активный выхлоп на Lexus ES в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Lexus ES в Казани.", h1: "Активный выхлоп на Lexus ES в Казани", engine: "2.5 / 3.5", priceFrom: 35000, features: ["Спортивный звук", "Управление"] },

  // Porsche
  { slug: "cayenne", brandSlug: "porsche", name: "Cayenne", nameRu: "Кайен", metaTitle: "Активный выхлоп на Porsche Cayenne в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Porsche Cayenne в Казани. Спортивный звук, клапаны.", h1: "Активный выхлоп на Porsche Cayenne в Казани", engine: "3.0 / 4.0", priceFrom: 55000, features: ["Спортивный звук", "Клапаны PSE"] },
  { slug: "macan", brandSlug: "porsche", name: "Macan", nameRu: "Макан", metaTitle: "Активный выхлоп на Porsche Macan в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Porsche Macan в Казани.", h1: "Активный выхлоп на Porsche Macan в Казани", engine: "2.0 / 2.9", priceFrom: 45000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "panamera", brandSlug: "porsche", name: "Panamera", nameRu: "Панамера", metaTitle: "Активный выхлоп на Porsche Panamera в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Porsche Panamera в Казани.", h1: "Активный выхлоп на Porsche Panamera в Казани", engine: "2.9 / 4.0", priceFrom: 55000, features: ["PSE звук", "Клапанная система"] },
  { slug: "911", brandSlug: "porsche", name: "911", nameRu: "911", metaTitle: "Активный выхлоп на Porsche 911 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Porsche 911 в Казани. Оппозитный звук.", h1: "Активный выхлоп на Porsche 911 в Казани", engine: "3.0 / 3.8", priceFrom: 65000, features: ["Звук оппозита", "PSE обход", "Титановые насадки"] },

  // Land Rover
  { slug: "range-rover", brandSlug: "land-rover", name: "Range Rover", nameRu: "Рендж Ровер", metaTitle: "Активный выхлоп на Range Rover в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Range Rover в Казани. Звук V8, клапаны.", h1: "Активный выхлоп на Range Rover в Казани", engine: "3.0 / 4.4 V8", priceFrom: 55000, features: ["Звук V8", "Электронные клапаны", "App"] },
  { slug: "range-rover-sport", brandSlug: "land-rover", name: "Range Rover Sport", nameRu: "Рендж Ровер Спорт", metaTitle: "Активный выхлоп на Range Rover Sport в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Range Rover Sport в Казани.", h1: "Активный выхлоп на Range Rover Sport в Казани", engine: "3.0 / 4.4", priceFrom: 50000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "defender", brandSlug: "land-rover", name: "Defender", nameRu: "Дефендер", metaTitle: "Активный выхлоп на Land Rover Defender в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Defender в Казани.", h1: "Активный выхлоп на Land Rover Defender в Казани", engine: "3.0 / 5.0", priceFrom: 50000, features: ["Мощный звук", "Клапаны"] },
  { slug: "discovery", brandSlug: "land-rover", name: "Discovery", nameRu: "Дискавери", metaTitle: "Активный выхлоп на Land Rover Discovery в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Discovery в Казани.", h1: "Активный выхлоп на Land Rover Discovery в Казани", engine: "3.0", priceFrom: 45000, features: ["Клапанная система", "Управление"] },

  // Volkswagen
  { slug: "touareg", brandSlug: "volkswagen", name: "Touareg", nameRu: "Туарег", metaTitle: "Активный выхлоп на Volkswagen Touareg в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на VW Touareg в Казани.", h1: "Активный выхлоп на Volkswagen Touareg в Казани", engine: "3.0", priceFrom: 40000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "tiguan", brandSlug: "volkswagen", name: "Tiguan", nameRu: "Тигуан", metaTitle: "Активный выхлоп на Volkswagen Tiguan в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на VW Tiguan в Казани.", h1: "Активный выхлоп на Volkswagen Tiguan в Казани", engine: "1.4 / 2.0", priceFrom: 30000, features: ["Спортивный звук"] },
  { slug: "golf-r", brandSlug: "volkswagen", name: "Golf R", nameRu: "Гольф R", metaTitle: "Активный выхлоп на Volkswagen Golf R в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на VW Golf R в Казани.", h1: "Активный выхлоп на Volkswagen Golf R в Казани", engine: "2.0 TSI", priceFrom: 40000, features: ["Спортивный звук", "Клапаны", "Бурлэ"] },

  // Kia
  { slug: "k5", brandSlug: "kia", name: "K5", nameRu: "K5", metaTitle: "Активный выхлоп на Kia K5 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Kia K5 в Казани.", h1: "Активный выхлоп на Kia K5 в Казани", engine: "2.5", priceFrom: 25000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "sportage", brandSlug: "kia", name: "Sportage", nameRu: "Спортейдж", metaTitle: "Активный выхлоп на Kia Sportage в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Kia Sportage в Казани.", h1: "Активный выхлоп на Kia Sportage в Казани", engine: "2.0 / 2.5", priceFrom: 25000, features: ["Спортивный звук"] },
  { slug: "sorento", brandSlug: "kia", name: "Sorento", nameRu: "Соренто", metaTitle: "Активный выхлоп на Kia Sorento в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Kia Sorento в Казани.", h1: "Активный выхлоп на Kia Sorento в Казани", engine: "2.5 / 3.5", priceFrom: 30000, features: ["Клапанная система"] },

  // Genesis
  { slug: "g70", brandSlug: "genesis", name: "G70", nameRu: "G70", metaTitle: "Активный выхлоп на Genesis G70 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Genesis G70 в Казани.", h1: "Активный выхлоп на Genesis G70 в Казани", engine: "2.0T / 3.3T", priceFrom: 35000, features: ["Спортивный звук", "Клапаны"] },
  { slug: "g80", brandSlug: "genesis", name: "G80", nameRu: "G80", metaTitle: "Активный выхлоп на Genesis G80 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Genesis G80 в Казани.", h1: "Активный выхлоп на Genesis G80 в Казани", engine: "2.5T / 3.5T", priceFrom: 40000, features: ["Премиальный звук", "Управление"] },
  { slug: "gv80", brandSlug: "genesis", name: "GV80", nameRu: "GV80", metaTitle: "Активный выхлоп на Genesis GV80 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Genesis GV80 в Казани.", h1: "Активный выхлоп на Genesis GV80 в Казани", engine: "2.5T / 3.5T", priceFrom: 45000, features: ["Клапанная система", "Звук V6"] },
  { slug: "gv70", brandSlug: "genesis", name: "GV70", nameRu: "GV70", metaTitle: "Активный выхлоп на Genesis GV70 в Казани | SUNMAXKZN", metaDescription: "Активный выхлоп на Genesis GV70 в Казани.", h1: "Активный выхлоп на Genesis GV70 в Казани", engine: "2.0T / 2.5T", priceFrom: 35000, features: ["Спортивный звук"] },
];

export const getModelBySlug = (modelSlug: string, brandSlug: string): ExhaustModel | undefined =>
  EXHAUST_MODELS.find((m) => m.slug === modelSlug && m.brandSlug === brandSlug);

export const getModelsByBrand = (brandSlug: string): ExhaustModel[] =>
  EXHAUST_MODELS.filter((m) => m.brandSlug === brandSlug);

export const getModelByAnySlug = (slug: string): ExhaustModel | undefined =>
  EXHAUST_MODELS.find((m) => m.slug === slug);
