import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Оклейка PPF" },
  { href: "/aktivnyy-vyhlop-kazan", label: "Активный выхлоп" },
  { href: "/shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
  { href: "/udalenie-vmyatin-bez-pokraski-kazan", label: "PDR" },
  { href: "/ustanovka-signalizacii-pandora-kazan", label: "Pandora" },
  { href: "/price", label: "Цены" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/contacts", label: "Контакты" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">A</span>
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Auto<span className="text-primary">Service</span>
            </span>
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
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79991234567"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+7 (999) 123-45-67</span>
            </a>
            <Button className="btn-glow">
              Рассчитать стоимость
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
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
            className="lg:hidden glass border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <a
                  href="tel:+79991234567"
                  className="flex items-center gap-2 py-3 px-4 text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+7 (999) 123-45-67</span>
                </a>
                <Button className="w-full mt-2 btn-glow">
                  Рассчитать стоимость
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
