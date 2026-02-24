import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

const PortfolioListPage = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["portfolio-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts")
        .select("*")
        .eq("is_active", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Портфолио — Статьи и работы SUNMAXKZN"
        description="Статьи, обзоры и материалы от автостудии SUNMAXKZN в Казани."
      />
      <Header />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
              Портфолио
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Статьи, обзоры и материалы от нашей команды
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-secondary/50 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">Статьи скоро появятся</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/portfolio/${post.slug}`} className="group block">
                    <div className="card-premium overflow-hidden">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] bg-secondary/50" />
                      )}
                      <div className="p-5">
                        <h2 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(post.published_at), "d MMM yyyy", { locale: ru })}
                          </span>
                          <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                            Читать <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioListPage;
