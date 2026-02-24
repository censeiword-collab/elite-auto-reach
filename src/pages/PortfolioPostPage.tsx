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
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import type { PortfolioBlock } from "@/lib/portfolioBlocks";
import { isPortfolioBlocks } from "@/lib/portfolioBlocks";

function BlockRenderer({ blocks }: { blocks: PortfolioBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          const Tag = (`h${b.level}` as any);
          return <Tag key={i} className="font-bold">{b.text}</Tag>;
        }
        if (b.type === "paragraph") {
          const html = sanitizeHtml(b.html || "");
          return (
            <div
              key={i}
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        if (b.type === "list") {
          const items = Array.isArray(b.items) ? b.items : [];
          if (b.ordered) {
            return (
              <ol key={i} className="list-decimal pl-6 space-y-1">
                {items.map((x, idx) => <li key={idx}>{x}</li>)}
              </ol>
            );
          }
          return (
            <ul key={i} className="list-disc pl-6 space-y-1">
              {items.map((x, idx) => <li key={idx}>{x}</li>)}
            </ul>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={i} className="border-l-4 pl-4 italic text-muted-foreground">
              {b.text}
            </blockquote>
          );
        }
        if (b.type === "image") {
          if (!b.src) return null;
          return (
            <figure key={i} className="space-y-2">
              <img src={b.src} alt="" className="w-full rounded-2xl object-cover max-h-[520px]" />
              {b.caption ? <figcaption className="text-sm text-muted-foreground">{b.caption}</figcaption> : null}
            </figure>
          );
        }
        if (b.type === "gallery") {
          const imgs = Array.isArray(b.images) ? b.images.filter((x) => x?.src) : [];
          if (imgs.length === 0) return null;
          return (
            <div key={i} className="space-y-3">
              <h3 className="font-semibold text-lg">Галерея</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imgs.map((img, idx) => (
                  <figure key={idx} className="space-y-1">
                    <img src={img.src} alt="" className="w-full rounded-lg object-cover aspect-square" />
                    {img.caption ? <figcaption className="text-xs text-muted-foreground">{img.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

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
      return data as any;
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

  const blocks = isPortfolioBlocks(post.content_blocks) ? (post.content_blocks as PortfolioBlock[]) : null;

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
                {post.published_at && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.published_at), "d MMMM yyyy", { locale: ru })}
                  </span>
                )}
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
          {blocks && blocks.length > 0 ? (
            <BlockRenderer blocks={blocks} />
          ) : (
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content_html || "") }}
            />
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
