import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  h1: string | null;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: string | null;
  tags: string[] | null;
  related_service_slug: string | null;
  status: string;
  views_count: number;
  reading_time_minutes: number;
  author_name: string;
  published_at: string | null;
  created_at: string;
}

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });
};

export const useBlogPosts = (limit?: number) => {
  return useQuery({
    queryKey: ["blog-posts", limit],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as BlogPost[];
    },
  });
};
