import { ReactNode, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Menu,
  LogOut,
  Search,
  MessageSquare,
  Image,
  Globe,
  Navigation,
  ChevronRight,
  Calculator,
  Cog,
   Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    group: "Настройки",
    items: [
      { title: "Глобальные настройки", url: "/admin/settings", icon: Cog },
    ],
  },
  {
    group: "Контент",
    items: [
      { title: "Главная страница", url: "/admin", icon: LayoutDashboard },
      { title: "Услуги", url: "/admin/services", icon: FileText },
      { title: "Блог", url: "/admin/blog", icon: FileText },
      { title: "Кейсы", url: "/admin/cases", icon: Image },
    ],
  },
  {
    group: "SEO",
    items: [
      { title: "Мета-теги", url: "/admin/seo", icon: Search },
      { title: "Open Graph", url: "/admin/seo/og", icon: Globe },
    ],
  },
  {
    group: "Структура",
    items: [
      { title: "Меню", url: "/admin/menu", icon: Navigation },
      { title: "Секции", url: "/admin/sections", icon: Menu },
    ],
  },
  {
    group: "Заявки",
    items: [
      { title: "Все заявки", url: "/admin/leads", icon: MessageSquare },
    ],
  },
  {
    group: "Инструменты",
    items: [
      { title: "Калькулятор", url: "/admin/calculator", icon: Calculator },
       { title: "Марки авто", url: "/admin/cars", icon: Car },
    ],
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, isLoading, signOut } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg">SUNMAXKZN</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            {menuItems.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.url}
                        >
                          <Link to={item.url}>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium text-sm">
                  {user.email?.[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground">Администратор</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/admin" className="hover:text-foreground">
                  Админ
                </Link>
                {location.pathname !== "/admin" && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground">
                      {menuItems
                        .flatMap((g) => g.items)
                        .find((i) => i.url === location.pathname)?.title || "Страница"}
                    </span>
                  </>
                )}
              </nav>
            </div>
          </header>

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
