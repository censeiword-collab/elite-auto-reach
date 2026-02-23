import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CasesSection from "@/components/home/CasesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import HowWeWorkSection from "@/components/home/HowWeWorkSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import CTASection from "@/components/home/CTASection";
import SEOTextSection from "@/components/home/SEOTextSection";

export const SECTION_REGISTRY: Record<string, React.ComponentType<{ settings?: Record<string, unknown> }>> = {
  hero: HeroSection,
  services: ServicesSection,
  cases: CasesSection,
  why_us: WhyUsSection,
  how_we_work: HowWeWorkSection,
  reviews: ReviewsSection,
  cta: CTASection,
  seo_text: SEOTextSection,
};

export const HOME_FALLBACK_ORDER: string[] = [
  "hero",
  "services",
  "cases",
  "why_us",
  "how_we_work",
  "reviews",
  "cta",
  "seo_text",
];
