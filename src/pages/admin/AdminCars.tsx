 import { useState } from "react";
 import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 import { supabase } from "@/integrations/supabase/client";
 import AdminLayout from "@/components/admin/AdminLayout";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { RefreshCw, Plus, Trash2, Car, ExternalLink } from "lucide-react";
 import { useToast } from "@/hooks/use-toast";
 import { ScrollArea } from "@/components/ui/scroll-area";
 
 interface CarBrand {
   id: string;
   name: string;
   is_active: boolean;
   sort_order: number;
 }
 
 interface SyncInfo {
   lastSyncedAt: string | null;
   syncSourceUrl: string;
   totalBrands: number;
 }
 
 const AdminCars = () => {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [newBrandName, setNewBrandName] = useState("");
   const [isSyncing, setIsSyncing] = useState(false);
 
   // Fetch car brands
   const { data: carBrands = [], isLoading } = useQuery({
     queryKey: ["admin-car-brands"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("car_brands_list")
         .select("*")
         .order("sort_order", { ascending: true });
       if (error) throw error;
       return data as CarBrand[];
     },
   });
 
   // Fetch sync info
   const { data: syncInfo } = useQuery({
     queryKey: ["car-brands-sync-info"],
     queryFn: async () => {
       const { data, error } = await supabase
         .from("site_settings")
         .select("value")
         .eq("key", "carBrandsSyncInfo")
         .single();
       if (error) return { lastSyncedAt: null, syncSourceUrl: "https://loader.alarmtrade.ru/", totalBrands: 0 } as SyncInfo;
       return data.value as unknown as SyncInfo;
     },
   });
 
   // Add brand mutation
   const addBrandMutation = useMutation({
     mutationFn: async (name: string) => {
       const { error } = await supabase
         .from("car_brands_list")
         .insert({ name, sort_order: carBrands.length + 1 });
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["admin-car-brands"] });
       setNewBrandName("");
       toast({ title: "Марка добавлена" });
     },
     onError: (error: Error) => {
       toast({ title: "Ошибка", description: error.message, variant: "destructive" });
     },
   });
 
   // Delete brand mutation
   const deleteBrandMutation = useMutation({
     mutationFn: async (id: string) => {
       const { error } = await supabase
         .from("car_brands_list")
         .delete()
         .eq("id", id);
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["admin-car-brands"] });
       toast({ title: "Марка удалена" });
     },
   });
 
   // Sync brands from AlarmTrade
   const syncBrands = async () => {
     setIsSyncing(true);
     try {
       const { data, error } = await supabase.functions.invoke("sync-car-brands");
       if (error) throw error;
       
       queryClient.invalidateQueries({ queryKey: ["admin-car-brands"] });
       queryClient.invalidateQueries({ queryKey: ["car-brands-sync-info"] });
       
       toast({
         title: "Синхронизация завершена",
         description: `Добавлено марок: ${data?.added || 0}`,
       });
     } catch (error: unknown) {
       const message = error instanceof Error ? error.message : "Неизвестная ошибка";
       toast({
         title: "Ошибка синхронизации",
         description: message,
         variant: "destructive",
       });
     } finally {
       setIsSyncing(false);
     }
   };
 
   const handleAddBrand = (e: React.FormEvent) => {
     e.preventDefault();
     if (newBrandName.trim()) {
       addBrandMutation.mutate(newBrandName.trim());
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div>
           <h1 className="text-2xl font-bold">Марки автомобилей</h1>
           <p className="text-muted-foreground">
             Управление списком марок для калькулятора и AI-виджета
           </p>
         </div>
 
         {/* Sync Card */}
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <RefreshCw className="w-5 h-5" />
               Синхронизация с AlarmTrade
             </CardTitle>
             <CardDescription>
               Источник: {syncInfo?.syncSourceUrl || "https://loader.alarmtrade.ru/"}
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
               <Button onClick={syncBrands} disabled={isSyncing}>
                 {isSyncing ? (
                   <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                 ) : (
                   <RefreshCw className="w-4 h-4 mr-2" />
                 )}
                 Sync Brands
               </Button>
               <a
                 href="https://loader.alarmtrade.ru/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm text-primary flex items-center gap-1 hover:underline"
               >
                 Открыть источник
                 <ExternalLink className="w-3 h-3" />
               </a>
             </div>
             {syncInfo?.lastSyncedAt && (
               <p className="text-sm text-muted-foreground">
                 Последняя синхронизация: {new Date(syncInfo.lastSyncedAt).toLocaleString("ru-RU")}
               </p>
             )}
           </CardContent>
         </Card>
 
         {/* Add Brand */}
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Plus className="w-5 h-5" />
               Добавить марку вручную
             </CardTitle>
           </CardHeader>
           <CardContent>
             <form onSubmit={handleAddBrand} className="flex gap-2">
               <Input
                 placeholder="Название марки"
                 value={newBrandName}
                 onChange={(e) => setNewBrandName(e.target.value)}
                 className="max-w-xs"
               />
               <Button type="submit" disabled={addBrandMutation.isPending}>
                 Добавить
               </Button>
             </form>
           </CardContent>
         </Card>
 
         {/* Brands List */}
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Car className="w-5 h-5" />
               Список марок ({carBrands.length})
             </CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <p className="text-muted-foreground">Загрузка...</p>
             ) : (
               <ScrollArea className="h-[400px] pr-4">
                 <div className="flex flex-wrap gap-2">
                   {carBrands.map((brand) => (
                     <Badge
                       key={brand.id}
                       variant={brand.is_active ? "default" : "secondary"}
                       className="group relative pr-8"
                     >
                       {brand.name}
                       <button
                         onClick={() => deleteBrandMutation.mutate(brand.id)}
                         className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                         title="Удалить"
                       >
                         <Trash2 className="w-3 h-3 text-destructive" />
                       </button>
                     </Badge>
                   ))}
                 </div>
               </ScrollArea>
             )}
           </CardContent>
         </Card>
       </div>
     </AdminLayout>
   );
 };
 
 export default AdminCars;