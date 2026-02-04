import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Защита PPF" },
  { href: "/aktivnyy-vyhlop-kazan", label: "Выхлоп" },
  { href: "/shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
  { href: "/udalenie-vmyatin-bez-pokraski-kazan", label: "PDR" },
  { href: "/ustanovka-signalizacii-pandora-kazan", label: "Pandora" },
  { href: "/price", label: "Услуги" },
  { href: "/contacts", label: "Контакты" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-lg group-hover:shadow-gold transition-shadow duration-300">
              <Sun className="w-6 h-6 text-background" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-extrabold tracking-tight">
                <span className="text-foreground">SUN</span>
                <span className="text-gradient">MAX</span>
                <span className="text-foreground text-sm font-semibold opacity-70 ml-0.5">KZN</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium -mt-0.5">
                Premium Auto
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+78435553535"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">+7 (843) 555-35-35</span>
                <span className="text-[10px] text-muted-foreground">Ежедневно 9:00–21:00</span>
              </div>
            </a>
            <Button asChild className="btn-glow font-semibold">
              <a href="/contacts">Записаться</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/50"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50 mt-2">
                <a
                  href="tel:+78435553535"
                  className="flex items-center gap-3 py-3 px-4 text-foreground"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">+7 (843) 555-35-35</span>
                    <span className="text-xs text-muted-foreground">Ежедневно 9:00–21:00</span>
                  </div>
                </a>
                <Button asChild className="w-full mt-3 btn-glow font-semibold">
                  <a href="/contacts" onClick={() => setIsOpen(false)}>Записаться на сервис</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
