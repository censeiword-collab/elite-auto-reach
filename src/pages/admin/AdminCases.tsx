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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash2, Star, Image as ImageIcon } from "lucide-react";
import { slugifyRuEn } from "@/lib/slugifyRuEn";

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
  before_images: any;
  after_images: any;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
}

const EMPTY_FORM = {
  title: "",
  slug: "",
  description: "",
  car_brand: "",
  car_model: "",
  work_duration: "",
  result_text: "",
  before_images_text: "",
  after_images_text: "",
  is_active: true,
  is_featured: false,
  sort_order: 0,
};

type FormData = typeof EMPTY_FORM;

function parseImages(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function imagesToText(imgs: any): string {
  if (!imgs) return "";
  if (Array.isArray(imgs)) return imgs.join("\n");
  return "";
}

function firstImage(imgs: any): string | null {
  if (Array.isArray(imgs) && imgs.length > 0 && typeof imgs[0] === "string") return imgs[0];
  return null;
}

const AdminCases = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

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

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || slugifyRuEn(form.title),
        description: form.description || null,
        car_brand: form.car_brand || null,
        car_model: form.car_model || null,
        work_duration: form.work_duration || null,
        result_text: form.result_text || null,
        before_images: (b => b.length ? b : null)(parseImages(form.before_images_text)) as unknown as null,
        after_images: (a => a.length ? a : null)(parseImages(form.after_images_text)) as unknown as null,
        is_active: form.is_active,
        is_featured: form.is_featured,
        sort_order: form.sort_order,
      };

      if (mode === "edit" && editingId) {
        const { error } = await supabase.from("cases").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("cases").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases-admin"] });
      toast({ title: mode === "create" ? "Кейс создан" : "Сохранено" });
      closeModal();
    },
    onError: (error) => {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cases").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases-admin"] });
      toast({ title: "Кейс удалён" });
    },
    onError: (error) => {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: string; value: boolean }) => {
      const { error } = await supabase.from("cases").update({ [field]: value }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases-admin"] });
    },
  });

  const openCreate = () => {
    const maxSort = cases?.reduce((m, c) => Math.max(m, c.sort_order ?? 0), 0) ?? 0;
    setMode("create");
    setEditingId(null);
    setForm({ ...EMPTY_FORM, sort_order: maxSort + 10 });
    setIsModalOpen(true);
  };

  const openEdit = (c: Case) => {
    setMode("edit");
    setEditingId(c.id);
    setForm({
      title: c.title,
      slug: c.slug,
      description: c.description ?? "",
      car_brand: c.car_brand ?? "",
      car_model: c.car_model ?? "",
      work_duration: c.work_duration ?? "",
      result_text: c.result_text ?? "",
      before_images_text: imagesToText(c.before_images),
      after_images_text: imagesToText(c.after_images),
      is_active: c.is_active ?? true,
      is_featured: c.is_featured ?? false,
      sort_order: c.sort_order ?? 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "create") {
        next.slug = slugifyRuEn(value as string);
      }
      return next;
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
            <p className="text-muted-foreground">Примеры работ до/после</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить кейс
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases?.map((caseItem, index) => {
            const beforeSrc = firstImage(caseItem.before_images);
            const afterSrc = firstImage(caseItem.after_images);

            return (
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
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {beforeSrc ? (
                            <img src={beforeSrc} alt="До" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <>
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                              <span className="text-xs ml-1">До</span>
                            </>
                          )}
                        </div>
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {afterSrc ? (
                            <img src={afterSrc} alt="После" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <>
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                              <span className="text-xs ml-1">После</span>
                            </>
                          )}
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
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline" onClick={() => openEdit(caseItem)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить кейс?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  «{caseItem.title}» будет удалён безвозвратно.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteMutation.mutate(caseItem.id)}>
                                  Удалить
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {(!cases || cases.length === 0) && (
            <Card className="col-span-full">
              <CardContent className="py-12 text-center text-muted-foreground">
                Нет кейсов. Добавьте первый кейс.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create / Edit modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) closeModal(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === "create" ? "Новый кейс" : "Редактировать кейс"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Название *</Label>
              <Input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Оклейка Porsche 911 GT3"
              />
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="okleyka-porsche-911-gt3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Марка авто</Label>
                <Input value={form.car_brand} onChange={(e) => updateField("car_brand", e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Модель</Label>
                <Input value={form.car_model} onChange={(e) => updateField("car_model", e.target.value)} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Описание</Label>
              <Textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Срок работ</Label>
                <Input
                  value={form.work_duration}
                  onChange={(e) => updateField("work_duration", e.target.value)}
                  placeholder="3 дня"
                />
              </div>
              <div className="grid gap-2">
                <Label>Порядок сортировки</Label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => updateField("sort_order", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Результат</Label>
              <Textarea
                value={form.result_text}
                onChange={(e) => updateField("result_text", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Фото «До» (по одной URL на строку)</Label>
                <Textarea
                  value={form.before_images_text}
                  onChange={(e) => updateField("before_images_text", e.target.value)}
                  rows={3}
                  placeholder={"https://…/before1.jpg\nhttps://…/before2.jpg"}
                />
              </div>
              <div className="grid gap-2">
                <Label>Фото «После» (по одной URL на строку)</Label>
                <Textarea
                  value={form.after_images_text}
                  onChange={(e) => updateField("after_images_text", e.target.value)}
                  rows={3}
                  placeholder={"https://…/after1.jpg\nhttps://…/after2.jpg"}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => updateField("is_active", v)} />
                <Label>Активен</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_featured} onCheckedChange={(v) => updateField("is_featured", v)} />
                <Label>Избранный</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Отмена
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.title.trim() || saveMutation.isPending}>
              {saveMutation.isPending ? "Сохранение…" : mode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCases;
