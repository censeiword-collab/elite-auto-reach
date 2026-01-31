import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Plus, Trash2, GripVertical } from "lucide-react";
import { useServices, Service } from "@/hooks/useService";

const AdminServices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: services, isLoading } = useServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Service>>({});

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<Service> }) => {
      const { error } = await supabase
        .from("services")
        .update(data.updates)
        .eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Сохранено", description: "Услуга обновлена" });
      setEditingId(null);
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("services")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditData({
      title: service.title,
      short_description: service.short_description,
      price_from: service.price_from,
      meta_title: service.meta_title,
      meta_description: service.meta_description,
      h1: service.h1,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateMutation.mutate({ id: editingId, updates: editData });
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Услуги</h1>
            <p className="text-muted-foreground">
              Управление услугами, ценами и SEO
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          /{service.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={service.is_active}
                          onCheckedChange={(checked) =>
                            toggleActiveMutation.mutate({
                              id: service.id,
                              is_active: checked,
                            })
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {service.is_active ? "Активна" : "Скрыта"}
                        </span>
                      </div>
                      {editingId === service.id ? (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveEdit}>
                            <Save className="w-4 h-4 mr-1" />
                            Сохранить
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(service)}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Редактировать
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {editingId === service.id && (
                  <CardContent className="pt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Название</Label>
                        <Input
                          value={editData.title || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Цена от</Label>
                        <Input
                          type="number"
                          value={editData.price_from || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              price_from: parseInt(e.target.value) || null,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Краткое описание</Label>
                        <Textarea
                          value={editData.short_description || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              short_description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="md:col-span-2 border-t pt-4 mt-2">
                        <h4 className="font-semibold mb-3">SEO настройки</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Meta Title</Label>
                            <Input
                              value={editData.meta_title || ""}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  meta_title: e.target.value,
                                })
                              }
                              maxLength={60}
                            />
                            <p className="text-xs text-muted-foreground">
                              {(editData.meta_title || "").length}/60
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label>H1</Label>
                            <Input
                              value={editData.h1 || ""}
                              onChange={(e) =>
                                setEditData({ ...editData, h1: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Meta Description</Label>
                            <Textarea
                              value={editData.meta_description || ""}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  meta_description: e.target.value,
                                })
                              }
                              maxLength={160}
                            />
                            <p className="text-xs text-muted-foreground">
                              {(editData.meta_description || "").length}/160
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
