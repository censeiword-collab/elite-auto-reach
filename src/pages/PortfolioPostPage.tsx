import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

interface PortfolioPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  description: string | null;
  cover_image_url: string | null;
  gallery_images: string[];
  content_html: string;
  author: string | null;
}

const PortfolioPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["portfolio-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts" as any)
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as PortfolioPost | null;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-16">
          <p className="text-muted-foreground">Загрузка…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <a href="/portfolio" className="text-primary hover:underline">← Назад к портфолио</a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} | SUNMAXKZN`}
        description={post.description || post.title}
        canonicalUrl={`https://sunmax-kzn.ru/portfolio/${post.slug}`}
      />
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <a href="/portfolio" className="text-sm text-primary hover:underline mb-6 inline-block">← Портфолио</a>

        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">{post.title}</h1>

        <p className="text-sm text-muted-foreground mb-6">
          {new Date(post.published_at).toLocaleDateString("ru-RU")}
          {post.author && ` · ${post.author}`}
        </p>

        {post.description && (
          <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
        )}

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-xl mb-8 object-cover"
          />
        )}

        {/* Content HTML */}
        <article
          className="prose prose-invert max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content_html) }}
        />

        {/* Gallery */}
        {post.gallery_images && post.gallery_images.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Галерея</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {post.gallery_images.map((url, i) => (
                <figure key={i} className="rounded-lg overflow-hidden">
                  <img src={url} alt={`${post.title} — фото ${i + 1}`} className="w-full object-cover" loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPostPage;
