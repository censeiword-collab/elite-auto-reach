import { useState, useEffect } from "react";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const PHONE_NUMBER = "+79038687861";
const WHATSAPP_URL = `https://wa.me/79038687861?text=Здравствуйте! Хочу записаться на услугу.`;

const MobileStickyCTA = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="flex gap-2">
        <Button asChild className="flex-1 btn-glow" size="lg">
          <a href="/zayavka">
            <Calculator className="w-4 h-4 mr-2" />
            Рассчитать
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-4">
          <a href={`tel:${PHONE_NUMBER}`}>
            <Phone className="w-5 h-5" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5" />
          </a>
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Перезвоним в течение 10–15 минут
      </p>
    </div>
  );
};

export default MobileStickyCTA;
