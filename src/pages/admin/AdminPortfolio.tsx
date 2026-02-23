import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { slugifyRuEn } from "@/lib/slugifyRuEn";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

interface PortfolioPost {
  id: string;
  title: string;
  slug: string;
  guid: string;
  published_at: string;
  description: string | null;
  cover_image_url: string | null;
  gallery_images: string[];
  content_html: string;
  author: string | null;
  is_active: boolean;
  sort_order: number;
  dzen_category: string;
  dzen_format: string;
  dzen_index: string;
  dzen_comments: string;
  updated_at: string;
}

const EMPTY: Omit<PortfolioPost, "id" | "updated_at"> = {
  title: "",
  slug: "",
  guid: "",
  published_at: new Date().toISOString().slice(0, 16),
  description: null,
  cover_image_url: null,
  gallery_images: [],
  content_html: "",
  author: null,
  is_active: false,
  sort_order: 100,
  dzen_category: "native-draft",
  dzen_format: "format-article",
  dzen_index: "index",
  dzen_comments: "comment-all",
};

const AdminPortfolio = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [guidLocked, setGuidLocked] = useState(false);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["portfolio-posts-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts" as any)
        .select("*")
        .order("sort_order")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as PortfolioPost[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug,
        guid: form.guid,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : new Date().toISOString(),
        description: form.description || null,
        cover_image_url: form.cover_image_url || null,
        gallery_images: form.gallery_images,
        content_html: sanitizeHtml(form.content_html),
        author: form.author || null,
        is_active: form.is_active,
        sort_order: form.sort_order,
        dzen_category: form.dzen_category,
        dzen_format: form.dzen_format,
        dzen_index: form.dzen_index,
        dzen_comments: form.dzen_comments,
      };

      if (editingId) {
        const { error } = await supabase
          .from("portfolio_posts" as any)
          .update(payload as any)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("portfolio_posts" as any)
          .insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: editingId ? "Обновлено" : "Создано" });
      setModalOpen(false);
      qc.invalidateQueries({ queryKey: ["portfolio-posts-admin"] });
    },
    onError: (e: any) => {
      toast({ title: "Ошибка", description: e.message, variant: "destructive" });
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_posts" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Удалено" });
      setDeleteId(null);
      qc.invalidateQueries({ queryKey: ["portfolio-posts-admin"] });
    },
    onError: (e: any) => {
      toast({ title: "Ошибка", description: e.message, variant: "destructive" });
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from("portfolio_posts" as any)
        .update({ is_active: active } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio-posts-admin"] }),
  });

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY, published_at: new Date().toISOString().slice(0, 16) });
    setGuidLocked(false);
    setModalOpen(true);
  };

  const openEdit = (p: PortfolioPost) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      guid: p.guid,
      published_at: p.published_at ? p.published_at.slice(0, 16) : "",
      description: p.description,
      cover_image_url: p.cover_image_url,
      gallery_images: p.gallery_images ?? [],
      content_html: p.content_html,
      author: p.author,
      is_active: p.is_active,
      sort_order: p.sort_order,
      dzen_category: p.dzen_category,
      dzen_format: p.dzen_format,
      dzen_index: p.dzen_index,
      dzen_comments: p.dzen_comments,
    });
    setGuidLocked(true);
    setModalOpen(true);
  };

  const setField = <K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // auto-slug on title change for new posts
      if (key === "title" && !editingId) {
        next.slug = slugifyRuEn(value as string);
      }
      // auto-guid for new posts
      if (!guidLocked && (key === "title" || key === "published_at" || key === "slug")) {
        const slug = key === "slug" ? (value as string) : next.slug;
        const pa = key === "published_at" ? (value as string) : next.published_at;
        next.guid = pa ? `${slug}:${new Date(pa).toISOString()}` : slug;
      }
      return next;
    });
  };

  const galleryText = form.gallery_images.join("\n");

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Портфолио</h1>
        <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Создать статью</Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Загрузка…</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">Статей пока нет</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="border border-border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p.published_at ? new Date(p.published_at).toLocaleDateString("ru-RU") : "—"}
                  {" · "}
                  {p.is_active ? "Опубликовано" : "Черновик"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Switch
                  checked={p.is_active}
                  onCheckedChange={(v) => toggleActive.mutate({ id: p.id, active: v })}
                />
                <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setDeleteId(p.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
            <AlertDialogDescription>Это действие необратимо.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && del.mutate(deleteId)}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create/Edit modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Редактировать" : "Новая статья"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Заголовок *</Label>
              <Input value={form.title} onChange={(e) => setField("title", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setField("slug", e.target.value)} />
              </div>
              <div>
                <Label>GUID</Label>
                <Input value={form.guid} onChange={(e) => { setForm((p) => ({ ...p, guid: e.target.value })); }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Дата публикации</Label>
                <Input type="datetime-local" value={form.published_at} onChange={(e) => setField("published_at", e.target.value)} />
              </div>
              <div>
                <Label>Автор</Label>
                <Input value={form.author ?? ""} onChange={(e) => setField("author", e.target.value || null)} />
              </div>
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea value={form.description ?? ""} onChange={(e) => setField("description", e.target.value || null)} />
            </div>
            <div>
              <Label>Обложка (URL)</Label>
              <Input value={form.cover_image_url ?? ""} onChange={(e) => setField("cover_image_url", e.target.value || null)} />
            </div>
            <div>
              <Label>Галерея (по одному URL на строку)</Label>
              <Textarea
                rows={4}
                value={galleryText}
                onChange={(e) => setField("gallery_images", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) as any)}
              />
            </div>
            <div>
              <Label>Контент (HTML)</Label>
              <Textarea rows={10} value={form.content_html} onChange={(e) => setField("content_html", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Дзен-категория</Label>
                <Select value={form.dzen_category} onValueChange={(v) => setField("dzen_category", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native-draft">native-draft</SelectItem>
                    <SelectItem value="">без категории</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Дзен-формат</Label>
                <Select value={form.dzen_format} onValueChange={(v) => setField("dzen_format", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="format-article">format-article</SelectItem>
                    <SelectItem value="format-post">format-post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Дзен-индекс</Label>
                <Select value={form.dzen_index} onValueChange={(v) => setField("dzen_index", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index">index</SelectItem>
                    <SelectItem value="noindex">noindex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Дзен-комментарии</Label>
                <Select value={form.dzen_comments} onValueChange={(v) => setField("dzen_comments", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comment-all">comment-all</SelectItem>
                    <SelectItem value="comment-subscribers">comment-subscribers</SelectItem>
                    <SelectItem value="comment-none">comment-none</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <Label>Порядок сортировки</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setField("is_active", v)} />
                <Label>Опубликовано</Label>
              </div>
            </div>

            <Button className="w-full" onClick={() => save.mutate()} disabled={!form.title || !form.slug || save.isPending}>
              {save.isPending ? "Сохранение…" : "Сохранить"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPortfolio;
