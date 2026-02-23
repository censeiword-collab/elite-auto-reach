import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageSection {
  id: string;
  page_slug: string;
  section_key: string;
  title: string;
  is_visible: boolean;
  sort_order: number;
  settings: Record<string, unknown> | null;
}

export const usePageSections = (pageSlug: string) => {
  const { data: sections, isLoading, error } = useQuery({
    queryKey: ["page-sections", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_slug", pageSlug)
        .order("sort_order");
      if (error) throw error;
      return data as PageSection[];
    },
  });

  return { sections, isLoading, error };
};
