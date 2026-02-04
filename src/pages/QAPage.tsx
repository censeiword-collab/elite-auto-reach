import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Copy,
  Download,
  FileJson,
  FileText,
  List,
  FormInput,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQA } from "@/contexts/QAContext";
import {
  qaRoutes,
  qaContent,
  generateRoutesJSON,
  generateContentJSON,
  QARoute,
} from "@/lib/qa-routes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const QAPage = () => {
  const { isQAMode, toggleQAMode, submissions, clearSubmissions } = useQA();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const publicRoutes = qaRoutes.filter((r) => r.type !== "admin");
  const adminRoutes = qaRoutes.filter((r) => r.type === "admin");

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(label);
    toast.success(`${label} скопировано`);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Файл ${filename} скачан`);
  };

  const RouteCard = ({ route }: { route: QARoute }) => (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <a
            href={route.path}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-primary hover:underline truncate"
          >
            {route.path}
          </a>
          <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground truncate">{route.title}</p>
        <p className="text-xs font-medium mt-1">H1: {route.h1}</p>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <Badge variant={route.type === "static" ? "default" : route.type === "dynamic" ? "secondary" : "outline"}>
          {route.type}
        </Badge>
        {route.requiresAuth && (
          <Badge variant="destructive" className="text-[10px]">
            Auth
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">
                🧪 QA Testing Dashboard
              </h1>
              <p className="text-muted-foreground">
                Панель для тестирования сайта, проверки форм и экспорта контента
              </p>
            </div>

            {/* QA Mode Toggle */}
            <Card className="mb-6 border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      {isQAMode ? (
                        <ToggleRight className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">QA Mode</p>
                      <p className="text-sm text-muted-foreground">
                        {isQAMode
                          ? "Формы отправляются в mock-handler"
                          : "Формы работают в обычном режиме"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={toggleQAMode}
                    variant={isQAMode ? "default" : "outline"}
                    className={isQAMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : ""}
                  >
                    {isQAMode ? "Выключить" : "Включить"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="routes" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="routes" className="gap-2">
                  <List className="w-4 h-4" />
                  Роуты
                </TabsTrigger>
                <TabsTrigger value="content" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Контент
                </TabsTrigger>
                <TabsTrigger value="forms" className="gap-2">
                  <FormInput className="w-4 h-4" />
                  Формы
                </TabsTrigger>
                <TabsTrigger value="export" className="gap-2">
                  <FileJson className="w-4 h-4" />
                  Экспорт
                </TabsTrigger>
              </TabsList>

              {/* Routes Tab */}
              <TabsContent value="routes" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Публичные страницы ({publicRoutes.length})
                      </CardTitle>
                      <CardDescription>
                        Доступны без авторизации
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-2">
                          {publicRoutes.map((route) => (
                            <RouteCard key={route.path} route={route} />
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-orange-500" />
                        Админ-панель ({adminRoutes.length})
                      </CardTitle>
                      <CardDescription>
                        Требуется авторизация
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-2">
                          {adminRoutes.map((route) => (
                            <RouteCard key={route.path} route={route} />
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Контент страниц для проверки</CardTitle>
                    <CardDescription>
                      Тексты кнопок, форм и основной контент
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {qaContent.map((content) => (
                        <div
                          key={content.page}
                          className="p-4 rounded-lg border border-border"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-mono text-primary font-semibold">
                              {content.page}
                            </h3>
                            <a
                              href={content.page}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-primary"
                            >
                              Открыть →
                            </a>
                          </div>
                          <p className="font-medium mb-3">H1: {content.h1}</p>

                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">
                                Кнопки:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {content.buttons.map((btn) => (
                                  <Badge key={btn} variant="secondary" className="text-xs">
                                    {btn}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">
                                Поля форм:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {content.formLabels.map((label) => (
                                  <Badge key={label} variant="outline" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-muted-foreground mb-1">
                                Сообщения об ошибках:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {content.errorMessages.map((msg) => (
                                  <Badge
                                    key={msg}
                                    variant="destructive"
                                    className="text-xs font-normal"
                                  >
                                    {msg}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Forms Tab */}
              <TabsContent value="forms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FormInput className="w-5 h-5" />
                          Mock-отправки форм
                        </CardTitle>
                        <CardDescription>
                          {isQAMode
                            ? "QA режим включён — формы не отправляются в базу"
                            : "Включите QA режим для перехвата форм"}
                        </CardDescription>
                      </div>
                      {submissions.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearSubmissions}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Очистить
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {submissions.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <FormInput className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">Нет перехваченных форм</p>
                        <p className="text-sm mt-1">
                          {isQAMode
                            ? "Отправьте любую форму на сайте"
                            : "Включите QA режим и отправьте форму"}
                        </p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-4">
                          {submissions.map((sub) => (
                            <div
                              key={sub.id}
                              className="p-4 rounded-lg border border-border bg-accent/30"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline">{sub.formType}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {sub.timestamp.toLocaleString("ru-RU")}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                Страница: {sub.sourcePage}
                              </p>
                              <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
                                {JSON.stringify(sub.payload, null, 2)}
                              </pre>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2"
                                onClick={() =>
                                  copyToClipboard(
                                    JSON.stringify(sub.payload, null, 2),
                                    "Payload"
                                  )
                                }
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Копировать
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Export Tab */}
              <TabsContent value="export" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileJson className="w-5 h-5 text-blue-500" />
                        routes.json
                      </CardTitle>
                      <CardDescription>
                        Полный список всех роутов с метаданными
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <pre className="text-xs bg-accent p-4 rounded-lg overflow-x-auto max-h-[200px]">
                        {generateRoutesJSON().slice(0, 500)}...
                      </pre>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            copyToClipboard(generateRoutesJSON(), "routes.json")
                          }
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copiedItem === "routes.json" ? "Скопировано!" : "Копировать"}
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() =>
                            downloadFile(
                              generateRoutesJSON(),
                              "routes.json",
                              "application/json"
                            )
                          }
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-500" />
                        content.json
                      </CardTitle>
                      <CardDescription>
                        Тексты, кнопки, ошибки для проверки
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <pre className="text-xs bg-accent p-4 rounded-lg overflow-x-auto max-h-[200px]">
                        {generateContentJSON().slice(0, 500)}...
                      </pre>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            copyToClipboard(generateContentJSON(), "content.json")
                          }
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copiedItem === "content.json" ? "Скопировано!" : "Копировать"}
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() =>
                            downloadFile(
                              generateContentJSON(),
                              "content.json",
                              "application/json"
                            )
                          }
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sitemap HTML */}
                <Card>
                  <CardHeader>
                    <CardTitle>sitemap.html</CardTitle>
                    <CardDescription>
                      HTML-версия карты сайта для ручной проверки
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => {
                        const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>SUNMAXKZN Sitemap</title>
  <style>body{font-family:system-ui;max-width:800px;margin:0 auto;padding:20px}h1{color:#EA580C}table{width:100%;border-collapse:collapse}th,td{padding:10px;border:1px solid #ddd;text-align:left}th{background:#f5f5f5}</style>
</head>
<body>
  <h1>SUNMAXKZN — Карта сайта</h1>
  <table>
    <tr><th>URL</th><th>Title</th><th>H1</th><th>Тип</th></tr>
    ${qaRoutes
      .map(
        (r) =>
          `<tr><td><a href="${r.path}">${r.path}</a></td><td>${r.title}</td><td>${r.h1}</td><td>${r.type}</td></tr>`
      )
      .join("\n")}
  </table>
</body>
</html>`;
                        downloadFile(html, "sitemap.html", "text/html");
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать sitemap.html
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Prerender Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>⚡ О пререндеринге</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong>Текущий стек:</strong> Vite + React (SPA). Полноценный SSR
                  требует миграции на Next.js или Remix.
                </p>
                <div className="space-y-2">
                  <p><strong>Что реализовано для SEO без JS:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Полные meta-теги в index.html</li>
                    <li>Open Graph и Twitter Cards</li>
                    <li>Semantic HTML (header, main, footer, article)</li>
                    <li>JSON-LD структурированные данные</li>
                    <li>Статичный robots.txt и sitemap.xml</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p><strong>Для внешнего QA:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>✅ Карта роутов с title/H1</li>
                    <li>✅ Экспорт контента в JSON</li>
                    <li>✅ QA-режим для форм (mock-handler)</li>
                    <li>✅ Доступ через /qa или ?qa=1</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QAPage;
