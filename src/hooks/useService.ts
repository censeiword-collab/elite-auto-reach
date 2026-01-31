import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface Service {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  h1: string | null;
  short_description: string | null;
  full_description: string | null;
  features: Json;
  price_from: number | null;
  price_unit: string | null;
  icon: string | null;
  image_url: string | null;
  gallery: Json;
  seo_text: string | null;
  faq: Json;
  is_active: boolean;
  sort_order: number;
}

export const useService = (slug: string) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as Service | null;
    },
    enabled: !!slug,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");

      if (error) throw error;
      return data as Service[];
    },
  });
};
