import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, MapPin, Phone, Mail, Target, Wrench, Star, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaOrg, { sunmaxBusinessData } from "@/components/seo/SchemaOrg";
import { Button } from "@/components/ui/button";

const achievements = [
  { value: "8+", label: "лет опыта", icon: Clock },
  { value: "2500+", label: "автомобилей", icon: Shield },
  { value: "127", label: "отзывов", icon: Star },
  { value: "98%", label: "довольных клиентов", icon: Users },
];

const values = [
  {
    icon: Target,
    title: "Перфекционизм",
    description: "Каждая работа выполняется идеально. Мы не сдаём автомобиль, пока результат не будет безупречным.",
  },
  {
    icon: Shield,
    title: "Честность",
    description: "Прозрачное ценообразование, реальные сроки. Рекомендуем только то, что действительно нужно.",
  },
  {
    icon: Wrench,
    title: "Экспертиза",
    description: "Сертифицированные мастера с опытом работы на премиальных автомобилях от 5 лет.",
  },
  {
    icon: Award,
    title: "Гарантия",
    description: "До 10 лет гарантии на защитные покрытия. Несём ответственность за каждую работу.",
  },
];

const certifications = [
  "Сертифицированный установщик XPEL",
  "Официальный партнёр SunTek",
  "Авторизованный дилер Pandora",
  "Сертификат StP Pro",
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="О компании SUNMAXKZN — Премиальная автостудия в Казани"
        description="SUNMAXKZN — ведущая автостудия детейлинга и тюнинга в Казани. 8+ лет опыта, 2500+ обслуженных автомобилей, гарантия до 10 лет. Работаем с Porsche, BMW, Mercedes, Audi."
        keywords={["автостудия казань", "детейлинг центр", "тюнинг ателье", "sunmaxkzn"]}
      />
      <SchemaOrg type="Organization" data={sunmaxBusinessData} />
      <SchemaOrg
        type="Breadcrumb"
        data={[
          { name: "Главная", url: "https://sunmaxkzn.ru" },
          { name: "О компании", url: "https://sunmaxkzn.ru/about" },
        ]}
      />

      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="hero-section py-20 relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="badge-premium mb-6 inline-block">О компании</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                <span className="text-gradient">SUNMAXKZN</span> — 
                <br />
                премиальный автосервис
                <br />
                в Казани
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Мы специализируемся на защите, тюнинге и уходе за автомобилями 
                бизнес- и премиум-класса. Наша миссия — сохранить красоту и 
                ценность вашего автомобиля на долгие годы.
              </p>

              {/* Achievements */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {achievements.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-secondary/30 border border-border/50"
                  >
                    <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-heading font-extrabold text-gradient">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Наши <span className="text-gradient">ценности</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Принципы, которые определяют качество нашей работы
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="section-container bg-secondary/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Сертификаты и <span className="text-gradient">партнёрства</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы работаем только с проверенными брендами и технологиями
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Свяжитесь с <span className="text-gradient">нами</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.a
              href="tel:+78435553535"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-premium p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold mb-1">Телефон</h3>
              <p className="text-muted-foreground">+7 (843) 555-35-35</p>
            </motion.a>

            <motion.a
              href="mailto:info@sunmaxkzn.ru"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-premium p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold mb-1">Email</h3>
              <p className="text-muted-foreground">info@sunmaxkzn.ru</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-premium p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold mb-1">Адрес</h3>
              <p className="text-muted-foreground">г. Казань, ул. Примерная, 1</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" className="btn-glow text-base px-8 py-6" asChild>
              <a href="/contacts">Записаться на визит</a>
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
