import { useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Plus, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import HtmlMiniEditor from "@/components/editor/HtmlMiniEditor";
import { blocksToDzenHtml } from "@/lib/blocksToDzenHtml";
import type { PortfolioBlock } from "@/lib/portfolioBlocks";
import { isPortfolioBlocks, slugifyRuEn, stripHtmlToText } from "@/lib/portfolioBlocks";

type DbPost = Record<string, any>;

const EMPTY_NEW = {
  title: "",
  slug: "",
  description: "",
  cover_image_url: "",
  author: "",
  is_active: false,
  published_at: new Date().toISOString().slice(0, 16), // for datetime-local
};

function toDatetimeLocal(iso: string) {
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return new Date().toISOString().slice(0, 16);
  }
}

function fromDatetimeLocal(v: string) {
  // v like 2026-02-25T12:30 -> ISO string
  const d = new Date(v);
  return d.toISOString();
}

function defaultBlocks(title?: string): PortfolioBlock[] {
  const t = (title || "").trim();
  const out: PortfolioBlock[] = [];
  if (t) out.push({ type: "heading", level: 1, text: t });
  out.push({ type: "paragraph", html: "<p>Опишите работу: что было сделано, какие материалы, сроки, результат.</p>" });
  return out;
}

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const copy = [...arr];
  const tmp = copy[i];
  copy[i] = copy[j];
  copy[j] = tmp;
  return copy;
}

const AdminPortfolio = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newMeta, setNewMeta] = useState({ ...EMPTY_NEW });
  const [newBlocks, setNewBlocks] = useState<PortfolioBlock[]>(defaultBlocks());

  const [editMeta, setEditMeta] = useState<Record<string, any>>({});
  const [editBlocks, setEditBlocks] = useState<PortfolioBlock[]>([]);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as DbPost[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const slug = (newMeta.slug || slugifyRuEn(newMeta.title)).trim();
      const title = (newMeta.title || "").trim();
      if (!title || !slug) throw new Error("Нужны заголовок и slug");

      const guid = `${slug}:${Date.now()}`;
      const published_at = fromDatetimeLocal(newMeta.published_at);

      const content_html = blocksToDzenHtml(newBlocks, { coverImageUrl: newMeta.cover_image_url || undefined, title });

      const { error } = await supabase.from("portfolio_posts").insert({
        title,
        slug,
        description: newMeta.description || null,
        cover_image_url: newMeta.cover_image_url || null,
        author: newMeta.author || null,
        is_active: !!newMeta.is_active,
        guid,
        published_at,
        content_blocks: newBlocks as any,
        content_html,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: "Создано" });
      setCreating(false);
      setNewMeta({ ...EMPTY_NEW });
      setNewBlocks(defaultBlocks());
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
    onError: (e: any) => toast({ title: "Ошибка", description: e.message, variant: "destructive" }),
  });

  const toggleActive = (id: string, current: boolean) => {
    updateMutation.mutate({ id, updates: { is_active: !current } });
  };

  const startEdit = (post: any) => {
    setEditingId(post.id);

    const meta = {
      title: post.title ?? "",
      slug: post.slug ?? "",
      description: post.description ?? "",
      cover_image_url: post.cover_image_url ?? "",
      author: post.author ?? "",
      is_active: !!post.is_active,
      published_at: toDatetimeLocal(post.published_at || new Date().toISOString()),
      guid: post.guid ?? "",
    };
    setEditMeta(meta);

    const blocks = isPortfolioBlocks(post.content_blocks) ? (post.content_blocks as PortfolioBlock[]) : defaultBlocks(post.title);
    setEditBlocks(blocks);
  };

  const saveEdit = (postId: string) => {
    const title = (editMeta.title || "").trim();
    const slug = (editMeta.slug || slugifyRuEn(title)).trim();
    if (!title || !slug) {
      toast({ title: "Ошибка", description: "Нужны заголовок и slug", variant: "destructive" });
      return;
    }
    const published_at = fromDatetimeLocal(editMeta.published_at);
    const content_html = blocksToDzenHtml(editBlocks, { coverImageUrl: editMeta.cover_image_url || undefined, title });

    updateMutation.mutate({
      id: postId,
      updates: {
        title,
        slug,
        description: editMeta.description || null,
        cover_image_url: editMeta.cover_image_url || null,
        author: editMeta.author || null,
        is_active: !!editMeta.is_active,
        published_at,
        // guid must stay stable, but allow manual edit if field exists:
        guid: editMeta.guid || null,
        content_blocks: editBlocks as any,
        content_html,
      },
    });
  };

  const addBlock = (mode: "new" | "edit", type: PortfolioBlock["type"]) => {
    const push = (b: PortfolioBlock) => {
      if (mode === "new") setNewBlocks((prev) => [...prev, b]);
      else setEditBlocks((prev) => [...prev, b]);
    };

    switch (type) {
      case "heading":
        push({ type: "heading", level: 2, text: "Заголовок раздела" });
        break;
      case "paragraph":
        push({ type: "paragraph", html: "<p>Текст…</p>" });
        break;
      case "list":
        push({ type: "list", ordered: false, items: ["Пункт 1", "Пункт 2"] });
        break;
      case "quote":
        push({ type: "quote", text: "Цитата/вывод…" });
        break;
      case "image":
        push({ type: "image", src: "", caption: "" });
        break;
      case "gallery":
        push({ type: "gallery", images: [{ src: "", caption: "" }] });
        break;
      default:
        break;
    }
  };

  const blocksPreviewNew = useMemo(
    () => blocksToDzenHtml(newBlocks, { coverImageUrl: newMeta.cover_image_url || undefined, title: newMeta.title || undefined }),
    [newBlocks, newMeta.cover_image_url, newMeta.title],
  );
  const blocksPreviewEdit = useMemo(
    () => blocksToDzenHtml(editBlocks, { coverImageUrl: editMeta.cover_image_url || undefined, title: editMeta.title || undefined }),
    [editBlocks, editMeta.cover_image_url, editMeta.title],
  );

  const blocksTextLenNew = stripHtmlToText(blocksPreviewNew).length;
  const blocksTextLenEdit = stripHtmlToText(blocksPreviewEdit).length;

  const renderBlocksEditor = (mode: "new" | "edit") => {
    const blocks = mode === "new" ? newBlocks : editBlocks;
    const setBlocks = mode === "new" ? setNewBlocks : setEditBlocks;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock(mode, "heading")}>+ Заголовок</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock(mode, "paragraph")}>+ Текст</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock(mode, "list")}>+ Список</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock(mode, "quote")}>+ Цитата</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock(mode, "image")}>+ Фото</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock(mode, "gallery")}>+ Галерея</Button>
        </div>

        <div className="space-y-3">
          {blocks.map((b, idx) => (
            <Card key={idx}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">
                    {b.type === "heading" && "Заголовок"}
                    {b.type === "paragraph" && "Текст"}
                    {b.type === "list" && "Список"}
                    {b.type === "quote" && "Цитата"}
                    {b.type === "image" && "Фото"}
                    {b.type === "gallery" && "Галерея"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" size="icon" variant="outline" onClick={() => setBlocks((prev) => move(prev, idx, -1))}>
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button type="button" size="icon" variant="outline" onClick={() => setBlocks((prev) => move(prev, idx, 1))}>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setBlocks((prev) => prev.filter((_, i) => i !== idx))}
                      title="Удалить блок"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {b.type === "heading" && (
                  <div className="grid gap-3 md:grid-cols-6">
                    <div className="md:col-span-1 space-y-2">
                      <Label>Уровень</Label>
                      <Input
                        type="number"
                        min={1}
                        max={4}
                        value={b.level}
                        onChange={(e) => {
                          const level = Math.min(4, Math.max(1, Number(e.target.value || 2))) as 1 | 2 | 3 | 4;
                          setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, level } as any : x)));
                        }}
                      />
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <Label>Текст</Label>
                      <Input
                        value={b.text}
                        onChange={(e) => setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, text: e.target.value } as any : x)))}
                      />
                    </div>
                  </div>
                )}

                {b.type === "paragraph" && (
                  <div className="space-y-2">
                    <Label>Текст (HTML)</Label>
                    <HtmlMiniEditor
                      value={b.html}
                      onChange={(next) => setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, html: next } as any : x)))}
                      rows={10}
                    />
                  </div>
                )}

                {b.type === "list" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Label className="mb-0">Нумерованный</Label>
                      <Switch
                        checked={b.ordered}
                        onCheckedChange={(v) => setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, ordered: v } as any : x)))}
                      />
                    </div>
                    <Label>Пункты (каждая строка — отдельный пункт)</Label>
                    <Textarea
                      rows={6}
                      value={(b.items || []).join("\n")}
                      onChange={(e) => {
                        const items = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean);
                        setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, items } as any : x)));
                      }}
                    />
                  </div>
                )}

                {b.type === "quote" && (
                  <div className="space-y-2">
                    <Label>Цитата</Label>
                    <Textarea
                      rows={3}
                      value={b.text}
                      onChange={(e) => setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, text: e.target.value } as any : x)))}
                    />
                  </div>
                )}

                {b.type === "image" && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>URL изображения</Label>
                      <Input
                        value={b.src}
                        onChange={(e) => setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, src: e.target.value } as any : x)))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Подпись (необязательно)</Label>
                      <Input
                        value={b.caption || ""}
                        onChange={(e) => setBlocks((prev) => prev.map((x, i) => (i === idx ? { ...x, caption: e.target.value } as any : x)))}
                      />
                    </div>

                    {b.src ? (
                      <div className="md:col-span-2">
                        <img src={b.src} alt="" className="w-full max-h-[360px] object-cover rounded-xl" />
                      </div>
                    ) : null}
                  </div>
                )}

                {b.type === "gallery" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="mb-0">Изображения</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBlocks((prev) =>
                            prev.map((x, i) =>
                              i === idx ? ({ ...x, images: [...((x as any).images || []), { src: "", caption: "" }] } as any) : x,
                            ),
                          );
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />Добавить фото
                      </Button>
                    </div>

                    {(b.images || []).map((img, imgIdx) => (
                      <div key={imgIdx} className="grid gap-2 md:grid-cols-12 items-start border rounded-xl p-3">
                        <div className="md:col-span-5 space-y-1">
                          <Label className="text-xs">URL</Label>
                          <Input
                            value={img.src}
                            onChange={(e) => {
                              const src = e.target.value;
                              setBlocks((prev) =>
                                prev.map((x, i) => {
                                  if (i !== idx) return x;
                                   const images = [...((x as any).images || [])];
                                  images[imgIdx] = { ...images[imgIdx], src };
                                  return { ...x, images } as any;
                                }),
                              );
                            }}
                          />
                        </div>

                        <div className="md:col-span-5 space-y-1">
                          <Label className="text-xs">Подпись</Label>
                          <Input
                            value={img.caption || ""}
                            onChange={(e) => {
                              const caption = e.target.value;
                              setBlocks((prev) =>
                                prev.map((x, i) => {
                                  if (i !== idx) return x;
                                   const images = [...((x as any).images || [])];
                                  images[imgIdx] = { ...images[imgIdx], caption };
                                  return { ...x, images } as any;
                                }),
                              );
                            }}
                          />
                        </div>

                        <div className="md:col-span-2 flex items-center gap-2 justify-end">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setBlocks((prev) =>
                                prev.map((x, i) => {
                                  if (i !== idx) return x;
                                   const images = [...((x as any).images || [])];
                                  const j = imgIdx - 1;
                                  if (j < 0) return x;
                                  [images[imgIdx], images[j]] = [images[j], images[imgIdx]];
                                  return { ...x, images } as any;
                                }),
                              );
                            }}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setBlocks((prev) =>
                                prev.map((x, i) => {
                                  if (i !== idx) return x;
                                  const images = [...((x as any).images || [])];
                                  const j = imgIdx + 1;
                                  if (j >= images.length) return x;
                                  [images[imgIdx], images[j]] = [images[j], images[imgIdx]];
                                  return { ...x, images } as any;
                                }),
                              );
                            }}
                          >
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setBlocks((prev) =>
                                prev.map((x, i) => {
                                  if (i !== idx) return x;
                                  const images = ((x as any).images || []).filter((_: any, k: number) => k !== imgIdx);
                                  return { ...x, images } as any;
                                }),
                              );
                            }}
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>

                        {img.src ? (
                          <div className="md:col-span-12">
                            <img src={img.src} alt="" className="w-full max-h-[260px] object-cover rounded-xl" />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
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
            <h1 className="text-3xl font-bold">Портфолио — статьи</h1>
            <p className="text-muted-foreground">Блок-редактор + автогенерация HTML для Дзена</p>
          </div>
          <Button
            onClick={() => {
              setCreating(true);
              setNewMeta((p) => ({ ...p, slug: p.slug || slugifyRuEn(p.title) }));
              setNewBlocks(defaultBlocks(newMeta.title));
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Новая статья
          </Button>
        </div>

        {creating && (
          <Card>
            <CardHeader>
              <CardTitle>Новая статья</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Заголовок</Label>
                  <Input
                    value={newMeta.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewMeta((p) => ({ ...p, title, slug: p.slug || slugifyRuEn(title) }));
                      // keep H1 block in sync if first block is heading
                      setNewBlocks((prev) => {
                        if (prev[0]?.type === "heading" && prev[0].level === 1) {
                          const copy = [...prev] as any[];
                          copy[0] = { ...copy[0], text: title };
                          return copy as PortfolioBlock[];
                        }
                        return prev;
                      });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={newMeta.slug} onChange={(e) => setNewMeta((p) => ({ ...p, slug: e.target.value }))} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Описание</Label>
                  <Textarea value={newMeta.description} onChange={(e) => setNewMeta((p) => ({ ...p, description: e.target.value }))} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Обложка (URL)</Label>
                  <Input value={newMeta.cover_image_url} onChange={(e) => setNewMeta((p) => ({ ...p, cover_image_url: e.target.value }))} />
                  <p className="text-xs text-muted-foreground">Для Дзена: jpg/png/gif, ширина ≥ 700px.</p>
                </div>

                <div className="space-y-2">
                  <Label>Автор</Label>
                  <Input value={newMeta.author} onChange={(e) => setNewMeta((p) => ({ ...p, author: e.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label>Дата публикации</Label>
                  <Input
                    type="datetime-local"
                    value={newMeta.published_at}
                    onChange={(e) => setNewMeta((p) => ({ ...p, published_at: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-3 md:col-span-2">
                  <Label className="mb-0">Опубликовано</Label>
                  <Switch checked={newMeta.is_active} onCheckedChange={(v) => setNewMeta((p) => ({ ...p, is_active: v }))} />
                  <span className="text-sm text-muted-foreground">{newMeta.is_active ? "Да" : "Нет"}</span>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3">Блоки статьи</h3>
                  {renderBlocksEditor("new")}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Dzen Preview (HTML)</h3>
                  <div className="text-xs text-muted-foreground">
                    Длина текста: <b>{blocksTextLenNew}</b> (желательно ≥ 300)
                  </div>
                  <Textarea readOnly rows={18} value={blocksPreviewNew} />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => createMutation.mutate()} disabled={!newMeta.title || !newMeta.slug}>
                  <Save className="w-4 h-4 mr-2" />
                  Создать
                </Button>
                <Button variant="outline" onClick={() => setCreating(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Отмена
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
                      <p className="text-sm text-muted-foreground">
                        /portfolio/{post.slug} · {post.published_at ? format(new Date(post.published_at), "d MMM yyyy", { locale: ru }) : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => toggleActive(post.id, !!post.is_active)}>
                        {post.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>

                      {editingId === post.id ? (
                        <>
                          <Button size="sm" onClick={() => saveEdit(post.id)}>
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
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm("Удалить статью?")) deleteMutation.mutate(post.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {editingId === post.id && (
                  <CardContent className="pt-0 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Заголовок</Label>
                        <Input
                          value={editMeta.title || ""}
                          onChange={(e) => {
                            const title = e.target.value;
                            setEditMeta((p: any) => ({ ...p, title, slug: p.slug || slugifyRuEn(title) }));
                            setEditBlocks((prev) => {
                              if (prev[0]?.type === "heading" && prev[0].level === 1) {
                                const copy = [...prev] as any[];
                                copy[0] = { ...copy[0], text: title };
                                return copy as PortfolioBlock[];
                              }
                              return prev;
                            });
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input value={editMeta.slug || ""} onChange={(e) => setEditMeta((p: any) => ({ ...p, slug: e.target.value }))} />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Описание</Label>
                        <Textarea value={editMeta.description || ""} onChange={(e) => setEditMeta((p: any) => ({ ...p, description: e.target.value }))} />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Обложка (URL)</Label>
                        <Input value={editMeta.cover_image_url || ""} onChange={(e) => setEditMeta((p: any) => ({ ...p, cover_image_url: e.target.value }))} />
                        <p className="text-xs text-muted-foreground">Для Дзена: jpg/png/gif, ширина ≥ 700px.</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Автор</Label>
                        <Input value={editMeta.author || ""} onChange={(e) => setEditMeta((p: any) => ({ ...p, author: e.target.value }))} />
                      </div>

                      <div className="space-y-2">
                        <Label>Дата публикации</Label>
                        <Input
                          type="datetime-local"
                          value={editMeta.published_at || ""}
                          onChange={(e) => setEditMeta((p: any) => ({ ...p, published_at: e.target.value }))}
                        />
                      </div>

                      <div className="flex items-center gap-3 md:col-span-2">
                        <Label className="mb-0">Опубликовано</Label>
                        <Switch checked={!!editMeta.is_active} onCheckedChange={(v) => setEditMeta((p: any) => ({ ...p, is_active: v }))} />
                        <span className="text-sm text-muted-foreground">{editMeta.is_active ? "Да" : "Нет"}</span>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>GUID (стабильный для Дзена)</Label>
                        <Input value={editMeta.guid || ""} onChange={(e) => setEditMeta((p: any) => ({ ...p, guid: e.target.value }))} />
                        <p className="text-xs text-muted-foreground">Не меняй GUID без необходимости — иначе Дзен создаст дубль.</p>
                      </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <h3 className="font-semibold mb-3">Блоки статьи</h3>
                        {renderBlocksEditor("edit")}
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold">Dzen Preview (HTML)</h3>
                        <div className="text-xs text-muted-foreground">
                          Длина текста: <b>{blocksTextLenEdit}</b> (желательно ≥ 300)
                        </div>
                        <Textarea readOnly rows={18} value={blocksPreviewEdit} />
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
