import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const PortfolioPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["portfolio-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 container mx-auto px-4 py-12">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
          <Button asChild>
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к портфолио
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const galleryImages = Array.isArray(post.gallery_images) ? post.gallery_images : [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.description || ""}
        ogImage={post.cover_image_url || undefined}
      />
      <Header />

      <main className="pt-20">
        <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
                <span>/</span>
                <Link to="/portfolio" className="hover:text-primary transition-colors">Портфолио</Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.published_at), "d MMMM yyyy", { locale: ru })}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {post.cover_image_url && (
          <section className="pb-8 container mx-auto px-4 max-w-4xl">
            <img src={post.cover_image_url} alt={post.title} className="w-full rounded-2xl object-cover max-h-[500px]" />
          </section>
        )}

        <article className="py-8 container mx-auto px-4 max-w-4xl">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content_html || "" }}
          />

          {galleryImages.length > 0 && (
            <div className="mt-12">
              <h3 className="font-semibold text-lg mb-4">Галерея</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <img key={i} src={img} alt={`${post.title} ${i + 1}`} className="w-full rounded-lg object-cover aspect-square" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Button asChild variant="outline">
              <Link to="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Все статьи
              </Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPostPage;
