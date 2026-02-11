import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Send, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ChatMessageList from "@/components/chat/ChatMessageList";

const STORAGE_KEY = "sunmax_chat_history";
const MAX_LENGTH = 2000;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    if (text.length > MAX_LENGTH) {
      toast({ title: "Слишком длинное сообщение", description: `Максимум ${MAX_LENGTH} символов`, variant: "destructive" });
      return;
    }

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("openai-chat", {
        body: { message: text },
      });

      if (error) throw error;

      setMessages((prev) => [...prev, { role: "assistant", content: data?.text || "Пустой ответ" }]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Неизвестная ошибка";
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: `Ошибка: ${errMsg}` }]);
      toast({ title: "Ошибка", description: errMsg, variant: "destructive" });
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  }, [input, isLoading, toast]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast({ title: "Чат очищен" });
  };

  const charsLeft = MAX_LENGTH - input.length;
  const isOverLimit = charsLeft < 0;

  return (
    <>
      <SEOHead title="Chat — SUNMAXKZN" description="AI-чат с ассистентом SUNMAXKZN" />
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-10">
        <div className="container max-w-3xl mx-auto px-4 flex flex-col" style={{ height: "calc(100vh - 160px)" }}>
          {/* Header bar */}
          <div className="flex items-center justify-between py-4 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">Chat</h1>
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-1" />
                Clear chat
              </Button>
            )}
          </div>

          {/* Messages */}
          <ChatMessageList messages={messages} isLoading={isLoading} />

          {/* Input area */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Напишите сообщение… (Enter — отправить, Shift+Enter — перенос)"
                  disabled={isLoading}
                  className="min-h-[56px] max-h-[160px] resize-none pr-4"
                  rows={2}
                />
              </div>
              <Button onClick={sendMessage} disabled={isLoading || !input.trim() || isOverLimit} size="icon" className="h-14 w-14 shrink-0">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {isLoading && <span className="text-primary animate-pulse">Thinking…</span>}
              {!isLoading && <span />}
              <span className={isOverLimit ? "text-destructive font-medium" : ""}>{charsLeft} / {MAX_LENGTH}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ChatPage;
