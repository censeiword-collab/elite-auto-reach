import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Plus, Trash2, Eye, Calendar } from "lucide-react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const AdminBlog = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useBlogPosts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    title?: string;
    excerpt?: string;
    meta_title?: string;
    meta_description?: string;
    h1?: string;
    status?: "draft" | "published" | "archived";
  }>({});

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: typeof editData }) => {
      const { error } = await supabase
        .from("blog_posts")
        .update(data.updates)
        .eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast({ title: "Сохранено", description: "Статья обновлена" });
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

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setEditData({
      title: post.title,
      excerpt: post.excerpt,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      h1: post.h1,
      status: post.status as "draft" | "published" | "archived",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500";
      case "archived":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
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
            <h1 className="text-3xl font-bold">Блог</h1>
            <p className="text-muted-foreground">
              Управление статьями и SEO
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Новая статья
          </Button>
        </div>

        <div className="space-y-4">
          {posts?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status === "published"
                            ? "Опубликовано"
                            : post.status === "draft"
                            ? "Черновик"
                            : "Архив"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>/{post.slug}</span>
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.published_at), "d MMM yyyy", {
                              locale: ru,
                            })}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views_count} просмотров
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingId === post.id ? (
                        <>
                          <Button size="sm" onClick={saveEdit}>
                            <Save className="w-4 h-4 mr-1" />
                            Сохранить
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(post)}
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {editingId === post.id && (
                  <CardContent className="pt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Заголовок</Label>
                        <Input
                          value={editData.title || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Статус</Label>
                        <select
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          value={editData.status || "draft"}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              status: e.target.value as "draft" | "published" | "archived",
                            })
                          }
                        >
                          <option value="draft">Черновик</option>
                          <option value="published">Опубликовано</option>
                          <option value="archived">Архив</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Отрывок</Label>
                        <Textarea
                          value={editData.excerpt || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, excerpt: e.target.value })
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

          {(!posts || posts.length === 0) && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Нет статей. Создайте первую статью.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
