 import { useState, useRef, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { MessageSquare, X, Send, Phone, Calendar, Loader2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 import { CONTACT, SERVICES_SEO_CONFIG } from "@/lib/constants";
 import { useLocation } from "react-router-dom";
 
 interface Message {
   role: "user" | "assistant";
   content: string;
 }
 
 interface LeadData {
   name: string;
   phone: string;
   serviceSlug: string | null;
   car: string;
   goal: string;
   urgency: string;
   channel: "whatsapp" | "telegram" | "call";
 }
 
 const QUICK_ACTIONS = [
   { label: "Рассчитать стоимость", message: "Хочу рассчитать стоимость" },
   { label: "Подобрать услугу", message: "Помогите подобрать услугу" },
   { label: "Показать примеры работ", message: "Покажите примеры ваших работ" },
 ];
 
 export const AIChatWidget = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [showLeadForm, setShowLeadForm] = useState(false);
   const [leadData, setLeadData] = useState<LeadData>({
     name: "",
     phone: "",
     serviceSlug: null,
     car: "",
     goal: "",
     urgency: "",
     channel: "whatsapp",
   });
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const { toast } = useToast();
   const location = useLocation();
 
   // Scroll to bottom on new messages
   useEffect(() => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);
 
   // Initial greeting
   useEffect(() => {
     if (isOpen && messages.length === 0) {
       setMessages([
         {
           role: "assistant",
           content:
             "Здравствуйте! Я консультант SUNMAXKZN. Помогу подобрать услугу, рассчитать стоимость или записать в студию. Чем могу помочь?",
         },
       ]);
     }
   }, [isOpen, messages.length]);
 
   const sendMessage = async (text: string) => {
     if (!text.trim() || isLoading) return;
 
     const userMessage: Message = { role: "user", content: text.trim() };
     setMessages((prev) => [...prev, userMessage]);
     setInput("");
     setIsLoading(true);
 
     try {
       const { data, error } = await supabase.functions.invoke("ai-chat", {
         body: {
           messages: [...messages, userMessage],
           conversationId: Date.now().toString(),
         },
       });
 
       if (error) throw error;
 
       const assistantMessage: Message = {
         role: "assistant",
         content: data.message?.content || "Произошла ошибка. Позвоните нам!",
       };
       setMessages((prev) => [...prev, assistantMessage]);
 
       // Check if we should show lead form (after 3+ exchanges)
       if (messages.length >= 4 && !showLeadForm) {
         // Detect service from conversation
         const conversationText = [...messages, userMessage]
           .map((m) => m.content)
           .join(" ")
           .toLowerCase();
         const detectedService = SERVICES_SEO_CONFIG.find((s) =>
           conversationText.includes(s.title.toLowerCase())
         );
         if (detectedService) {
           setLeadData((prev) => ({ ...prev, serviceSlug: detectedService.slug }));
         }
       }
     } catch (error) {
       console.error("Chat error:", error);
       setMessages((prev) => [
         ...prev,
         {
           role: "assistant",
           content: `Произошла ошибка. Позвоните нам: ${CONTACT.phone.display}`,
         },
       ]);
     } finally {
       setIsLoading(false);
     }
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     sendMessage(input);
   };
 
   const handleQuickAction = (message: string) => {
     sendMessage(message);
   };
 
   const createLead = async () => {
     if (!leadData.phone.trim()) {
       toast({
         title: "Введите телефон",
         variant: "destructive",
       });
       return;
     }
 
     try {
       // Build lead summary from conversation
       const conversationSummary = messages
         .slice(0, 10)
         .map((m) => `${m.role === "user" ? "Клиент" : "Бот"}: ${m.content}`)
         .join("\n");
 
       const leadSummary = `Диалог с AI-виджетом:\n${conversationSummary}\n\nАвто: ${leadData.car || "—"}\nЦель: ${leadData.goal || "—"}\nСрок: ${leadData.urgency || "—"}\nКанал: ${leadData.channel}`;
 
       // Get UTM params from URL
       const params = new URLSearchParams(window.location.search);
 
       const { error } = await supabase.from("leads").insert({
         name: leadData.name || "Клиент из чата",
         phone: leadData.phone,
         service_slug: leadData.serviceSlug,
         car_brand: leadData.car.split(" ")[0] || null,
         car_model: leadData.car.split(" ").slice(1).join(" ") || null,
         message: leadSummary,
         source_page: location.pathname,
         utm_source: params.get("utm_source"),
         utm_medium: params.get("utm_medium"),
         utm_campaign: params.get("utm_campaign"),
         status: "new",
       });
 
       if (error) throw error;
 
       toast({
         title: "Заявка отправлена!",
         description: "Мы перезвоним в ближайшее время",
       });
 
       setShowLeadForm(false);
       setMessages((prev) => [
         ...prev,
         {
           role: "assistant",
           content:
             "Отлично! Заявка отправлена. Мы свяжемся с вами в ближайшее время. Спасибо за обращение!",
         },
       ]);
     } catch (error) {
       console.error("Lead creation error:", error);
       toast({
         title: "Ошибка",
         description: "Не удалось отправить заявку. Позвоните нам!",
         variant: "destructive",
       });
     }
   };
 
   return (
     <>
       {/* Chat Bubble */}
       <AnimatePresence>
         {!isOpen && (
           <motion.button
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0, opacity: 0 }}
             onClick={() => setIsOpen(true)}
             className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
             aria-label="Открыть чат"
           >
             <MessageSquare className="w-6 h-6" />
           </motion.button>
         )}
       </AnimatePresence>
 
       {/* Chat Window */}
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: 20, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.95 }}
             className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] max-w-md bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
             style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
           >
             {/* Header */}
             <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
               <div>
                 <h3 className="font-semibold text-foreground">Консультант SUNMAXKZN</h3>
                 <p className="text-xs text-muted-foreground">Онлайн</p>
               </div>
               <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                 <X className="w-5 h-5" />
               </Button>
             </div>
 
             {/* Messages */}
             <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.map((msg, idx) => (
                 <div
                   key={idx}
                   className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                 >
                   <div
                     className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                       msg.role === "user"
                         ? "bg-primary text-primary-foreground"
                         : "bg-muted text-foreground"
                     }`}
                   >
                     <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                   </div>
                 </div>
               ))}
 
               {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-muted rounded-2xl px-4 py-2">
                     <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                   </div>
                 </div>
               )}
 
               <div ref={messagesEndRef} />
             </div>
 
             {/* Quick Actions (show only at start) */}
             {messages.length <= 1 && !showLeadForm && (
               <div className="px-4 pb-2 flex flex-wrap gap-2">
                 {QUICK_ACTIONS.map((action) => (
                   <button
                     key={action.label}
                     onClick={() => handleQuickAction(action.message)}
                     className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                   >
                     {action.label}
                   </button>
                 ))}
               </div>
             )}
 
             {/* Lead Form */}
             {showLeadForm && (
               <div className="p-4 border-t border-border bg-muted/30 space-y-3">
                 <p className="text-sm font-medium">Оставьте контакт для записи:</p>
                 <Input
                   placeholder="Ваше имя"
                   value={leadData.name}
                   onChange={(e) => setLeadData((p) => ({ ...p, name: e.target.value }))}
                 />
                 <Input
                   placeholder="Телефон *"
                   value={leadData.phone}
                   onChange={(e) => setLeadData((p) => ({ ...p, phone: e.target.value }))}
                   type="tel"
                 />
                 <Input
                   placeholder="Марка и модель авто"
                   value={leadData.car}
                   onChange={(e) => setLeadData((p) => ({ ...p, car: e.target.value }))}
                 />
                 <div className="flex gap-2">
                   <Button onClick={createLead} className="flex-1">
                     <Calendar className="w-4 h-4 mr-2" />
                     Записаться
                   </Button>
                   <Button variant="outline" onClick={() => setShowLeadForm(false)}>
                     Отмена
                   </Button>
                 </div>
               </div>
             )}
 
             {/* Input */}
             {!showLeadForm && (
               <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
                 <Input
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Напишите сообщение..."
                   disabled={isLoading}
                   className="flex-1"
                 />
                 <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                   <Send className="w-4 h-4" />
                 </Button>
               </form>
             )}
 
             {/* CTA Buttons */}
             <div className="p-3 border-t border-border bg-muted/20 flex gap-2">
               <Button
                 variant="outline"
                 size="sm"
                 className="flex-1 text-xs"
                 onClick={() => setShowLeadForm(true)}
               >
                 <Calendar className="w-3 h-3 mr-1" />
                 Записаться
               </Button>
               <Button
                 variant="outline"
                 size="sm"
                 className="flex-1 text-xs"
                 asChild
               >
                 <a href={`https://wa.me/${CONTACT.phone.whatsapp}`} target="_blank" rel="noopener">
                   WhatsApp
                 </a>
               </Button>
               <Button
                 variant="outline"
                 size="sm"
                 className="flex-1 text-xs"
                 asChild
               >
                 <a href={`tel:${CONTACT.phone.raw}`}>
                   <Phone className="w-3 h-3 mr-1" />
                   Звонок
                 </a>
               </Button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </>
   );
 };
 
 export default AIChatWidget;