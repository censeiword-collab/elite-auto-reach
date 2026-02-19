import { BRAND, CONTACT, CITY, WORKING_HOURS, PRICING, SEO } from "@/lib/constants";
import { EXHAUST_BASE } from "@/data/activeExhaustUtils";

const SITE = SEO.domain;

// ========================
// LocalBusiness (singleton)
// ========================
export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: BRAND.fullName,
  description: BRAND.description,
  url: SITE,
  telephone: CONTACT.phone.display,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CITY.name,
    addressRegion: CITY.region,
    postalCode: CITY.postalCode,
    addressCountry: CITY.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT.geo.latitude,
    longitude: CONTACT.geo.longitude,
  },
  openingHoursSpecification: WORKING_HOURS.schema,
  priceRange: PRICING.priceRange,
  image: `${SITE}/og-image.jpg`,
  sameAs: [CONTACT.social.vk, CONTACT.social.telegram, CONTACT.social.instagram],
});

// ========================
// Service
// ========================
export const exhaustServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Установка активного электронного выхлопа",
  description:
    "Установка клапанной системы управления звуком двигателя с пульта или смартфона. Режимы Comfort, Sport, Race.",
  provider: {
    "@type": "AutoRepair",
    name: BRAND.name,
    url: SITE,
  },
  areaServed: { "@type": "City", name: CITY.name },
  offers: {
    "@type": "Offer",
    priceCurrency: PRICING.currencyCode,
    price: "25000",
  },
});

// ========================
// BreadcrumbList builder
// ========================
export interface BreadcrumbStep {
  name: string;
  path: string; // relative path, e.g. /aktivnyy-vykhlop/bmw
}

export const breadcrumbSchema = (items: BreadcrumbStep[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE}${item.path}`,
  })),
});

// ========================
// FAQPage builder
// ========================
export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

// ========================
// Pre-built breadcrumbs
// ========================
const HUB_CRUMB: BreadcrumbStep = { name: "Активный выхлоп", path: EXHAUST_BASE };
const HOME_CRUMB: BreadcrumbStep = { name: "Главная", path: "/" };
const KAZAN_CRUMB: BreadcrumbStep = { name: "Казань", path: `${EXHAUST_BASE}/kazan` };

export const hubBreadcrumbs = () =>
  breadcrumbSchema([HOME_CRUMB, HUB_CRUMB]);

export const brandBreadcrumbs = (brandName: string, brandSlug: string) =>
  breadcrumbSchema([HOME_CRUMB, HUB_CRUMB, { name: brandName, path: `${EXHAUST_BASE}/${brandSlug}` }]);

export const modelBreadcrumbs = (brandName: string, brandSlug: string, modelName: string, modelSlug: string) =>
  breadcrumbSchema([
    HOME_CRUMB,
    HUB_CRUMB,
    { name: brandName, path: `${EXHAUST_BASE}/${brandSlug}` },
    { name: modelName, path: `${EXHAUST_BASE}/${modelSlug}` },
  ]);

export const kazanBreadcrumbs = () =>
  breadcrumbSchema([HOME_CRUMB, HUB_CRUMB, KAZAN_CRUMB]);

export const areaBreadcrumbs = (areaName: string, areaSlug: string) =>
  breadcrumbSchema([HOME_CRUMB, HUB_CRUMB, KAZAN_CRUMB, { name: areaName, path: `${EXHAUST_BASE}/kazan-${areaSlug}` }]);

export const areaBrandBreadcrumbs = (areaName: string, areaSlug: string, brandName: string, brandSlug: string) =>
  breadcrumbSchema([
    HOME_CRUMB,
    HUB_CRUMB,
    KAZAN_CRUMB,
    { name: areaName, path: `${EXHAUST_BASE}/kazan-${areaSlug}` },
    { name: brandName, path: `${EXHAUST_BASE}/kazan-${areaSlug}/${brandSlug}` },
  ]);

export const infoBreadcrumbs = (title: string, slug: string) =>
  breadcrumbSchema([HOME_CRUMB, HUB_CRUMB, { name: title, path: `${EXHAUST_BASE}/${slug}` }]);

// ========================
// Default FAQ for model pages (template)
// ========================
export const modelDefaultFaq = (brandName: string, modelName: string) => [
  {
    q: `Сколько стоит установка активного выхлопа на ${brandName} ${modelName}?`,
    a: `Цена зависит от конфигурации и двигателя. Позвоните нам для расчёта: ${CONTACT.phone.display}.`,
  },
  {
    q: `Сколько времени занимает установка на ${brandName} ${modelName}?`,
    a: "Установка занимает 1–2 рабочих дня. В сложных случаях — до 3 дней.",
  },
  {
    q: "Сохраняется ли заводская гарантия на автомобиль?",
    a: "Да, установка активного выхлопа не затрагивает заводскую гарантию. Система полностью обратима.",
  },
  {
    q: "Можно ли управлять звуком со смартфона?",
    a: "Да, управление звуком доступно через Bluetooth-пульт или мобильное приложение. Режимы: Comfort, Sport, Race.",
  },
  {
    q: "Какая гарантия на установку?",
    a: "Гарантия на установку — до 2 лет. Работаем по договору.",
  },
];
