export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          h1: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          published_at: string | null
          reading_time_minutes: number | null
          related_service_slug: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          h1?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          related_service_slug?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          h1?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          related_service_slug?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_related_service_slug_fkey"
            columns: ["related_service_slug"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["slug"]
          },
        ]
      }
      cases: {
        Row: {
          after_images: Json | null
          before_images: Json | null
          car_brand: string | null
          car_model: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          materials_used: string[] | null
          result_text: string | null
          service_slug: string | null
          slug: string
          sort_order: number | null
          title: string
          work_duration: string | null
        }
        Insert: {
          after_images?: Json | null
          before_images?: Json | null
          car_brand?: string | null
          car_model?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          materials_used?: string[] | null
          result_text?: string | null
          service_slug?: string | null
          slug: string
          sort_order?: number | null
          title: string
          work_duration?: string | null
        }
        Update: {
          after_images?: Json | null
          before_images?: Json | null
          car_brand?: string | null
          car_model?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          materials_used?: string[] | null
          result_text?: string | null
          service_slug?: string | null
          slug?: string
          sort_order?: number | null
          title?: string
          work_duration?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cases_service_slug_fkey"
            columns: ["service_slug"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["slug"]
          },
        ]
      }
      leads: {
        Row: {
          car_brand: string | null
          car_model: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          notes: string | null
          phone: string
          service_slug: string | null
          source_page: string | null
          status: Database["public"]["Enums"]["lead_status"] | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          car_brand?: string | null
          car_model?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          phone: string
          service_slug?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          car_brand?: string | null
          car_model?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string
          service_slug?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_service_slug_fkey"
            columns: ["service_slug"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["slug"]
          },
        ]
      }
      menu_items: {
        Row: {
          created_at: string
          id: string
          is_visible: boolean
          location: string
          open_in_new_tab: boolean
          parent_id: string | null
          sort_order: number
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_visible?: boolean
          location?: string
          open_in_new_tab?: boolean
          parent_id?: string | null
          sort_order?: number
          title: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_visible?: boolean
          location?: string
          open_in_new_tab?: boolean
          parent_id?: string | null
          sort_order?: number
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          id: string
          is_visible: boolean
          page_slug: string
          section_key: string
          settings: Json | null
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          id?: string
          is_visible?: boolean
          page_slug?: string
          section_key: string
          settings?: Json | null
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          id?: string
          is_visible?: boolean
          page_slug?: string
          section_key?: string
          settings?: Json | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          h1: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_slug: string
          schema_breadcrumb: boolean | null
          schema_faq: boolean | null
          schema_local_business: boolean | null
          schema_organization: boolean | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          h1?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug: string
          schema_breadcrumb?: boolean | null
          schema_faq?: boolean | null
          schema_local_business?: boolean | null
          schema_organization?: boolean | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          h1?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug?: string
          schema_breadcrumb?: boolean | null
          schema_faq?: boolean | null
          schema_local_business?: boolean | null
          schema_organization?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          car_brand: string | null
          car_model: string | null
          client_name: string
          created_at: string
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          rating: number | null
          review_date: string | null
          review_text: string
          service_slug: string | null
          source: string | null
        }
        Insert: {
          car_brand?: string | null
          car_model?: string | null
          client_name: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          rating?: number | null
          review_date?: string | null
          review_text: string
          service_slug?: string | null
          source?: string | null
        }
        Update: {
          car_brand?: string | null
          car_model?: string | null
          client_name?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          rating?: number | null
          review_date?: string | null
          review_text?: string
          service_slug?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_service_slug_fkey"
            columns: ["service_slug"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["slug"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          faq: Json | null
          features: Json | null
          full_description: string | null
          gallery: Json | null
          h1: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          price_from: number | null
          price_unit: string | null
          seo_text: string | null
          short_description: string | null
          slug: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          faq?: Json | null
          features?: Json | null
          full_description?: string | null
          gallery?: Json | null
          h1?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          price_from?: number | null
          price_unit?: string | null
          seo_text?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          faq?: Json | null
          features?: Json | null
          full_description?: string | null
          gallery?: Json | null
          h1?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          price_from?: number | null
          price_unit?: string | null
          seo_text?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      content_status: "draft" | "published" | "archived"
      lead_status: "new" | "in_progress" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      content_status: ["draft", "published", "archived"],
      lead_status: ["new", "in_progress", "completed", "cancelled"],
    },
  },
} as const
