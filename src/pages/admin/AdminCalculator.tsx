import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, Car, DollarSign, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SERVICE_NAMES: Record<string, string> = {
  "okleyka-avto-poliuretanovoy-plenkoy-kazan": "Защита PPF",
  "aktivnyy-vyhlop-kazan": "Активный выхлоп",
  "shumoizolyaciya-avto-kazan": "Шумоизоляция",
  "udalenie-vmyatin-bez-pokraski-kazan": "Удаление вмятин PDR",
  "ustanovka-signalizacii-pandora-kazan": "Сигнализация Pandora",
};

const SIZE_CLASS_NAMES: Record<string, string> = {
  compact: "Компакт",
  medium: "Средний",
  large: "Большой",
  xl: "XL",
};

const AdminCalculator = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("prices");
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [newBrand, setNewBrand] = useState({ name: "", slug: "", is_premium: false });
  const [newModel, setNewModel] = useState({ brand_id: "", name: "", slug: "", body_type: "", size_class: "medium" });

  // Fetch data
  const { data: brands = [] } = useQuery({
    queryKey: ["admin-car-brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("car_brands")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: models = [] } = useQuery({
    queryKey: ["admin-car-models"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("car_models")
        .select("*, car_brands(name)")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: prices = [] } = useQuery({
    queryKey: ["admin-calculator-prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calculator_prices")
        .select("*")
        .order("service_slug, option_key, size_class");
      if (error) throw error;
      return data;
    },
  });

  const { data: options = [] } = useQuery({
    queryKey: ["admin-calculator-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calculator_options")
        .select("*")
        .order("service_slug, sort_order");
      if (error) throw error;
      return data;
    },
  });

  // Mutations
  const updatePrice = useMutation({
    mutationFn: async (price: any) => {
      const { error } = await supabase
        .from("calculator_prices")
        .update({
          base_price: price.base_price,
          premium_multiplier: price.premium_multiplier,
          duration_days: price.duration_days,
        })
        .eq("id", price.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-calculator-prices"] });
      toast.success("Цена обновлена");
      setEditingPrice(null);
    },
    onError: () => toast.error("Ошибка обновления"),
  });

  const addBrand = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("car_brands").insert({
        name: newBrand.name,
        slug: newBrand.slug || newBrand.name.toLowerCase().replace(/\s+/g, "-"),
        is_premium: newBrand.is_premium,
        sort_order: brands.length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-car-brands"] });
      toast.success("Марка добавлена");
      setNewBrand({ name: "", slug: "", is_premium: false });
    },
    onError: () => toast.error("Ошибка добавления"),
  });

  const deleteBrand = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("car_brands").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-car-brands"] });
      toast.success("Марка удалена");
    },
    onError: () => toast.error("Ошибка удаления"),
  });

  const addModel = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("car_models").insert({
        brand_id: newModel.brand_id,
        name: newModel.name,
        slug: newModel.slug || newModel.name.toLowerCase().replace(/\s+/g, "-"),
        body_type: newModel.body_type || null,
        size_class: newModel.size_class,
        sort_order: models.filter((m: any) => m.brand_id === newModel.brand_id).length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-car-models"] });
      toast.success("Модель добавлена");
      setNewModel({ brand_id: "", name: "", slug: "", body_type: "", size_class: "medium" });
    },
    onError: () => toast.error("Ошибка добавления"),
  });

  const deleteModel = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("car_models").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-car-models"] });
      toast.success("Модель удалена");
    },
    onError: () => toast.error("Ошибка удаления"),
  });

  const groupedPrices = prices.reduce((acc: any, price: any) => {
    const key = price.service_slug;
    if (!acc[key]) acc[key] = [];
    acc[key].push(price);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Калькулятор</h1>
        <p className="text-muted-foreground">Управление ценами и автомобилями</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="prices" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Цены
          </TabsTrigger>
          <TabsTrigger value="brands" className="gap-2">
            <Car className="w-4 h-4" />
            Марки
          </TabsTrigger>
          <TabsTrigger value="models" className="gap-2">
            <Settings className="w-4 h-4" />
            Модели
          </TabsTrigger>
        </TabsList>

        {/* Prices Tab */}
        <TabsContent value="prices">
          <div className="space-y-8">
            {Object.entries(groupedPrices).map(([serviceSlug, servicePrices]: [string, any]) => {
              const optionsForService = options.filter((o: any) => o.service_slug === serviceSlug);
              
              return (
                <motion.div
                  key={serviceSlug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <h3 className="text-lg font-semibold mb-4">
                    {SERVICE_NAMES[serviceSlug] || serviceSlug}
                  </h3>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Опция</TableHead>
                        <TableHead>Размер</TableHead>
                        <TableHead>Базовая цена</TableHead>
                        <TableHead>Множитель премиум</TableHead>
                        <TableHead>Дней</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {servicePrices.map((price: any) => {
                        const option = optionsForService.find((o: any) => o.option_key === price.option_key);
                        const isEditing = editingPrice?.id === price.id;

                        return (
                          <TableRow key={price.id}>
                            <TableCell>{option?.option_name || price.option_key}</TableCell>
                            <TableCell>{SIZE_CLASS_NAMES[price.size_class] || price.size_class}</TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="number"
                                  value={editingPrice.base_price}
                                  onChange={(e) =>
                                    setEditingPrice({
                                      ...editingPrice,
                                      base_price: parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="w-28"
                                />
                              ) : (
                                `${price.base_price.toLocaleString()} ₽`
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={editingPrice.premium_multiplier}
                                  onChange={(e) =>
                                    setEditingPrice({
                                      ...editingPrice,
                                      premium_multiplier: parseFloat(e.target.value) || 1,
                                    })
                                  }
                                  className="w-20"
                                />
                              ) : (
                                `×${price.premium_multiplier}`
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <Input
                                  type="number"
                                  value={editingPrice.duration_days}
                                  onChange={(e) =>
                                    setEditingPrice({
                                      ...editingPrice,
                                      duration_days: parseInt(e.target.value) || 1,
                                    })
                                  }
                                  className="w-16"
                                />
                              ) : (
                                price.duration_days
                              )}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => updatePrice.mutate(editingPrice)}
                                  >
                                    <Save className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingPrice(null)}
                                  >
                                    Отмена
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingPrice({ ...price })}
                                >
                                  Редактировать
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Марки автомобилей</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить марку
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая марка</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Название</Label>
                      <Input
                        value={newBrand.name}
                        onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                        placeholder="BMW"
                      />
                    </div>
                    <div>
                      <Label>Slug (URL)</Label>
                      <Input
                        value={newBrand.slug}
                        onChange={(e) => setNewBrand({ ...newBrand, slug: e.target.value })}
                        placeholder="bmw"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={newBrand.is_premium}
                        onCheckedChange={(checked) => setNewBrand({ ...newBrand, is_premium: checked })}
                      />
                      <Label>Премиум марка</Label>
                    </div>
                    <Button onClick={() => addBrand.mutate()} className="w-full">
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Премиум</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand: any) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell className="text-muted-foreground">{brand.slug}</TableCell>
                    <TableCell>
                      {brand.is_premium && (
                        <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                          Премиум
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => deleteBrand.mutate(brand.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Models Tab */}
        <TabsContent value="models">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Модели автомобилей</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить модель
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая модель</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Марка</Label>
                      <Select
                        value={newModel.brand_id}
                        onValueChange={(value) => setNewModel({ ...newModel, brand_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите марку" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand: any) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Название</Label>
                      <Input
                        value={newModel.name}
                        onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                        placeholder="X5"
                      />
                    </div>
                    <div>
                      <Label>Тип кузова</Label>
                      <Input
                        value={newModel.body_type}
                        onChange={(e) => setNewModel({ ...newModel, body_type: e.target.value })}
                        placeholder="suv, sedan, coupe..."
                      />
                    </div>
                    <div>
                      <Label>Класс размера</Label>
                      <Select
                        value={newModel.size_class}
                        onValueChange={(value) => setNewModel({ ...newModel, size_class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Компакт</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="large">Большой</SelectItem>
                          <SelectItem value="xl">XL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => addModel.mutate()} className="w-full">
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Марка</TableHead>
                  <TableHead>Модель</TableHead>
                  <TableHead>Тип кузова</TableHead>
                  <TableHead>Размер</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model: any) => (
                  <TableRow key={model.id}>
                    <TableCell className="text-muted-foreground">
                      {model.car_brands?.name}
                    </TableCell>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>{model.body_type || "-"}</TableCell>
                    <TableCell>{SIZE_CLASS_NAMES[model.size_class] || model.size_class}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => deleteModel.mutate(model.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminCalculator;
