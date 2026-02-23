import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GripVertical, Eye, EyeOff, Settings, Plus } from "lucide-react";
import { HOME_FALLBACK_ORDER } from "@/lib/sectionRegistry";

interface PageSection {
  id: string;
  page_slug: string;
  section_key: string;
  title: string;
  is_visible: boolean;
  sort_order: number;
  settings: Record<string, unknown>;
}

const AdminSections = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sections, isLoading } = useQuery({
    queryKey: ["page-sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_slug", "home")
        .order("sort_order");
      if (error) throw error;
      return data as PageSection[];
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { error } = await supabase
        .from("page_sections")
        .update({ is_visible })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-sections"] });
      toast({ title: "Сохранено" });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (updates: { id: string; sort_order: number }[]) => {
      for (const update of updates) {
        const { error } = await supabase
          .from("page_sections")
          .update({ sort_order: update.sort_order })
          .eq("id", update.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-sections"] });
      toast({ title: "Порядок обновлён" });
    },
  });

  const moveSection = (index: number, direction: "up" | "down") => {
    if (!sections) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const updates = [
      { id: sections[index].id, sort_order: sections[newIndex].sort_order },
      { id: sections[newIndex].id, sort_order: sections[index].sort_order },
    ];

    updateOrderMutation.mutate(updates);
  };

  const DEFAULT_SECTIONS = [
    { section_key: "hero", title: "Hero", sort_order: 10 },
    { section_key: "services", title: "Services", sort_order: 20 },
    { section_key: "cases", title: "Cases", sort_order: 30 },
    { section_key: "why_us", title: "Why us", sort_order: 40 },
    { section_key: "how_we_work", title: "How we work", sort_order: 50 },
    { section_key: "reviews", title: "Reviews", sort_order: 60 },
    { section_key: "cta", title: "CTA", sort_order: 70 },
    { section_key: "seo_text", title: "SEO text", sort_order: 80 },
  ];

  const createDefaultsMutation = useMutation({
    mutationFn: async () => {
      const rows = DEFAULT_SECTIONS.map((s) => ({
        page_slug: "home",
        section_key: s.section_key,
        title: s.title,
        sort_order: s.sort_order,
        is_visible: true,
        settings: {},
      }));
      const { error } = await supabase.from("page_sections").insert(rows);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-sections"] });
      toast({ title: "Created" });
    },
    onError: (error) => {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Секции главной страницы</h1>
          <p className="text-muted-foreground">
            Управление порядком и видимостью секций
          </p>
        </div>

        {(!sections || sections.length === 0) && (
          <Button onClick={() => createDefaultsMutation.mutate()} disabled={createDefaultsMutation.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Create default Home sections
          </Button>
        )}

        <div className="space-y-3">
          {sections?.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={!section.is_visible ? "opacity-60" : ""}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button
                        className="p-1 hover:bg-muted rounded disabled:opacity-30"
                        disabled={index === 0}
                        onClick={() => moveSection(index, "up")}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          className="fill-current"
                        >
                          <path d="M6 2L2 6h8L6 2z" />
                        </svg>
                      </button>
                      <button
                        className="p-1 hover:bg-muted rounded disabled:opacity-30"
                        disabled={index === (sections?.length || 0) - 1}
                        onClick={() => moveSection(index, "down")}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          className="fill-current"
                        >
                          <path d="M6 10L2 6h8l-4 4z" />
                        </svg>
                      </button>
                    </div>

                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />

                    <div>
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section.section_key}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {section.is_visible ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                      <Switch
                        checked={section.is_visible}
                        onCheckedChange={(checked) =>
                          toggleVisibilityMutation.mutate({
                            id: section.id,
                            is_visible: checked,
                          })
                        }
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSections;
