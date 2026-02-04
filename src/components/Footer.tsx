import { Phone, Mail, MapPin, Clock, Sun, MessageCircle, Send } from "lucide-react";
import { CONTACT, WORKING_HOURS, getPhoneLink, getWhatsAppLink, getMapLink } from "@/lib/constants";

const services = [
  { href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Защита кузова PPF" },
  { href: "/aktivnyy-vyhlop-kazan", label: "Активный выхлоп" },
  { href: "/shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
  { href: "/udalenie-vmyatin-bez-pokraski-kazan", label: "Удаление вмятин PDR" },
  { href: "/ustanovka-signalizacii-pandora-kazan", label: "Сигнализации Pandora" },
  { href: "/tonirovka-avto-kazan", label: "Тонировка" },
  { href: "/okleyka-vinilom-kazan", label: "Оклейка винилом" },
];

const pages = [
  { href: "/price", label: "Услуги и цены" },
  { href: "/cases", label: "Примеры работ" },
  { href: "/faq", label: "Вопросы и ответы" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

const socials = [
  { icon: "VK", href: CONTACT.social.vk, label: "ВКонтакте" },
  { icon: "TG", href: CONTACT.social.telegram, label: "Telegram" },
  { icon: "WA", href: getWhatsAppLink(), label: "WhatsApp" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-lg">
                <Sun className="w-6 h-6 text-background" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-extrabold tracking-tight">
                  <span className="text-foreground">SUN</span>
                  <span className="text-gradient">MAX</span>
                  <span className="text-foreground text-sm font-semibold opacity-70 ml-0.5">KZN</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium -mt-0.5">
                  Premium Auto
                </span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Премиальный автосервис в Казани для автомобилей бизнес- и премиум-класса. 
              Защита, тюнинг, комфорт.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={getPhoneLink()}
                className="flex items-center gap-3 text-sm text-foreground font-medium hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                {CONTACT.phone.display}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                info@sunmaxkzn.ru
              </a>
              <a
                href="https://yandex.ru/maps/?text=Казань,+ул.+Техническая,+122"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="pt-1.5">г. Казань, ул. Техническая, 122</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                Ежедневно 9:00 — 21:00
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-base mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              Услуги
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200" />
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-heading font-bold text-base mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              Информация
            </h4>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.href}>
                  <a
                    href={page.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200" />
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h4 className="font-heading font-bold text-base mt-8 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              Мы в соцсетях
            </h4>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  aria-label={social.label}
                >
                  <span className="text-xs font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="font-heading font-bold text-base mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              Быстрая связь
            </h4>
            
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-colors mb-3 group"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Напишите нам</p>
              </div>
            </a>

            <a
              href="https://t.me/sunmaxkzn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors group"
            >
              <Send className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-foreground">Telegram</p>
                <p className="text-xs text-muted-foreground">@sunmaxkzn</p>
              </div>
            </a>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-1">Записаться онлайн</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Оставьте заявку — перезвоним в течение 15 минут
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="separator-glow my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="font-semibold text-foreground">SUNMAXKZN</span>
            <span>— Премиальный автосервис в Казани</span>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/admin/login" className="text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              Вход для администратора
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
