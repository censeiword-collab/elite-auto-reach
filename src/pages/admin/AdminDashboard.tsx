import { motion } from "framer-motion";
import { LayoutDashboard, FileText, Image, MessageSquare, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServices } from "@/hooks/useService";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const { data: services } = useServices();
  const { data: blogPosts } = useBlogPosts();

  const { data: leadsCount } = useQuery({
    queryKey: ["leads-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: casesCount } = useQuery({
    queryKey: ["cases-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("cases")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const stats = [
    {
      title: "Услуги",
      value: services?.length || 0,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Статьи",
      value: blogPosts?.length || 0,
      icon: FileText,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Кейсы",
      value: casesCount || 0,
      icon: Image,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Заявки",
      value: leadsCount || 0,
      icon: MessageSquare,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Панель управления</h1>
          <p className="text-muted-foreground mt-1">
            Добро пожаловать в админ-панель SUNMAXKZN
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Редактировать услуги</h3>
                  <p className="text-sm text-muted-foreground">
                    Тексты, цены, SEO
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <LayoutDashboard className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Настроить секции</h3>
                  <p className="text-sm text-muted-foreground">
                    Порядок, видимость
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Просмотреть заявки</h3>
                  <p className="text-sm text-muted-foreground">
                    {leadsCount || 0} новых заявок
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
