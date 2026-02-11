import { useEffect } from "react";

interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceSchema {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  price?: string;
  image?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaOrgProps {
  type: "LocalBusiness" | "FAQ" | "Service" | "Breadcrumb" | "Organization";
  data: LocalBusinessSchema | FAQItem[] | ServiceSchema | BreadcrumbItem[];
}

const SchemaOrg = ({ type, data }: SchemaOrgProps) => {
  useEffect(() => {
    const existingScript = document.querySelector(`script[data-schema="${type}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    let schema: object;

    switch (type) {
      case "LocalBusiness":
        const business = data as LocalBusinessSchema;
        schema = {
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: business.name,
          description: business.description,
          url: business.url,
          telephone: business.telephone,
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.streetAddress,
            addressLocality: business.address.addressLocality,
            addressRegion: business.address.addressRegion,
            postalCode: business.address.postalCode,
            addressCountry: business.address.addressCountry,
          },
          ...(business.geo && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: business.geo.latitude,
              longitude: business.geo.longitude,
            },
          }),
          ...(business.openingHours && { openingHoursSpecification: business.openingHours }),
          ...(business.priceRange && { priceRange: business.priceRange }),
          ...(business.image && { image: business.image }),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
          },
        };
        break;

      case "FAQ":
        const faqs = data as FAQItem[];
        schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        };
        break;

      case "Service":
        const service = data as ServiceSchema;
        schema = {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: {
            "@type": "AutoRepair",
            name: service.provider,
          },
          areaServed: {
            "@type": "City",
            name: service.areaServed,
          },
          ...(service.price && {
            offers: {
              "@type": "Offer",
              price: service.price,
              priceCurrency: "RUB",
            },
          }),
          ...(service.image && { image: service.image }),
        };
        break;

      case "Breadcrumb":
        const breadcrumbs = data as BreadcrumbItem[];
        schema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };
        break;

      case "Organization":
        const org = data as LocalBusinessSchema;
        schema = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: org.name,
          url: org.url,
          logo: org.image,
          description: org.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: org.address.streetAddress,
            addressLocality: org.address.addressLocality,
            addressRegion: org.address.addressRegion,
            postalCode: org.address.postalCode,
            addressCountry: org.address.addressCountry,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: org.telephone,
            contactType: "customer service",
            availableLanguage: "Russian",
          },
          sameAs: [
            "https://vk.com/sunmaxkzn",
            "https://t.me/sunmaxkzn",
            "https://instagram.com/sunmaxkzn",
          ],
        };
        break;

      default:
        return;
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", type);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
};

export default SchemaOrg;

// Default business data for SUNMAXKZN
export const sunmaxBusinessData: LocalBusinessSchema = {
  name: "SUNMAXKZN — Премиальная автостудия детейлинга и тюнинга",
  description:
    "Профессиональный детейлинг и тюнинг автомобилей в Казани. Оклейка PPF, тонировка, оклейка винилом, шумоизоляция, активный выхлоп, PDR, сигнализации Pandora.",
  url: "https://sunmaxkzn.ru",
  telephone: "+7 (903) 868-78-61",
  address: {
    streetAddress: "ул. Сибхата Хакима, 23/1",
    addressLocality: "Казань",
    addressRegion: "Республика Татарстан",
    postalCode: "420000",
    addressCountry: "RU",
  },
  geo: {
    latitude: 55.796127,
    longitude: 49.122141,
  },
  openingHours: ["Mo-Su 09:00-21:00"],
  priceRange: "₽₽₽",
  image: "https://sunmaxkzn.ru/og-image.jpg",
};
