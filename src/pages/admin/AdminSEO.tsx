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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, Search, Globe, Code } from "lucide-react";

interface PageSEO {
  id: string;
  page_slug: string;
  meta_title: string | null;
  meta_description: string | null;
  h1: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  schema_organization: boolean;
  schema_local_business: boolean;
  schema_breadcrumb: boolean;
  schema_faq: boolean;
  canonical_url: string | null;
}

const AdminSEO = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: seoSettings, isLoading } = useQuery({
    queryKey: ["page-seo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_seo")
        .select("*")
        .order("page_slug");
      if (error) throw error;
      return data as PageSEO[];
    },
  });

  const [editData, setEditData] = useState<Record<string, Partial<PageSEO>>>({});

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PageSEO> }) => {
      const { error } = await supabase
        .from("page_seo")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-seo"] });
      toast({ title: "SEO настройки сохранены" });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleChange = (pageSlug: string, field: keyof PageSEO, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [pageSlug]: {
        ...prev[pageSlug],
        [field]: value,
      },
    }));
  };

  const getValue = (seo: PageSEO, field: keyof PageSEO) => {
    return editData[seo.page_slug]?.[field] ?? seo[field] ?? "";
  };

  const getBoolValue = (seo: PageSEO, field: keyof PageSEO) => {
    return editData[seo.page_slug]?.[field] ?? seo[field] ?? false;
  };

  const savePageSEO = (seo: PageSEO) => {
    if (!editData[seo.page_slug]) return;
    updateMutation.mutate({ id: seo.id, updates: editData[seo.page_slug] });
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
          <h1 className="text-3xl font-bold">SEO настройки</h1>
          <p className="text-muted-foreground">
            Мета-теги, Open Graph и Schema.org разметка
          </p>
        </div>

        <Tabs defaultValue={seoSettings?.[0]?.page_slug || "home"}>
          <TabsList className="mb-4">
            {seoSettings?.map((seo) => (
              <TabsTrigger key={seo.page_slug} value={seo.page_slug}>
                /{seo.page_slug}
              </TabsTrigger>
            ))}
          </TabsList>

          {seoSettings?.map((seo) => (
            <TabsContent key={seo.page_slug} value={seo.page_slug}>
              <div className="grid gap-6">
                {/* Meta Tags */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      <CardTitle>Мета-теги</CardTitle>
                    </div>
                    <CardDescription>
                      Основные SEO настройки для поисковых систем
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input
                          value={getValue(seo, "meta_title") as string}
                          onChange={(e) =>
                            handleChange(seo.page_slug, "meta_title", e.target.value)
                          }
                          maxLength={60}
                          placeholder="Заголовок страницы для поиска"
                        />
                        <p className="text-xs text-muted-foreground">
                          {(getValue(seo, "meta_title") as string).length}/60
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>H1</Label>
                        <Input
                          value={getValue(seo, "h1") as string}
                          onChange={(e) =>
                            handleChange(seo.page_slug, "h1", e.target.value)
                          }
                          placeholder="Главный заголовок страницы"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea
                        value={getValue(seo, "meta_description") as string}
                        onChange={(e) =>
                          handleChange(seo.page_slug, "meta_description", e.target.value)
                        }
                        maxLength={160}
                        placeholder="Описание страницы для поисковой выдачи"
                      />
                      <p className="text-xs text-muted-foreground">
                        {(getValue(seo, "meta_description") as string).length}/160
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Canonical URL</Label>
                      <Input
                        value={getValue(seo, "canonical_url") as string}
                        onChange={(e) =>
                          handleChange(seo.page_slug, "canonical_url", e.target.value)
                        }
                        placeholder="https://example.com/page"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Open Graph */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <CardTitle>Open Graph</CardTitle>
                    </div>
                    <CardDescription>
                      Настройки для социальных сетей
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>OG Title</Label>
                        <Input
                          value={getValue(seo, "og_title") as string}
                          onChange={(e) =>
                            handleChange(seo.page_slug, "og_title", e.target.value)
                          }
                          placeholder="Заголовок для соцсетей"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>OG Image URL</Label>
                        <Input
                          value={getValue(seo, "og_image") as string}
                          onChange={(e) =>
                            handleChange(seo.page_slug, "og_image", e.target.value)
                          }
                          placeholder="https://example.com/og-image.jpg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>OG Description</Label>
                      <Textarea
                        value={getValue(seo, "og_description") as string}
                        onChange={(e) =>
                          handleChange(seo.page_slug, "og_description", e.target.value)
                        }
                        placeholder="Описание для соцсетей"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Schema.org */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-green-500" />
                      <CardTitle>Schema.org разметка</CardTitle>
                    </div>
                    <CardDescription>
                      Структурированные данные для расширенных сниппетов
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`org-${seo.page_slug}`}
                          checked={getBoolValue(seo, "schema_organization") as boolean}
                          onCheckedChange={(checked) =>
                            handleChange(seo.page_slug, "schema_organization", checked)
                          }
                        />
                        <Label htmlFor={`org-${seo.page_slug}`}>
                          Organization Schema
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`local-${seo.page_slug}`}
                          checked={getBoolValue(seo, "schema_local_business") as boolean}
                          onCheckedChange={(checked) =>
                            handleChange(seo.page_slug, "schema_local_business", checked)
                          }
                        />
                        <Label htmlFor={`local-${seo.page_slug}`}>
                          LocalBusiness Schema
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`breadcrumb-${seo.page_slug}`}
                          checked={getBoolValue(seo, "schema_breadcrumb") as boolean}
                          onCheckedChange={(checked) =>
                            handleChange(seo.page_slug, "schema_breadcrumb", checked)
                          }
                        />
                        <Label htmlFor={`breadcrumb-${seo.page_slug}`}>
                          Breadcrumb Schema
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`faq-${seo.page_slug}`}
                          checked={getBoolValue(seo, "schema_faq") as boolean}
                          onCheckedChange={(checked) =>
                            handleChange(seo.page_slug, "schema_faq", checked)
                          }
                        />
                        <Label htmlFor={`faq-${seo.page_slug}`}>
                          FAQ Schema
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    onClick={() => savePageSEO(seo)}
                    disabled={!editData[seo.page_slug]}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить SEO настройки
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSEO;
