import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { ChatMessage } from "@/pages/ChatPage";

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatMessageList = ({ messages, isLoading }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="text-center text-muted-foreground text-sm py-8">
        Начните диалог — напишите сообщение ниже
      </div>
    );
  }

  return (
    <>
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-muted rounded-2xl px-4 py-3">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </>
  );
};

export default ChatMessageList;
