import { Phone, Mail, MapPin, Clock } from "lucide-react";

const services = [
  { href: "/okleyka-avto-poliuretanovoy-plenkoy-kazan", label: "Оклейка PPF" },
  { href: "/aktivnyy-vyhlop-kazan", label: "Активный выхлоп" },
  { href: "/shumoizolyaciya-avto-kazan", label: "Шумоизоляция" },
  { href: "/udalenie-vmyatin-bez-pokraski-kazan", label: "PDR" },
  { href: "/ustanovka-signalizacii-pandora-kazan", label: "Pandora" },
];

const pages = [
  { href: "/price", label: "Цены" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/blog", label: "Блог" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">A</span>
              </div>
              <span className="font-heading text-xl font-bold text-foreground">
                Auto<span className="text-primary">Service</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Премиальный автосервис в Казани. Защита кузова, тюнинг и комфорт для автомобилей премиум-класса.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+79991234567"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +7 (999) 123-45-67
              </a>
              <a
                href="mailto:info@autoservice.ru"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                info@autoservice.ru
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Казань, ул. Примерная, 123</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Пн-Сб: 9:00 - 20:00
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Услуги</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Информация</h4>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.href}>
                  <a
                    href={page.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours & Social */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Мы в соцсетях</h4>
            <div className="flex gap-3 mb-8">
              {["VK", "TG", "WA", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="text-xs font-bold">{social}</span>
                </a>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <p className="text-sm font-medium mb-2">Записаться онлайн</p>
              <p className="text-xs text-muted-foreground">
                Оставьте заявку и мы перезвоним в течение 30 минут
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="separator-glow my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 AutoService. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
