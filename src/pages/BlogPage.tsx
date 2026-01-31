import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const BlogPage = () => {
  const { data: posts, isLoading } = useBlogPosts();

  // Mock data for display when DB is empty
  const mockPosts = [
    {
      id: "1",
      slug: "kak-vybrat-ppf-plenku",
      title: "Как выбрать PPF плёнку для премиум авто",
      excerpt: "Разбираемся в отличиях между XPEL, SunTek и Hexis. Какую плёнку выбрать для вашего автомобиля и на что обратить внимание.",
      featured_image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
      category: "PPF",
      reading_time_minutes: 7,
      published_at: "2024-01-15",
    },
    {
      id: "2",
      slug: "aktivnyy-vyhlop-plyusy-minusy",
      title: "Активный выхлоп: плюсы и минусы",
      excerpt: "Стоит ли устанавливать систему электронных заслонок? Разбираем преимущества, недостатки и законность в России.",
      featured_image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
      category: "Тюнинг",
      reading_time_minutes: 5,
      published_at: "2024-01-10",
    },
    {
      id: "3",
      slug: "shumoizolyaciya-premium-avto",
      title: "Шумоизоляция премиум авто — стоит ли переплачивать?",
      excerpt: "Сравниваем результаты шумоизоляции материалами разных ценовых категорий. Реальные замеры и отзывы.",
      featured_image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
      category: "Комфорт",
      reading_time_minutes: 8,
      published_at: "2024-01-05",
    },
    {
      id: "4",
      slug: "pandora-vs-starline",
      title: "Pandora vs StarLine — честное сравнение",
      excerpt: "Какая охранная система лучше для премиального автомобиля? Сравниваем функции, надёжность и цены.",
      featured_image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
      category: "Безопасность",
      reading_time_minutes: 10,
      published_at: "2024-01-01",
    },
    {
      id: "5",
      slug: "top-oshibok-okleyka-avto",
      title: "ТОП ошибок при оклейке авто",
      excerpt: "5 главных ошибок, которые допускают при самостоятельной оклейке и выборе мастерской. Как их избежать.",
      featured_image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
      category: "PPF",
      reading_time_minutes: 6,
      published_at: "2023-12-28",
    },
  ];

  const displayPosts = posts?.length ? posts : mockPosts;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Блог AutoService — статьи о защите и тюнинге авто в Казани"
        description="Полезные статьи о PPF плёнке, шумоизоляции, активном выхлопе, PDR ремонте и охранных системах Pandora. Экспертные советы для владельцев премиальных авто."
        keywords={["блог автосервис казань", "статьи о ppf", "советы по уходу за авто", "тюнинг авто статьи"]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="hero-section pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="badge-premium">Блог</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-6"
              >
                Полезные статьи о{" "}
                <span className="text-gradient">защите и тюнинге</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Экспертные советы от мастеров AutoService для владельцев премиальных автомобилей
              </motion.p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-container">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Загрузка статей...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-gradient rounded-2xl overflow-hidden group block"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.featured_image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {post.category && (
                      <span className="absolute top-4 left-4 badge-premium">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.reading_time_minutes} мин
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.published_at || "").toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-gradient rounded-3xl p-8 md:p-12 text-center"
          >
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Свяжитесь с нами — наши эксперты бесплатно проконсультируют вас по любым вопросам
            </p>
            <Button size="lg" className="btn-glow">
              Получить консультацию
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
