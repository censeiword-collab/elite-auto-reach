import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const AdminPortfolio = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [creating, setCreating] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", slug: "", description: "", content_html: "", cover_image_url: "" });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("portfolio_posts").insert({
        title: newPost.title,
        slug: newPost.slug,
        description: newPost.description,
        content_html: newPost.content_html,
        cover_image_url: newPost.cover_image_url || null,
        guid: `portfolio-${Date.now()}`,
        published_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: "Создано" });
      setCreating(false);
      setNewPost({ title: "", slug: "", description: "", content_html: "", cover_image_url: "" });
    },
    onError: (e: any) => toast({ title: "Ошибка", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("portfolio_posts").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: "Сохранено" });
      setEditingId(null);
    },
    onError: (e: any) => toast({ title: "Ошибка", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: "Удалено" });
    },
  });

  const toggleActive = (id: string, current: boolean) => {
    updateMutation.mutate({ id, updates: { is_active: !current } });
  };

  const startEdit = (post: any) => {
    setEditingId(post.id);
    setEditData({ title: post.title, slug: post.slug, description: post.description, content_html: post.content_html, cover_image_url: post.cover_image_url });
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
            <h1 className="text-3xl font-bold">Портфолио</h1>
            <p className="text-muted-foreground">Управление статьями портфолио</p>
          </div>
          <Button onClick={() => setCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Новая статья
          </Button>
        </div>

        {creating && (
          <Card>
            <CardHeader><CardTitle>Новая статья</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Заголовок</Label>
                  <Input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={newPost.slug} onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Описание</Label>
                  <Textarea value={newPost.description} onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Обложка (URL)</Label>
                  <Input value={newPost.cover_image_url} onChange={(e) => setNewPost({ ...newPost, cover_image_url: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Контент (HTML)</Label>
                  <Textarea rows={8} value={newPost.content_html} onChange={(e) => setNewPost({ ...newPost, content_html: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate()} disabled={!newPost.title || !newPost.slug}>
                  <Save className="w-4 h-4 mr-2" />Создать
                </Button>
                <Button variant="outline" onClick={() => setCreating(false)}>
                  <X className="w-4 h-4 mr-2" />Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <Badge className={post.is_active ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}>
                          {post.is_active ? "Активно" : "Скрыто"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">/{post.slug} · {format(new Date(post.published_at), "d MMM yyyy", { locale: ru })}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => toggleActive(post.id, !!post.is_active)}>
                        {post.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      {editingId === post.id ? (
                        <>
                          <Button size="sm" onClick={() => updateMutation.mutate({ id: post.id, updates: editData })}>
                            <Save className="w-4 h-4 mr-1" />Сохранить
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => startEdit(post)}>
                            <Pencil className="w-4 h-4 mr-1" />Редактировать
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { if (confirm("Удалить?")) deleteMutation.mutate(post.id); }}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {editingId === post.id && (
                  <CardContent className="pt-0 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Заголовок</Label>
                        <Input value={editData.title || ""} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input value={editData.slug || ""} onChange={(e) => setEditData({ ...editData, slug: e.target.value })} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Описание</Label>
                        <Textarea value={editData.description || ""} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Обложка (URL)</Label>
                        <Input value={editData.cover_image_url || ""} onChange={(e) => setEditData({ ...editData, cover_image_url: e.target.value })} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Контент (HTML)</Label>
                        <Textarea rows={8} value={editData.content_html || ""} onChange={(e) => setEditData({ ...editData, content_html: e.target.value })} />
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

export default AdminPortfolio;
