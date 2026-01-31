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
import { Pencil, Save, X, Plus, Trash2, Star, Image as ImageIcon } from "lucide-react";

interface Case {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  service_slug: string | null;
  car_brand: string | null;
  car_model: string | null;
  work_duration: string | null;
  materials_used: string[] | null;
  result_text: string | null;
  before_images: string[];
  after_images: string[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
}

const AdminCases = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Case>>({});

  const { data: cases, isLoading } = useQuery({
    queryKey: ["cases-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Case[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Partial<Case> }) => {
      const { error } = await supabase
        .from("cases")
        .update(data.updates)
        .eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases-admin"] });
      toast({ title: "Сохранено" });
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

  const toggleMutation = useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: string; value: boolean }) => {
      const { error } = await supabase
        .from("cases")
        .update({ [field]: value })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases-admin"] });
    },
  });

  const startEdit = (caseItem: Case) => {
    setEditingId(caseItem.id);
    setEditData({
      title: caseItem.title,
      description: caseItem.description,
      car_brand: caseItem.car_brand,
      car_model: caseItem.car_model,
      work_duration: caseItem.work_duration,
      result_text: caseItem.result_text,
    });
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
            <h1 className="text-3xl font-bold">Кейсы</h1>
            <p className="text-muted-foreground">
              Примеры работ до/после
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить кейс
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases?.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={!caseItem.is_active ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          toggleMutation.mutate({
                            id: caseItem.id,
                            field: "is_featured",
                            value: !caseItem.is_featured,
                          })
                        }
                        className={`p-1 rounded ${
                          caseItem.is_featured ? "text-yellow-500" : "text-muted-foreground"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${caseItem.is_featured ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                  {caseItem.car_brand && (
                    <p className="text-sm text-muted-foreground">
                      {caseItem.car_brand} {caseItem.car_model}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Images preview */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs ml-1">До</span>
                      </div>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs ml-1">После</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={caseItem.is_active}
                          onCheckedChange={(checked) =>
                            toggleMutation.mutate({
                              id: caseItem.id,
                              field: "is_active",
                              value: checked,
                            })
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {caseItem.is_active ? "Виден" : "Скрыт"}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(caseItem)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {(!cases || cases.length === 0) && (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center text-muted-foreground">
                Нет кейсов. Добавьте первый кейс.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCases;
