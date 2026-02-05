 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
 // ========================
 // KNOWLEDGE BASE (RAG context from site data)
 // ========================
 const BRAND_INFO = {
   name: "SUNMAXKZN",
   positioning: "SUNMAXKZN — студия детейлинга, оклейки и тюнинга в Казани",
   phone: "+7 (903) 868-78-61",
   whatsapp: "79038687861",
   telegram: "https://t.me/sunmaxkzn",
   address: "г. Казань, ул. Техническая, 122",
   hours: "Ежедневно 9:00 — 21:00",
 };
 
 const SERVICES_DATA = [
   {
     slug: "okleyka-avto-poliuretanovoy-plenkoy-kazan",
     title: "Антигравийная защита PPF",
     description: "Защита кузова от сколов и царапин полиуретановой плёнкой",
     priceFrom: 15000,
     warranty: "до 10 лет",
     timing: "3–5 дней",
     category: "protection",
   },
   {
     slug: "tonirovka-avto-kazan",
     title: "Тонировка",
     description: "Тонировка стёкол атермальной или классической плёнкой",
     priceFrom: 3000,
     warranty: "5 лет",
     timing: "2–4 часа",
     category: "protection",
   },
   {
     slug: "okleyka-vinilom-kazan",
     title: "Оклейка винилом",
     description: "Смена цвета кузова виниловой плёнкой",
     priceFrom: 80000,
     warranty: "до 5 лет",
     timing: "4–7 дней",
     category: "protection",
   },
   {
     slug: "antihrom-kazan",
     title: "Антихром",
     description: "Оклейка хромированных деталей в чёрный",
     priceFrom: 5000,
     warranty: "до 5 лет",
     timing: "1–2 дня",
     category: "protection",
   },
   {
     slug: "okleyka-salona-kazan",
     title: "Оклейка салона",
     description: "Защита глянцевых вставок и декора салона",
     priceFrom: 5000,
     warranty: "до 3 лет",
     timing: "1–3 дня",
     category: "protection",
   },
   {
     slug: "snyatie-plenki-kazan",
     title: "Снятие плёнки",
     description: "Демонтаж защитной плёнки без повреждения ЛКП",
     priceFrom: 10000,
     warranty: null,
     timing: "1–2 дня",
     category: "protection",
   },
   {
     slug: "deteyling-kazan",
     title: "Детейлинг",
     description: "Полировка кузова, химчистка салона, нанесение керамики",
     priceFrom: 15000,
     warranty: "1 год",
     timing: "1–2 дня",
     category: "detailing",
   },
   {
     slug: "aktivnyy-vyhlop-kazan",
     title: "Активный выхлоп",
     description: "Управляемый звук выхлопа с электронными заслонками",
     priceFrom: 45000,
     warranty: "2 года",
     timing: "1–2 дня",
     category: "tuning",
   },
   {
     slug: "shumoizolyaciya-avto-kazan",
     title: "Шумоизоляция",
     description: "Комплексная шумо- и виброизоляция автомобиля",
     priceFrom: 25000,
     warranty: "3 года",
     timing: "2–5 дней",
     category: "tuning",
   },
   {
     slug: "udalenie-vmyatin-bez-pokraski-kazan",
     title: "Удаление вмятин PDR",
     description: "Беспокрасочное удаление вмятин с сохранением заводского ЛКП",
     priceFrom: 3000,
     warranty: "пожизненная",
     timing: "от 3 часов",
     category: "tuning",
   },
   {
     slug: "ustanovka-signalizacii-pandora-kazan",
     title: "Сигнализации Pandora",
     description: "Установка охранных систем с автозапуском и GPS-мониторингом",
     priceFrom: 35000,
     warranty: "3 года",
     timing: "1 день",
     category: "tuning",
   },
 ];
 
 const FAQ_DATA = [
   { q: "Какие материалы используете?", a: "Мы используем плёнки премиум-сегмента и качественные материалы проверенных производителей. Конкретные бренды уточняются при записи." },
   { q: "Сколько стоит оклейка?", a: "Стоимость зависит от услуги, марки автомобиля и объёма работ. Точную цену рассчитаем после уточнения деталей." },
   { q: "Какая гарантия?", a: "Гарантия от 1 до 10 лет в зависимости от услуги. PPF — до 10 лет, тонировка — 5 лет, шумоизоляция — 3 года." },
   { q: "Как записаться?", a: "Позвоните, напишите в WhatsApp или Telegram, либо оставьте заявку на сайте — мы перезвоним в течение 15 минут." },
   { q: "Где вы находитесь?", a: "Казань, ул. Техническая, 122. Работаем ежедневно с 9:00 до 21:00." },
 ];
 
 // ========================
 // FORBIDDEN TOPICS (мы НЕ автосервис)
 // ========================
 const FORBIDDEN_TOPICS = [
   "ремонт",
   "то ",
   "техобслуживание",
   "диагностика",
   "автосервис",
   "замена масла",
   "ходовая",
   "двигатель",
   "коробка передач",
   "развал",
   "схождение",
 ];
 
 function containsForbiddenTopic(text: string): boolean {
   const lower = text.toLowerCase();
   return FORBIDDEN_TOPICS.some((topic) => lower.includes(topic));
 }
 
 // ========================
 // BUILD SYSTEM PROMPT
 // ========================
 function buildSystemPrompt(): string {
   const servicesContext = SERVICES_DATA.map(
     (s) =>
       `- ${s.title}: ${s.description}. Цена от ${s.priceFrom?.toLocaleString("ru-RU")} ₽. Срок: ${s.timing}. Гарантия: ${s.warranty || "—"}.`
   ).join("\n");
 
   const faqContext = FAQ_DATA.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
 
   return `Ты — виртуальный консультант студии ${BRAND_INFO.positioning}.
 
 СТРОГИЕ ПРАВИЛА:
 1. Отвечай ТОЛЬКО на основе данных ниже. Если информации нет — скажи "Уточним при записи или по фото".
 2. ЗАПРЕЩЕНО: выдумывать цены, бренды материалов, проценты эффекта, "рассрочка без переплаты", "авторизованный центр".
 3. Если спрашивают про ремонт, ТО, диагностику — вежливо объясни: "Мы специализируемся на детейлинге, оклейке и тюнинге. Ремонт и ТО не выполняем."
 4. Отвечай кратко, по делу, дружелюбно. Максимум 3-4 предложения.
 5. В конце каждого ответа предлагай следующие шаги: записаться, рассчитать стоимость, написать в WhatsApp.
 
 ДАННЫЕ СТУДИИ:
 Телефон: ${BRAND_INFO.phone}
 WhatsApp: wa.me/${BRAND_INFO.whatsapp}
 Telegram: ${BRAND_INFO.telegram}
 Адрес: ${BRAND_INFO.address}
 Часы работы: ${BRAND_INFO.hours}
 
 УСЛУГИ:
 ${servicesContext}
 
 ЧАСТЫЕ ВОПРОСЫ:
 ${faqContext}
 
 Формат ответа: краткий текст + предложение записаться/рассчитать/написать.`;
 }
 
 serve(async (req) => {
   // Handle CORS preflight
   if (req.method === "OPTIONS") {
     return new Response("ok", { headers: corsHeaders });
   }
 
   try {
     const { messages, conversationId } = await req.json();
 
     if (!messages || !Array.isArray(messages)) {
       return new Response(
         JSON.stringify({ error: "messages array is required" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     // Check last user message for forbidden topics
     const lastUserMessage = messages.filter((m: any) => m.role === "user").pop();
     if (lastUserMessage && containsForbiddenTopic(lastUserMessage.content)) {
       return new Response(
         JSON.stringify({
           message: {
             role: "assistant",
             content: `Мы специализируемся на детейлинге, оклейке и тюнинге автомобилей. Ремонт, ТО и диагностику не выполняем.\n\nМогу помочь с:\n• Защитой кузова (PPF, винил, антихром)\n• Тонировкой\n• Шумоизоляцией\n• Детейлингом\n\nЧем могу помочь?`,
           },
           sources: [],
         }),
         { headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     if (!LOVABLE_API_KEY) {
       console.error("LOVABLE_API_KEY is not configured");
       return new Response(
         JSON.stringify({ error: "AI service not configured" }),
         { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const systemPrompt = buildSystemPrompt();
 
     const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           { role: "system", content: systemPrompt },
           ...messages,
         ],
         temperature: 0.3,
         max_tokens: 500,
       }),
     });
 
     if (!response.ok) {
       const errorText = await response.text();
       console.error("AI gateway error:", response.status, errorText);
       
       if (response.status === 429) {
         return new Response(
           JSON.stringify({ error: "Слишком много запросов. Попробуйте позже." }),
           { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
         );
       }
       if (response.status === 402) {
         return new Response(
           JSON.stringify({ error: "Сервис временно недоступен." }),
           { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
         );
       }
       
       return new Response(
         JSON.stringify({ error: "AI service error" }),
         { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const data = await response.json();
     const assistantMessage = data.choices?.[0]?.message?.content || "Не удалось получить ответ. Пожалуйста, позвоните нам.";
 
     // Find which services were mentioned in the response
     const mentionedServices = SERVICES_DATA.filter((s) =>
       assistantMessage.toLowerCase().includes(s.title.toLowerCase())
     ).map((s) => ({ title: s.title, slug: s.slug }));
 
     console.log(`[ai-chat] conversationId=${conversationId}, userMsg=${lastUserMessage?.content?.substring(0, 50)}`);
 
     return new Response(
       JSON.stringify({
         message: {
           role: "assistant",
           content: assistantMessage,
         },
         sources: mentionedServices,
       }),
       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error) {
     console.error("ai-chat error:", error);
     return new Response(
       JSON.stringify({ 
         error: error instanceof Error ? error.message : "Unknown error",
         fallback: "Произошла ошибка. Пожалуйста, позвоните нам: +7 (903) 868-78-61"
       }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });