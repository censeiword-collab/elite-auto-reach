import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, GripVertical, ExternalLink } from "lucide-react";

interface MenuItem {
  id: string;
  location: string;
  title: string;
  url: string;
  parent_id: string | null;
  is_visible: boolean;
  sort_order: number;
  open_in_new_tab: boolean;
}

const AdminMenu = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menu-items-admin"],
    queryFn: async () => {
      // Bypass RLS to see all items including hidden ones
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as MenuItem[];
    },
  });

  const [newItem, setNewItem] = useState({ title: "", url: "", location: "header" });

  const addMutation = useMutation({
    mutationFn: async (item: { title: string; url: string; location: string }) => {
      const maxOrder = menuItems
        ?.filter((m) => m.location === item.location)
        .reduce((max, m) => Math.max(max, m.sort_order), 0) || 0;

      const { error } = await supabase.from("menu_items").insert({
        ...item,
        sort_order: maxOrder + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items-admin"] });
      toast({ title: "Пункт меню добавлен" });
      setNewItem({ title: "", url: "", location: "header" });
    },
    onError: (error) => {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MenuItem> }) => {
      const { error } = await supabase
        .from("menu_items")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items-admin"] });
      toast({ title: "Сохранено" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items-admin"] });
      toast({ title: "Пункт удалён" });
    },
  });

  const headerItems = menuItems?.filter((m) => m.location === "header") || [];
  const footerItems = menuItems?.filter((m) => m.location === "footer") || [];

  const renderMenuItems = (items: MenuItem[], location: string) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className={!item.is_visible ? "opacity-60" : ""}>
            <CardContent className="flex items-center gap-4 p-4">
              <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />

              <div className="flex-1 grid gap-3 md:grid-cols-3">
                <Input
                  value={item.title}
                  onChange={(e) =>
                    updateMutation.mutate({
                      id: item.id,
                      updates: { title: e.target.value },
                    })
                  }
                  placeholder="Название"
                />
                <Input
                  value={item.url}
                  onChange={(e) =>
                    updateMutation.mutate({
                      id: item.id,
                      updates: { url: e.target.value },
                    })
                  }
                  placeholder="URL"
                />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.is_visible}
                      onCheckedChange={(checked) =>
                        updateMutation.mutate({
                          id: item.id,
                          updates: { is_visible: checked },
                        })
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      Видимый
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.open_in_new_tab}
                      onCheckedChange={(checked) =>
                        updateMutation.mutate({
                          id: item.id,
                          updates: { open_in_new_tab: checked },
                        })
                      }
                    />
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteMutation.mutate(item.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {items.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Нет пунктов меню
          </CardContent>
        </Card>
      )}

      {/* Add New */}
      <Card className="border-dashed">
        <CardContent className="flex items-center gap-4 p-4">
          <Plus className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1 grid gap-3 md:grid-cols-3">
            <Input
              value={newItem.location === location ? newItem.title : ""}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value, location })
              }
              placeholder="Название нового пункта"
            />
            <Input
              value={newItem.location === location ? newItem.url : ""}
              onChange={(e) =>
                setNewItem({ ...newItem, url: e.target.value, location })
              }
              placeholder="/url-страницы"
            />
            <Button
              onClick={() => addMutation.mutate(newItem)}
              disabled={!newItem.title || !newItem.url || newItem.location !== location}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
          <h1 className="text-3xl font-bold">Меню</h1>
          <p className="text-muted-foreground">
            Управление пунктами меню в шапке и подвале
          </p>
        </div>

        <Tabs defaultValue="header">
          <TabsList>
            <TabsTrigger value="header">Шапка сайта</TabsTrigger>
            <TabsTrigger value="footer">Подвал сайта</TabsTrigger>
          </TabsList>

          <TabsContent value="header" className="mt-6">
            {renderMenuItems(headerItems, "header")}
          </TabsContent>

          <TabsContent value="footer" className="mt-6">
            {renderMenuItems(footerItems, "footer")}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
