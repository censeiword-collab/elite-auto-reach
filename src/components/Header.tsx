import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sun, ChevronDown, Calculator, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, NAVIGATION, getWhatsAppLink, getPhoneLink } from "@/lib/constants";

const navLinks = NAVIGATION.header;
const servicesDropdown = NAVIGATION.servicesDropdown;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_hsl(220_90%_50%/0.4)] transition-shadow duration-300">
              <Sun className="w-6 h-6 text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-extrabold tracking-tight">
                <span className="text-blue-500">SUN</span>
                <span className="text-red-500">MAX</span>
                <span className="text-foreground text-sm font-semibold opacity-70 ml-0.5">KZN</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium -mt-0.5">
                Premium Auto
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button
                    className="nav-link text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2 w-[560px]"
                      >
                        <div className="glass rounded-xl border border-border/50 p-4 shadow-xl">
                          <div className="grid grid-cols-3 gap-4">
                            {servicesDropdown.groups.map((group) => (
                              <div key={group.title}>
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                                  {group.title}
                                </p>
                                <ul className="space-y-1.5">
                                  {group.items.map((item) => (
                                    <li key={item.href}>
                                      <a
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground hover:bg-accent px-2 py-1.5 rounded-md block transition-colors"
                                      >
                                        {item.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-border/50 mt-4 pt-4">
                            <a
                              href={servicesDropdown.allServicesLink.href}
                              className="text-sm font-semibold text-primary hover:underline"
                            >
                              {servicesDropdown.allServicesLink.label} →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={getPhoneLink()}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{CONTACT.phone.display}</span>
                <span className="text-[10px] text-muted-foreground">Ежедневно 9:00–21:00</span>
              </div>
            </a>
            <Button asChild variant="outline" className="font-semibold" size="sm">
              <a href="/calculator">
                <Calculator className="w-4 h-4 mr-2" />
                Рассчитать
              </a>
            </Button>
            <Button asChild className="btn-glow font-semibold">
              <a href="/contacts">Записаться</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-lg bg-primary/15 border border-primary/30 text-foreground hover:bg-primary/25 hover:text-primary transition-colors"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
                link.hasDropdown ? (
                  <div key={link.href}>
                    <a
                      href={link.href}
                      className="py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors font-medium flex items-center justify-between"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </a>
                    <div className="pl-4 space-y-1 mt-1">
                      {servicesDropdown.groups.flatMap((group) =>
                        group.items.slice(0, 3).map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="py-2 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors block"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </a>
                        ))
                      )}
                      <a
                        href="/services"
                        className="py-2 px-4 text-sm text-primary font-medium hover:bg-accent rounded-lg transition-colors block"
                        onClick={() => setIsOpen(false)}
                      >
                        Все услуги →
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-4 border-t border-border/50 mt-2">
                <a
                  href={getPhoneLink()}
                  className="flex items-center gap-3 py-3 px-4 text-foreground"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{CONTACT.phone.display}</span>
                    <span className="text-xs text-muted-foreground">Ежедневно 9:00–21:00</span>
                  </div>
                </a>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button asChild variant="outline" className="font-semibold">
                    <a href="/calculator" onClick={() => setIsOpen(false)}>
                      <Calculator className="w-4 h-4 mr-2" />
                      Расчёт
                    </a>
                  </Button>
                  <Button asChild className="btn-glow font-semibold">
                    <a href="/contacts" onClick={() => setIsOpen(false)}>Записаться</a>
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
