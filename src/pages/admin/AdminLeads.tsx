import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Search, Phone, Mail, Calendar, MessageSquare, Eye } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  car_brand: string | null;
  car_model: string | null;
  service_slug: string | null;
  message: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: "new" | "in_progress" | "completed" | "cancelled";
  notes: string | null;
  created_at: string;
}

const statusLabels = {
  new: "Новая",
  in_progress: "В работе",
  completed: "Завершена",
  cancelled: "Отменена",
};

const statusColors = {
  new: "bg-blue-500/10 text-blue-500",
  in_progress: "bg-yellow-500/10 text-yellow-500",
  completed: "bg-green-500/10 text-green-500",
  cancelled: "bg-gray-500/10 text-gray-500",
};

const AdminLeads = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "new" | "in_progress" | "completed" | "cancelled" }) => {
      const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads-admin"] });
      toast({ title: "Статус обновлён" });
    },
  });

  const filteredLeads = leads?.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    if (!filteredLeads) return;

    const headers = ["Дата", "Имя", "Телефон", "Email", "Услуга", "Авто", "Статус", "UTM Source"];
    const rows = filteredLeads.map((lead) => [
      format(new Date(lead.created_at), "dd.MM.yyyy HH:mm"),
      lead.name,
      lead.phone,
      lead.email || "",
      lead.service_slug || "",
      `${lead.car_brand || ""} ${lead.car_model || ""}`.trim(),
      statusLabels[lead.status],
      lead.utm_source || "",
    ]);

    const csvContent = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast({ title: "Экспорт завершён" });
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
            <h1 className="text-3xl font-bold">Заявки</h1>
            <p className="text-muted-foreground">
              Управление входящими заявками
            </p>
          </div>
          <Button onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Экспорт CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {(["new", "in_progress", "completed", "cancelled"] as const).map((status) => (
            <Card key={status}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {statusLabels[status]}
                    </p>
                    <p className="text-2xl font-bold">
                      {leads?.filter((l) => l.status === status).length || 0}
                    </p>
                  </div>
                  <Badge className={statusColors[status]}>{status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени, телефону или email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="in_progress">В работе</SelectItem>
              <SelectItem value="completed">Завершённые</SelectItem>
              <SelectItem value="cancelled">Отменённые</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads?.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {format(new Date(lead.created_at), "d MMM, HH:mm", {
                        locale: ru,
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      {lead.car_brand && (
                        <p className="text-sm text-muted-foreground">
                          {lead.car_brand} {lead.car_model}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.service_slug ? (
                      <Badge variant="outline">{lead.service_slug}</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {lead.utm_source ? (
                      <div className="text-sm">
                        <p>{lead.utm_source}</p>
                        {lead.utm_campaign && (
                          <p className="text-muted-foreground text-xs">
                            {lead.utm_campaign}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Прямой</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value: "new" | "in_progress" | "completed" | "cancelled") =>
                        updateStatusMutation.mutate({ id: lead.id, status: value })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={statusColors[lead.status]}>
                          {statusLabels[lead.status]}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новая</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="completed">Завершена</SelectItem>
                        <SelectItem value="cancelled">Отменена</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLeads?.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              Заявки не найдены
            </div>
          )}
        </Card>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Детали заявки</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Клиент</Label>
                  <p className="font-medium">{selectedLead.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Телефон</Label>
                    <p>{selectedLead.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p>{selectedLead.email || "—"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Марка авто</Label>
                    <p>{selectedLead.car_brand || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Модель</Label>
                    <p>{selectedLead.car_model || "—"}</p>
                  </div>
                </div>
                {selectedLead.message && (
                  <div>
                    <Label className="text-muted-foreground">Сообщение</Label>
                    <p className="bg-muted p-3 rounded-lg mt-1">
                      {selectedLead.message}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-muted-foreground">UTM Source</Label>
                    <p className="text-sm">{selectedLead.utm_source || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">UTM Medium</Label>
                    <p className="text-sm">{selectedLead.utm_medium || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">UTM Campaign</Label>
                    <p className="text-sm">{selectedLead.utm_campaign || "—"}</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setSelectedLead(null)}
                >
                  Закрыть
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Add Label component usage
const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm ${className || ""}`}>{children}</p>
);

export default AdminLeads;
