import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GripVertical, Eye, EyeOff, Settings } from "lucide-react";

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
