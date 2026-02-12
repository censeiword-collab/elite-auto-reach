import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT, WORKING_HOURS } from "@/lib/constants";

export interface SiteSettings {
  brandName?: string;
  tagline?: string;
  positioning?: string;
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  address?: string;
  landmark?: string;
  city?: string;
  workingHours?: string;
  whatsapp?: string;
  telegram?: string;
  vk?: string;
  instagram?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  installmentEnabled?: boolean;
  installmentText?: string;
  authorizedCenterClaimEnabled?: boolean;
  noiseReductionPercentEnabled?: boolean;
  whitelistBrands?: string[];
}

export function useSiteSettings() {
  const { data: raw, isLoading } = useQuery({
    queryKey: ["site-settings-global"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", "global")
        .single();
      if (error && error.code !== "PGRST116") return null;
      return data?.value as unknown as SiteSettings | null;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  // Merge DB values with hardcoded defaults
  const settings = {
    address: raw?.address || CONTACT.address.full,
    landmark: raw?.landmark || CONTACT.address.landmark,
    phoneDisplay: raw?.phoneDisplay || CONTACT.phone.display,
    phone: raw?.phone || CONTACT.phone.raw,
    email: raw?.email || CONTACT.email,
    workingHours: raw?.workingHours || WORKING_HOURS.display,
    whatsapp: raw?.whatsapp || CONTACT.phone.whatsapp,
    telegram: raw?.telegram || CONTACT.social.telegram,
    vk: raw?.vk || CONTACT.social.vk,
    instagram: raw?.instagram || CONTACT.social.instagram,
    lat: raw?.mapLatitude || CONTACT.geo.latitude,
    lon: raw?.mapLongitude || CONTACT.geo.longitude,
    brandName: raw?.brandName || "SUNMAXKZN",
    tagline: raw?.tagline || "студия детейлинга, оклейки и тюнинга в Казани",
    positioning: raw?.positioning || "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
  };

  return { settings, isLoading, raw };
}
