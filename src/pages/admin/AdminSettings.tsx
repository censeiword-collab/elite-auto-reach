 import { useState, useEffect } from "react";
 import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 import AdminLayout from "@/components/admin/AdminLayout";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Switch } from "@/components/ui/switch";
 import { Badge } from "@/components/ui/badge";
 import { useToast } from "@/hooks/use-toast";
 import { Save, Globe, Phone, MapPin, MessageCircle, Shield, X, Plus } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";
 
 interface SiteSettings {
   brandName: string;
   tagline: string;
   positioning: string;
   phone: string;
   phoneDisplay: string;
   email: string;
   address: string;
   landmark: string;
   city: string;
   workingHours: string;
   whatsapp: string;
   telegram: string;
   vk: string;
   instagram: string;
  // Координаты для карты
  mapLatitude: number;
  mapLongitude: number;
   // Admin toggles
   whitelistBrands: string[];
   installmentEnabled: boolean;
   installmentText: string;
   authorizedCenterClaimEnabled: boolean;
   noiseReductionPercentEnabled: boolean;
 }
 
const defaultSettings: SiteSettings = {
  brandName: "SUNMAXKZN",
  tagline: "студия детейлинга, оклейки и тюнинга в Казани",
  positioning: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
  phone: "+79038687861",
  phoneDisplay: "+7 (903) 868-78-61",
  email: "info@sunmaxkzn.ru",
  address: "г. Казань, ул. Техническая, 122",
  landmark: "Рядом с ТЦ МЕГА",
  city: "Казань",
  workingHours: "Ежедневно 9:00 — 21:00",
  whatsapp: "79038687861",
  telegram: "https://t.me/sunmaxkzn",
  vk: "https://vk.com/sunmaxkzn",
  instagram: "https://instagram.com/sunmaxkzn",
  // Координаты для карты (дефолт — Казань, ул. Техническая)
  mapLatitude: 55.796127,
  mapLongitude: 49.122141,
  // Admin toggles - defaults
  whitelistBrands: [],
  installmentEnabled: false,
  installmentText: "Рассрочка (условия уточняются при записи)",
  authorizedCenterClaimEnabled: false,
  noiseReductionPercentEnabled: false,
};
 
 const AdminSettings = () => {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
   const [newBrand, setNewBrand] = useState("");
 
   const { data: savedSettings, isLoading } = useQuery({
     queryKey: ["site-settings-global"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("site_settings")
         .select("*")
         .eq("key", "global")
         .single();
       if (error && error.code !== "PGRST116") throw error;
      return data?.value as unknown as SiteSettings | null;
     },
   });
 
   useEffect(() => {
     if (savedSettings) {
       setSettings({ ...defaultSettings, ...savedSettings });
     }
   }, [savedSettings]);
 
   const saveMutation = useMutation({
     mutationFn: async (newSettings: SiteSettings) => {
      // First try to get existing record
      const { data: existing } = await supabase
         .from("site_settings")
        .select("id")
        .eq("key", "global")
        .single();
 
      let error;
      if (existing) {
        // Update existing
        const result = await supabase
          .from("site_settings")
          .update({
            value: newSettings as unknown as Json,
            updated_at: new Date().toISOString(),
          })
          .eq("key", "global");
        error = result.error;
      } else {
        // Insert new
        const result = await supabase
          .from("site_settings")
          .insert([{
            key: "global",
            value: newSettings as unknown as Json,
          }]);
        error = result.error;
      }
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["site-settings-global"] });
       toast({ title: "Настройки сохранены" });
     },
     onError: (error) => {
       toast({ title: "Ошибка", description: error.message, variant: "destructive" });
     },
   });
 
   const handleChange = (field: keyof SiteSettings, value: string) => {
     setSettings((prev) => ({ ...prev, [field]: value }));
   };
 
   const handleSave = () => {
     // Validate phone format
     const phoneNormalized = settings.phone.replace(/\D/g, "");
     if (phoneNormalized.length < 10) {
       toast({ title: "Ошибка", description: "Некорректный номер телефона", variant: "destructive" });
       return;
     }
     
     // Check for forbidden words
     const forbiddenWords = ["автосервис", "ремонт", "ТО", "диагностика"];
     const allText = `${settings.tagline} ${settings.positioning}`.toLowerCase();
     const foundForbidden = forbiddenWords.find((w) => allText.includes(w.toLowerCase()));
     if (foundForbidden) {
       toast({
         title: "Предупреждение",
         description: `Текст содержит запрещённое слово: "${foundForbidden}". SUNMAXKZN — не автосервис.`,
         variant: "destructive",
       });
       return;
     }
 
     saveMutation.mutate(settings);
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
             <h1 className="text-3xl font-bold">Глобальные настройки</h1>
             <p className="text-muted-foreground">
               Бренд, контакты, позиционирование сайта
             </p>
           </div>
           <Button onClick={handleSave} disabled={saveMutation.isPending}>
             <Save className="w-4 h-4 mr-2" />
             {saveMutation.isPending ? "Сохранение..." : "Сохранить"}
           </Button>
         </div>
 
         <Tabs defaultValue="brand">
           <TabsList>
             <TabsTrigger value="brand">
               <Globe className="w-4 h-4 mr-2" />
               Бренд
             </TabsTrigger>
             <TabsTrigger value="contacts">
               <Phone className="w-4 h-4 mr-2" />
               Контакты
             </TabsTrigger>
             <TabsTrigger value="social">
               <MessageCircle className="w-4 h-4 mr-2" />
               Соцсети
             </TabsTrigger>
               <TabsTrigger value="claims">
                 <Shield className="w-4 h-4 mr-2" />
                 Заявления
               </TabsTrigger>
           </TabsList>
 
           <TabsContent value="brand" className="mt-6 space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle>Бренд и позиционирование</CardTitle>
                 <CardDescription>
                   Эти данные используются в шапке, подвале и SEO
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid gap-4 md:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="brandName">Название бренда</Label>
                     <Input
                       id="brandName"
                       value={settings.brandName}
                       onChange={(e) => handleChange("brandName", e.target.value)}
                       placeholder="SUNMAXKZN"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="city">Город</Label>
                     <Input
                       id="city"
                       value={settings.city}
                       onChange={(e) => handleChange("city", e.target.value)}
                       placeholder="Казань"
                     />
                   </div>
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="tagline">Слоган (короткий)</Label>
                   <Input
                     id="tagline"
                     value={settings.tagline}
                     onChange={(e) => handleChange("tagline", e.target.value)}
                     placeholder="студия детейлинга, оклейки и тюнинга в Казани"
                   />
                   <p className="text-xs text-muted-foreground">
                     Используется в подвале и мета-тегах. НЕ использовать слово "автосервис".
                   </p>
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="positioning">Полное позиционирование</Label>
                   <Textarea
                     id="positioning"
                     value={settings.positioning}
                     onChange={(e) => handleChange("positioning", e.target.value)}
                     placeholder="SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани"
                     rows={2}
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           <TabsContent value="contacts" className="mt-6 space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle>Контактные данные</CardTitle>
                 <CardDescription>
                   Телефон, email, адрес и режим работы
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid gap-4 md:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="phone">Телефон (для ссылок)</Label>
                     <Input
                       id="phone"
                       value={settings.phone}
                       onChange={(e) => handleChange("phone", e.target.value)}
                       placeholder="+79038687861"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="phoneDisplay">Телефон (отображение)</Label>
                     <Input
                       id="phoneDisplay"
                       value={settings.phoneDisplay}
                       onChange={(e) => handleChange("phoneDisplay", e.target.value)}
                       placeholder="+7 (903) 868-78-61"
                     />
                   </div>
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     type="email"
                     value={settings.email}
                     onChange={(e) => handleChange("email", e.target.value)}
                     placeholder="info@sunmaxkzn.ru"
                   />
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="address">Адрес</Label>
                   <Input
                     id="address"
                     value={settings.address}
                     onChange={(e) => handleChange("address", e.target.value)}
                     placeholder="г. Казань, ул. Техническая, 122"
                   />
                     <p className="text-xs text-muted-foreground">
                       Оставьте пустым, чтобы скрыть адрес на сайте
                     </p>
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="landmark">Ориентир</Label>
                     <Input
                       id="landmark"
                       value={settings.landmark}
                       onChange={(e) => handleChange("landmark", e.target.value)}
                       placeholder="Рядом с ТЦ МЕГА"
                     />
                 </div>
 
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mapLatitude">Широта (для карты)</Label>
                    <Input
                      id="mapLatitude"
                      type="number"
                      step="0.000001"
                      value={settings.mapLatitude}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          mapLatitude: parseFloat(e.target.value) || 55.796127,
                        }))
                      }
                      placeholder="55.796127"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mapLongitude">Долгота (для карты)</Label>
                    <Input
                      id="mapLongitude"
                      type="number"
                      step="0.000001"
                      value={settings.mapLongitude}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          mapLongitude: parseFloat(e.target.value) || 49.122141,
                        }))
                      }
                      placeholder="49.122141"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Координаты можно найти на Яндекс.Картах: ПКМ по точке → "Что здесь?"
                </p>

                 <div className="space-y-2">
                   <Label htmlFor="workingHours">Режим работы</Label>
                   <Input
                     id="workingHours"
                     value={settings.workingHours}
                     onChange={(e) => handleChange("workingHours", e.target.value)}
                     placeholder="Ежедневно 9:00 — 21:00"
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           <TabsContent value="social" className="mt-6 space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle>Социальные сети и мессенджеры</CardTitle>
                 <CardDescription>
                   Ссылки на профили и номера для мессенджеров
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid gap-4 md:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="whatsapp">WhatsApp (номер)</Label>
                     <Input
                       id="whatsapp"
                       value={settings.whatsapp}
                       onChange={(e) => handleChange("whatsapp", e.target.value)}
                       placeholder="79038687861"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="telegram">Telegram (ссылка)</Label>
                     <Input
                       id="telegram"
                       value={settings.telegram}
                       onChange={(e) => handleChange("telegram", e.target.value)}
                       placeholder="https://t.me/sunmaxkzn"
                     />
                   </div>
                 </div>
 
                 <div className="grid gap-4 md:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="vk">ВКонтакте (ссылка)</Label>
                     <Input
                       id="vk"
                       value={settings.vk}
                       onChange={(e) => handleChange("vk", e.target.value)}
                       placeholder="https://vk.com/sunmaxkzn"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="instagram">Instagram (ссылка)</Label>
                     <Input
                       id="instagram"
                       value={settings.instagram}
                       onChange={(e) => handleChange("instagram", e.target.value)}
                       placeholder="https://instagram.com/sunmaxkzn"
                     />
                   </div>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
             <TabsContent value="claims" className="mt-6 space-y-6">
               <Card>
                 <CardHeader>
                   <CardTitle>Маркетинговые заявления</CardTitle>
                   <CardDescription>
                     Управление утверждениями, которые требуют подтверждения владельца
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="space-y-4 border-b pb-4">
                     <div className="flex items-center justify-between">
                       <div>
                         <h4 className="font-medium">Рассрочка</h4>
                         <p className="text-sm text-muted-foreground">
                           Показывать информацию о рассрочке на странице цен
                         </p>
                       </div>
                       <Switch
                         checked={settings.installmentEnabled}
                         onCheckedChange={(checked) =>
                           setSettings((prev) => ({ ...prev, installmentEnabled: checked }))
                         }
                       />
                     </div>
                     {settings.installmentEnabled && (
                       <Input
                         value={settings.installmentText}
                         onChange={(e) => handleChange("installmentText", e.target.value)}
                         placeholder="Рассрочка без переплаты"
                       />
                     )}
                   </div>
 
                   <div className="space-y-4 border-b pb-4">
                     <div className="flex items-center justify-between">
                       <div>
                         <h4 className="font-medium">Авторизованный центр Pandora</h4>
                         <p className="text-sm text-muted-foreground">
                           Показывать статус "Авторизованный установочный центр"
                         </p>
                       </div>
                       <Switch
                         checked={settings.authorizedCenterClaimEnabled}
                         onCheckedChange={(checked) =>
                           setSettings((prev) => ({ ...prev, authorizedCenterClaimEnabled: checked }))
                         }
                       />
                     </div>
                     <p className="text-xs text-muted-foreground">
                       {settings.authorizedCenterClaimEnabled
                         ? 'Будет отображаться: "Авторизованный установочный центр"'
                         : 'Будет отображаться: "Профессиональная установка оборудования"'}
                     </p>
                   </div>
 
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <div>
                         <h4 className="font-medium">Проценты снижения шума</h4>
                         <p className="text-sm text-muted-foreground">
                           Показывать "снижение на 40–60%" на странице шумоизоляции
                         </p>
                       </div>
                       <Switch
                         checked={settings.noiseReductionPercentEnabled}
                         onCheckedChange={(checked) =>
                           setSettings((prev) => ({ ...prev, noiseReductionPercentEnabled: checked }))
                         }
                       />
                     </div>
                     <p className="text-xs text-muted-foreground">
                       {settings.noiseReductionPercentEnabled
                         ? 'Будет отображаться: "Снижение шума на 40–60%"'
                         : 'Будет отображаться: "Заметное снижение шума"'}
                     </p>
                   </div>
                 </CardContent>
               </Card>
 
               <Card>
                 <CardHeader>
                   <CardTitle>Whitelist брендов материалов</CardTitle>
                   <CardDescription>
                     Бренды из этого списка можно упоминать на сайте (SUNMAX и т.д.)
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="flex gap-2">
                     <Input
                       value={newBrand}
                       onChange={(e) => setNewBrand(e.target.value)}
                       placeholder="Название бренда (например, SUNMAX)"
                       onKeyDown={(e) => {
                         if (e.key === "Enter" && newBrand.trim()) {
                           e.preventDefault();
                           if (!settings.whitelistBrands.includes(newBrand.trim())) {
                             setSettings((prev) => ({
                               ...prev,
                               whitelistBrands: [...prev.whitelistBrands, newBrand.trim()],
                             }));
                           }
                           setNewBrand("");
                         }
                       }}
                     />
                     <Button
                       type="button"
                       variant="outline"
                       onClick={() => {
                         if (newBrand.trim() && !settings.whitelistBrands.includes(newBrand.trim())) {
                           setSettings((prev) => ({
                             ...prev,
                             whitelistBrands: [...prev.whitelistBrands, newBrand.trim()],
                           }));
                         }
                         setNewBrand("");
                       }}
                     >
                       <Plus className="w-4 h-4" />
                     </Button>
                   </div>
 
                   <div className="flex flex-wrap gap-2">
                     {settings.whitelistBrands.length === 0 ? (
                       <p className="text-sm text-muted-foreground">
                         Список пуст. Бренды материалов не отображаются на сайте.
                       </p>
                     ) : (
                       settings.whitelistBrands.map((brand) => (
                         <Badge key={brand} variant="secondary" className="gap-1">
                           {brand}
                           <button
                             type="button"
                             onClick={() =>
                               setSettings((prev) => ({
                                 ...prev,
                                 whitelistBrands: prev.whitelistBrands.filter((b) => b !== brand),
                               }))
                             }
                             className="ml-1 hover:text-destructive"
                           >
                             <X className="w-3 h-3" />
                           </button>
                         </Badge>
                       ))
                     )}
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>
         </Tabs>
       </div>
     </AdminLayout>
   );
 };
 
 export default AdminSettings;