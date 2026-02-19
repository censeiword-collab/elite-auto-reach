// Area+Brand pages for geo-SEO (70 pages = 7 areas × 10 popular brands)

export interface ExhaustAreaBrand {
  areaSlug: string;
  brandSlug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  description: string;
}

const POPULAR_BRANDS = [
  { slug: "bmw", name: "BMW" },
  { slug: "mercedes-benz", name: "Mercedes-Benz" },
  { slug: "audi", name: "Audi" },
  { slug: "toyota", name: "Toyota" },
  { slug: "lexus", name: "Lexus" },
  { slug: "porsche", name: "Porsche" },
  { slug: "land-rover", name: "Land Rover" },
  { slug: "volkswagen", name: "Volkswagen" },
  { slug: "genesis", name: "Genesis" },
  { slug: "infiniti", name: "Infiniti" },
];

const AREAS = [
  { slug: "aviastroitelnyy", name: "Авиастроительный район", time: "15–20 минут" },
  { slug: "vahitovskiy", name: "Вахитовский район", time: "10–15 минут" },
  { slug: "kirovskiy", name: "Кировский район", time: "15–25 минут" },
  { slug: "moskovskiy", name: "Московский район", time: "10–20 минут" },
  { slug: "novo-savinovskiy", name: "Ново-Савиновский район", time: "5–15 минут" },
  { slug: "privolzhskiy", name: "Приволжский район", time: "15–25 минут" },
  { slug: "sovetskiy", name: "Советский район", time: "10–20 минут" },
];

export const EXHAUST_AREA_BRANDS: ExhaustAreaBrand[] = AREAS.flatMap((area) =>
  POPULAR_BRANDS.map((brand) => ({
    areaSlug: area.slug,
    brandSlug: brand.slug,
    metaTitle: `Активный выхлоп на ${brand.name} — ${area.name} Казани | SUNMAXKZN`,
    metaDescription: `Установка активного выхлопа на ${brand.name} для жителей ${area.name} Казани. SUNMAXKZN — ${area.time} от вас. Гарантия до 2 лет.`,
    h1: `Активный выхлоп на ${brand.name} — ${area.name} Казани`,
    description: `Установка активного электронного выхлопа на ${brand.name} для жителей ${area.name}. До студии SUNMAXKZN — ${area.time}. Работаем с клапанными системами для всех моделей ${brand.name}. Гарантия до 2 лет. Запись онлайн.`,
  }))
);

export const getAreaBrand = (areaSlug: string, brandSlug: string): ExhaustAreaBrand | undefined =>
  EXHAUST_AREA_BRANDS.find((ab) => ab.areaSlug === areaSlug && ab.brandSlug === brandSlug);
